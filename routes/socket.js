//Generate random permutation with elements from 1 to size-1
var permutation = function (size){
  var array = [];
  for(var i = 0; i < size - 1; i++){
    array[i]=i+1;
  }
  for(var i = size - 2; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

var rooms = (function () {
  var rooms = {};

  var create = function () {
    var room_id;
    do {
      room_id = Math.random().toString(36).substring(2,7);
    } while (!claim(room_id));
    return room_id;
  };

  var get = function (room_id) {
    return rooms[room_id];
  };

  var getid = function (room_id, index) {
    return rooms[room_id].people[index].socket_id;
  };

  var claim = function (room_id) {
    if (!room_id || rooms[room_id]){
      return false;
    }
    rooms[room_id] = {
      id: room_id,
      current: -1,
      permutation: [],
      people: []
    };
    return true;
  };

  var join = function (room_id, name, socket_id) {
    if (rooms[room_id].current < 0 ){
      rooms[room_id].people.push({name: name, socket_id: socket_id});
    }
  };

  var start = function (room_id) {
    rooms[room_id].current = 0;
    rooms[room_id].permutation = permutation(rooms[room_id].people.length);
    return rooms[room_id].permutation;
  }

  var activate = function (room_id, socket_id) {
    var room = rooms[room_id];
    console.log(JSON.stringify(room));
    if (room.people[room.permutation[room.current]].socket_id == socket_id){
      if (room.current < room.people.length-2){
        rooms[room_id].current += 1;
        return 1;
      } else {
        rooms[room_id].current = -1;
        rooms[room_id].permutation = [];
        return 0;
      }
    }
    rooms[room_id].current = -1;
    rooms[room_id].permutation = [];
    return -1;
  }

  var leave = function (room, socket) {
    if (rooms[room]) {
      for(var i = 0; i <rooms[room].people.length; i++) {
        if(rooms[room].people[i].socket == socket) {
           rooms[room].people.splice(i, 1);
        }
      }
    }
  };

  var free = function (room) {
    if (rooms[room]) {
      delete rooms[room];
    }
  };

  return {
    create: create,
    get: get,
    getid: getid,
    claim: claim,
    join: join,
    start: start,
    activate: activate,
    leave: leave,
    free: free
  };
}());

module.exports = function (io) {
  io.sockets.on('connection', function(socket){

    var name, room_id;

    socket.on('create', function (data) {
      name = data.name;
      room_id = data.room || rooms.create();
      rooms.join(room_id, name, socket.id);
      socket.join(room_id);
      io.sockets.in(room_id).emit('room:update', {
        room: rooms.get(room_id)
      });
    });

    socket.on('room:start', function () {
      socket.emit('game:master', rooms.start(room_id));
      socket.broadcast.in(room_id).emit('game:slave');
    });

    socket.on('game:signal', function (index) {
      io.sockets.in(rooms.getid(room_id, index)).emit('game:signaled');
    });

    socket.on('game:activate', function () {
      var result = rooms.activate(room_id, socket.id);
      if (result <= 0 ){
        io.sockets.in(room_id).emit('game:end', (result == 0)? 'escaped':'death');
      } 
    });

  });
};
