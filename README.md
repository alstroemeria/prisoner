# Prisoner

There is a person in a room trapped behind a transparent wall with holes drilled in it. Behind the wall is a computer running your webapp. The only way for the person to interact with the computer is by voice. 

There are an additional rooms numbered 1 to 4, each with a person sitting at a computer running another webapp whose only interface is a single button and a place to indicate when the user should press the button. All these computers are connected to a server over very poor connections and have identified themselves with their room numbers. The person trapped in the first room is shown the order in which the people in the other rooms must press their buttons in, in order to unlock all the rooms and free everyone. 

If the buttons are pressed in the wrong order, they will be trapped forever. 

**twist: variable number of rooms, and mutiple games** 

## How to play
1. Create a room
2. Read the access key of that room.
3. Share the access key with your friends
4. Friends join an existing room through a access key.
5. In the lobby, you can see all other players
6. The person who starts the game is the master. He will issue voice commands
7. The 'slaves' are given a button, they can trigger at any time.
8. The master will call out the combination.
9. The slaves will ideally attempt to trigger the button on their turn
10. If the players are able to complete the combination they win.

## Extras
1. Muliple games. Join via game key.
2. Variable number of rooms.


## Setting up 

```shell
bower install
npm install
```

## Running the app

```shell
node app.js
```

## Scale
Since game rooms were implemented we already have the ability to handle mutliple groups of users we can immediately scale to a arbitrary amount of games and users. Individual games also have the capacity to hold any amount of players and rooms. The only limitation is the rooms object in memory. To solve this we could use a database like redis to hold these value in memory. Socket.io is commonly used with redis in this way. It can also weight balance by adding more nodes.



