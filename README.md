# Steps to run the app 
 
1. Clone the repository 
2. Open a terminal in the project folder directory 
3. For Docker, execute (Requires Docker to be installed)
```
  docker compose up -d redis
  docker compose up -d app
```

## The  config.json  file is responsible for modifying the coordinates, the number of rooms, and the number of coins per room that will be generated.
```
  {
    "roomsNumber": 3,
    "coinsForRoom": 5,
    "roomArea": {
      "xMin": 0,
      "xMax": 100,
      "yMin": 0,
      "yMax": 100,
      "zMin": 0,
      "zMax": 100
    }
  }
```

## Socket.io send events 
- Indicate which room the user is in 
 user-position  --> argument: {roomNumber: number} 
- Indicate to the service which coin was collected (type --> json). 
- The coinId must exist in the room 
 captured-coin  --> argument: {roomNumber: number, coinId: string} 
 
## Socket.io listen events 
- This event shows the coins that are in the room at the time of using 'user-position' 
 coins-room  
- This event is sent to all connected clients when someone collects a coin 
 available-coins  
 
## URL for HTTP requests to the REST API 
- http://localhost:3000/rooms --> Shows all rooms with available coins 
- http://localhost:3000/rooms/numberOfRoom --> Shows all available coins in the room sent as a parameter