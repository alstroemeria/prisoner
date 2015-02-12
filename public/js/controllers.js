'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    $scope.create = function(){
      socket.emit("create", $scope.user);
    };

    $scope.start = function(){
      socket.emit("room:start");
    }

    $scope.signal = function(index){
      socket.emit("game:signal", index);
    };

    $scope.activate = function(){
      socket.emit("game:activate", $scope.room.id);
    };

    $scope.new = function(){
      $scope.state = 'new';
    };

    $scope.join = function(){
      $scope.state = 'join';
    };

    $scope.menu = function(){
      $scope.state = 'menu';
      $scope.user={};
    };

    $scope.menu();

    socket.on('room:update', function (data){
      $scope.room = data.room;
      $scope.state = 'room';
    });

    socket.on('game:slave', function (data){
      $scope.state = 'slave';
      $scope.command = false;
    });

    socket.on('game:master', function (sequence){
      $scope.state= 'master';
      $scope.sequence = sequence;

      if (annyang) {
        var commands = {
          ':number': function(data) {
            if((data % 1 === 0) && (data <= sequence.length)){ //its an integer!
               $scope.signal(data);
            } 
          }
        };
        annyang.addCommands(commands);
        annyang.start();
      }

    });

    socket.on('game:signaled', function (){
      $scope.signal = "now";
    });

    socket.on('game:command', function (){
      $scope.command = true;
    });

    socket.on('game:end', function (message){

      if (annyang && $scope.state=='master') {
        annyang.abort();
      }

      $scope.state = 'end';
      $scope.message = message;

    });
   
  })