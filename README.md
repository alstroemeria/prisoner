# Prisoner

There is a person in a room trapped behind a transparent wall with holes drilled in it. Behind the wall is a computer running your webapp. The only way for the person to interact with the computer is by voice. 

There are an additional rooms numbered 1 to 4, each with a person sitting at a computer running another webapp whose only interface is a single button and a place to indicate when the user should press the button. All these computers are connected to a server over very poor connections and have identified themselves with their room numbers. The person trapped in the first room is shown the order in which the people in the other rooms must press their buttons in, in order to unlock all the rooms and free everyone. 

If the buttons are pressed in the wrong order, they will be trapped forever. 

**twist: variable number of rooms, and mutiple games**


## Task

1. Create the webapp that is able to listen to the first person's computer’s microphone and push commands to the server.
2. Build the Node.js server that will receive commands from all the clients and console.log the order in which buttons are pressed as well as the phrase “Free them!” once all buttons have been pressed in the correct order.
3. Create the webapp that will tell the people in the remaining rooms when to hit the button.
4. Explain how you would scale the situation out to multiple groups of rooms all with different orders that the buttons need to be pressed.
5. Use websockets 

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


