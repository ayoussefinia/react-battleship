// const {createServer, createPubSub, Repeater} = require('@graphql-yoga/node');
// const pubsub = createPubSub();
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema';
// import { WebSocketServer } from 'ws';
// import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import { execute, isConstValueNode, subscribe } from 'graphql';
import { kMaxLength } from 'buffer';
const pubsub = new PubSub();
import * as path from 'path';
import cors from "cors";
// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const messages=[];
const gameArray=[];
const activeGames=[];
const waitingRoom=[];

const player1 = null;
const player2 = null;



const typeDefs= `
type Subscription {
    messages: [Message!]
    message: Message
    postCreated: Boolean
}

input GridElement {
    row: Int
    column: Int
    hit: Boolean
    firedAt: Boolean
    gameId: String
}

input FireCoordinate {
    row: Int
    column: Int
    gameId: String
    uuid: String
}

input Row {
    data: [GridElement]
}

input Grid {
    data: [Row]
}
input PostGrid {
    uuid: String!
    gameId: String!
    grid: Grid!
}

input CoordinateAsker {
    uuid: String!
    gameId: String!
}

type Coordinate {
    row: Int
    column: Int
}

input ShotResult {
    hit: Boolean
}

type StartGameObject {
    turn: String!
    gameId: String!
}


type Message {
    id: ID!
    user: String!
    content: String!
}


type Query {
    messages: [Message!]
    getGameId(payload: String!): String!
    getOpposingShotCoordinate(payload: CoordinateAsker) : Coordinate
    getOpponentShotsTaken(payload: String!) : String! 
}

type Mutation {
    getGameId(payload: String!): String
    postMessage(user: String!, content: String!): ID!
    postGameArray(payload: PostGrid): Boolean
    postUUID(payload: String!): ID!
    postFireAtOpponent(payload: FireCoordinate!): Boolean
    postShotCoordinate(payload: String!) : String!
    postShipCoordinates(payload: String!) : Boolean!
}
`;

function checkWin() {

}


const resolvers = {
Query: {
    getOpposingShotCoordinate: (parent, {payload})=> {
    
        for(var i=0; i<activeGames.length; i++) {
            if(activeGames[i].id == payload.gameId) {
                // console.log('*********inside first if')
                if(payload.uuid != activeGames[i].turn){
                    // console.log('*********inside second  if')
                    // console.log('last attact:', activeGames[i].lastAttack)
                    const coordinate = {
                        row: activeGames[i].lastAttack.row,
                        column: activeGames[i].lastAttack.column
                    }
                    return coordinate;
                } else {
                    const coordinate = {
                        row:null,
                        column: null
                    }
                    return coordinate;
                }
            }
        }
        console.log('get opposing coordinate called by:', payload)
    },
    messages: ()=> {messages},
    getGameId: (parent, {payload})=> {
        if(activeGames.length > 0){
            
            for(var i=0; i<activeGames.length; i++) {
                console.log("made it into if block")
                if(payload == activeGames[i].player1|| payload == activeGames[i].player2) {
                    const returnObj = {
                        turn: activeGames[i].turn,
                        id: activeGames[i].id
                    }
                    return JSON.stringify(returnObj)
                }
            }
        } 

        return "Still Waiting";
            

       
        // return "Still Waiting"
    //     if(activeGames.length>0) {
    //         // console.log(activeGames[0].id, '==', payload)
    //         for(var i=0; i<activeGames.length; i++) {
    //             if(activeGames[i].player1 == payload || activeGames[i].player2 == payload) {
    //                 const StartGameObject = {
    //                     turn: activeGames[i].turn,
    //                     gameId: activeGames[i].id
    //                 };
    //                 // StartGameObject.gameId = activeGames[i].id;
    //                 // StartGameObject.turn = activeGames[i].turn;
    //                 return StartGameObject;
    //             }
    //         }
    //     } 
    //     if(activeGames.length ==0 && waitingRoom.length ==0) {
    //         const StartGameObject = {
    //             turn: 'none',
    //             gameId: 'none'
    //         };
    //         // const StartGameObject = {};
    //         // StartGameObject.gameId = 'none';
    //         // StarGameObject.turn = 'none';
    //         return StartGameObject;
    //     }

    //    if (waitingRoom.length >0) {
    //         for(var i=0; i<waitingRoom.length; i++) {
    //             if(waitingRoom[i]==payload) {
    //                 const StartGameObject = {
    //                     turn: 'waitingOther',
    //                     gameId: 'waitingOther'
    //                 };
    //                 // StartGameObject.gameId = 'waiting';
    //                 // StartGameObject.turn = 'waiting';
    //                 return StartGameObject;
    //             }else {
    //                 const StartGameObject = {
    //                     turn: 'waitingYou',
    //                     gameId: 'waitingYou'
    //                 };
    //                 return StartGameObject;
    //             }
    //         }
    //     }


    },
    getOpponentShotsTaken:  (parent, {payload}) => {
        console.log("getOpponentShotsTaken called with payload: " + payload);
        const playerData = JSON.parse(payload);
        const parsePlayerData = JSON.parse(playerData.gameId);
        console.log("get Opponent Shots Taken Game Id: "+ parsePlayerData.id)
        console.log("active games id "+ activeGames[0].id)
        for(var i=0; i< activeGames.length; i ++ ) {
            if(parsePlayerData.id == activeGames[i].id) {
                console.log("made it inside first if") 
                console.log("player Id inside first if:  "+playerData.playerId)
                if(playerData.playerId == activeGames[i].player1) {
                    return JSON.stringify(activeGames[i].player2ShotsTaken);
                } else if (playerData.playerId == activeGames[i].player2) {
                    return JSON.stringify(activeGames[i].player1ShotsTaken);
                }
            }
        }
        return "hello"

    }
},
Mutation: {
    postShotCoordinate: (parent, {payload}) => {
        console.log("post shot coordinate called with payload: "+payload)
        const postObject = JSON.parse(payload);

        const gameIdObj = JSON.parse( postObject.gameId)

        for(var i=0; i< activeGames.length; i++) {
            if(activeGames[i].id == gameIdObj.id) {

                if(activeGames[i].player1 == postObject.uuid) {
                    const shotObject = {
                        row: postObject.row,
                        col: postObject.col 
                    }
                    activeGames[i].player1ShotsTaken.push(shotObject)
                    console.log("check ships for player 1 shot: ")
                    console.log("player2Battleship: ", activeGames[i].player2Battleship)
                    console.log(typeof activeGames[i].player2Battleship)
                    console.log("key value: " + activeGames[i].player2Battleship[0].hit)

                    var resultObj ={
                        hit: false,
                        battleshipSunk: activeGames[i].player2BattleshipSunk,
                        carrierSunk: activeGames[i].player2CarrierSunk,
                        destroyerSunk: activeGames[i].player2DestroyerSunk,
                        gameWon: activeGames[i].player1Win
                    } 
                    

                    for(var j =0; j<4; j++) {
                        console.log('inside battleship for loop')
              
                        if (postObject.col == activeGames[i].player2Battleship[j].pos.x && postObject.row == activeGames[i].player2Battleship[j].pos.y) {
                            console.log("hit battleship")
                            activeGames[i].player2Battleship[j].hit = true;
                            resultObj.hit = true; 
                            var sunk = true;
                            for (var k=0; k<4; k++) {
                                if(activeGames[i].player2Battleship[k].hit == false) {
                                    sunk = false;
                                }
                            }
                            resultObj.battleshipSunk = sunk; 
                            activeGames[i].player2BattleshipSunk = sunk;
                            if (resultObj.carrierSunk && resultObj.destroyerSunk && sunk) {
                                resultObj.gameWon = true
                                activeGames[i].player1Win = true
                            }
                        } 
                    }
                    for(var j =0; j<5; j++) {
                        console.log('inside carrier for loop')
                        if (postObject.col == activeGames[i].player2Carrier[j].pos.x && postObject.row == activeGames[i].player2Carrier[j].pos.y) {
                            console.log("hit carrier")
                            activeGames[i].player2Carrier[j].hit = true;
                            resultObj.hit = true; 
                            var sunk = true;
                            for (var k=0; k<5; k++) {
                                if(activeGames[i].player2Carrier[k].hit == false) {
                                    sunk = false;
                                }
                            }
                            resultObj.carrierSunk =sunk; 
                            activeGames[i].player2carrierSunk = sunk;
                            if (sunk && resultObj.destroyerSunk && resultObj.battleshipSunk) {
                                resultObj.gameWon = true
                                activeGames[i].player1Win = true
                            }
                        }  
                    }
                    for(var j =0; j<2; j++) { 
                        console.log('inside destroyer for loop')

                        if (postObject.col == activeGames[i].player2Destroyer[j].pos.x && postObject.row == activeGames[i].player2Destroyer[j].pos.y) {
                            console.log("hit destroyer")
                            activeGames[i].player2Destroyer[j].hit = true;
                            resultObj.hit = true;
                            var sunk = true;
                            for (var k=0; k<2; k++) {
                                if(activeGames[i].player2Destroyer[k].hit == false) {
                                    sunk = false;
                                }
                            }
                            resultObj.destroyerSunk =sunk; 
                            activeGames[i].player2destroyerSunk = sunk;
                            if (resultObj.carrierSunk && sunk && resultObj.battleshipSunk) {
                                resultObj.gameWon = true
                                activeGames[i].player1Win = true
                            }
                        }
                    }
                    console.log("result object: "+resultObj)
                    return JSON.stringify(resultObj); 
                }
                else if (activeGames[i].player2 == postObject.uuid) {
                    const shotObject = {
                        row: postObject.row,
                        col: postObject.col 
                    }
                    activeGames[i].player2ShotsTaken.push(shotObject)
                    console.log("check ships for player 2 shot: ")
                    console.log("player2Battleship: ", activeGames[i].player1Battleship)
                    console.log(typeof activeGames[i].player1Battleship)
                    console.log("key value: " + activeGames[i].player1Battleship[0].hit)
    
                    var resultObj ={
                        hit: false,
                        battleshipSunk: activeGames[i].player1BattleshipSunk,
                        carrierSunk: activeGames[i].player1CarrierSunk,
                        destroyerSunk: activeGames[i].player1DestroyerSunk,
                        gameWon: activeGames[i].player2Win
                    } 
                    
                    // var result = false;
                    for(var j =0; j<4; j++) {
                        console.log('inside battleship for loop')
                        if (postObject.col == activeGames[i].player1Battleship[j].pos.x && postObject.row == activeGames[i].player1Battleship[j].pos.y) {
                            console.log("hit battleship")
                            activeGames[i].player1Battleship[j].hit = true;
                            resultObj.hit = true; 
                            var sunk = true;
                            for (var k=0; k<4; k++) {
                                if(activeGames[i].player1Battleship[k].hit == false) {
                                    sunk = false;
                                }
                            }
                            resultObj.battleshipSunk = sunk; 
                            activeGames[i].player1BattleshipSunk = sunk;
                            if (resultObj.carrierSunk && resultObj.destroyerSunk && sunk) {
                                resultObj.gameWon = true
                                activeGames[i].player2Win = true
                            }
                        }
                    }
                    for(var j =0; j<5; j++) {
                        console.log('inside carrier for loop')
                        if (postObject.col == activeGames[i].player1Carrier[j].pos.x && postObject.row == activeGames[i].player1Carrier[j].pos.y) {
                            console.log("hit carrier")
                            activeGames[i].player1Carrier[j].hit = true;
                            resultObj.hit = true; 
                            var sunk = true;
                            for (var k=0; k<5; k++) {
                                if(activeGames[i].player1Carrier[k].hit == false) {
                                    sunk = false;
                                }
                            }
                            resultObj.carrierSunk =sunk; 
                            activeGames[i].player1carrierSunk = sunk;
                            if (sunk && resultObj.destroyerSunk && resultObj.battleshipSunk) {
                                resultObj.gameWon = true
                                activeGames[i].player2Win = true
                            }
                        }
                    }
                    for(var j =0; j<2; j++) { 
                        console.log('inside destroyer for loop')
    
                        if (postObject.col == activeGames[i].player1Destroyer[j].pos.x && postObject.row == activeGames[i].player1Destroyer[j].pos.y) {
                            console.log("hit destroyer")
                            activeGames[i].player1Destroyer[j].hit = true;
                            resultObj.hit = true;
                            var sunk = true;
                            for (var k=0; k<2; k++) {
                                if(activeGames[i].player1Destroyer[k].hit == false) {
                                    sunk = false;
                                }
                            }
                            resultObj.destroyerSunk =sunk; 
                            activeGames[i].player1destroyerSunk = sunk;
                            if (resultObj.carrierSunk && sunk && resultObj.battleshipSunk) {
                                resultObj.gameWon = true
                                activeGames[i].player1Win = true
                            }
                        }
                    }
                    console.log("result object player 2 :::" + resultObj)
                    return JSON.stringify(resultObj); 
                }
            } 
        }

    },
    postShipCoordinates: (parent, {payload}) => {
        console.log("post ship coordinates called with payload: "+payload)
        const postObject = JSON.parse(payload);
        const gameIdObj = JSON.parse(postObject.gameId)
        console.log(" post ship coordinates gameId: "+ gameIdObj.id);
        for(var i=0; i< activeGames.length; i++) {
            if(activeGames[i].id == gameIdObj.id) {
                console.log("found matching game")
                const destroyer = postObject.destroyer;
                const carrier = postObject.carrier;
                const battleship = postObject.battleShip;
                console.log("battleship: ", battleship)
                console.log("carrier: ", carrier)
                console.log("destroyer: ", destroyer)
                if(activeGames[i].player1 == postObject.uuid) {
                    activeGames[i].player1Battleship = battleship
                    activeGames[i].player1Carrier = carrier
                    activeGames[i].player1Destroyer = destroyer
                    return true; 
                }else if (activeGames[i].player2 == postObject.uuid) {
                    activeGames[i].player2Battleship = battleship
                    activeGames[i].player2Carrier = carrier
                    activeGames[i].player2Destroyer = destroyer
                    return true;
                }
            }
          
        }
        return false; 
    },
    postFireAtOpponent: (parent, {payload})=>{
        
        const gameId =payload.gameId;
        const row= payload.row;
        const column =payload.column;
        const uuid = payload.uuid;
        let grid;
        for(var i=0; i<activeGames.length; i++) {
            if (activeGames[i].id == gameId) {
                console.log('found game', activeGames[i])
                activeGames[i].lastAttack ={
                    row: row,
                    column:column
                }
                // if(uuid == activeGames[i].player1) {
              
            console.log('fire at opponent calle last Attack', activeGames[i].lastAttack)      
                // } 
                // else {
                   
                // }

            }
            console.log('fire at opponent grid:',grid)
        }
        
    },
    postMessage: (parent, {user, content}) => {
        const message= {
            id: messages.length,
            user: user,
            content: content
        }
        messages.push(message);
        
        pubsub.publish('MESSAGE_CREATED', {message: message});
        pubsub.publish('MESSAGES', {messages:[message]});
        // pubsub.publish('randomNumber', {messages: messages})
        return messages.length;
    },
    postGameArray: (parent, {payload})=> {
        console.log('post game array called');
        console.log(payload);
        // if (payload.)
        // console.log(payload.data[0].data)
    },
    postUUID: (parent, {payload})=> {
        console.log("post UUID called");
        if(waitingRoom.length==0) {
            console.log("wating roome empty");
            // waitingRoom.push(payload.split('"')[1]);
            waitingRoom.push(payload);
            console.log('waiting room',waitingRoom)
            // console.log('active games',activeGames[0])
            return 0;
        }
        else if (waitingRoom.length>0 && waitingRoom[waitingRoom.length-1] != payload && waitingRoom[waitingRoom.length-1] != undefined) {
            console.log('Starting A New Game')
            const player1 = waitingRoom.pop();
            const player2 = payload;
            const id =Math.random().toString().slice(2, 15);
            
            let initialGrid = Array(8).fill(null).map(row => new Array(8).fill(null))
            for(var i =0; i<8;i++){
                for(var j=0; j<8; j++){
                    let  obj={column:0, row:0, hit:false, firedAt:false}
                    obj.row = i;
                    obj.column=j
                    initialGrid[i][j] = obj
                }
            }
  
            var player1ShotsTaken = [];
            var player2ShotsTaken = [];
            var player1Battleship = [];
            var player1Carrier =[];
            var player1Destroyer = [];
            var player2Battleship =[];
            var player2Carrier = [];
            var player2Destroyer =[];


            const game={
                player1: player1,
                player2: player2,
                id: id,
                player1Battleship: player1Battleship,
                player1Carrier: player1Carrier,
                player1Destroyer: player1Destroyer,
                player2Battleship: player2Battleship,
                player2Carrier: player2Carrier,
                player2Destroyer: player2Destroyer,
                // player1Grid:initialGrid,
                // player2Grid:initialGrid,
                player1ShotsTaken: player1ShotsTaken,
                player2ShotsTaken: player2ShotsTaken,
                player1BattleshipSunk: false,
                player1CarrierSunk: false,
                player1DestroyerSunk: false,
                player2BattleshipSunk: false,
                player2CarrierSunk: false,
                player2DestroyerSunk: false,
                player1Win: false,
                player2Win: false,
                gameOver:false,
                turn: player1,
                lastAttack: {
                    row:null,
                    column:null
                },
                lastAttackResult: {
                    hit: false
                },
                turnIterator:0
            }
            // console.log('game:',game)
            activeGames.push(game)
            console.log('postUUId  mutation called')
            console.log('waiting room',waitingRoom)
            console.log('Active Game:',activeGames[0].id)
            console.log('Player 1:',activeGames[0].player1)
            console.log('Player 2:',activeGames[0].player2)
            return(id);
        }
      

    }
},
Subscription: {
    messages:  {
       subscribe: () => {
           return pubsub.asyncIterator(['MESSAGES'])
        }
    },
    message: {
        subscribe: () => pubsub.asyncIterator('MESSAGE_CREATED')
    },

    postCreated: {
        subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    }
 
}}

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
// const wsServer = new WebSocketServer({
//   server: httpServer,
//   path: '/graphql',
// });
// Save the returned server's info so we can shutdown this server later
// const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  context: ({req,res}) => ({req,res,pubsub}),
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
             subscriptionServer.close();
          },
        };
      },
    },
  ],
});
const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    async onConnect(connectionParams, webSocket,context) {
        console.log('connected')
        return {
            pubsub
        }
    },
    async onDisconnect(websocket) {
        console.log('disconnected')
    }
}, {server:httpServer, path:server.graphqlPath})
await server.start();

const corsOptions = {
    origin: "*",
    credentials: true
  };
app.use(cors(corsOptions));


// const publicPath = path.join(__dirname, '..', 'public');
// app.use(express.static(publicPath));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
//  });
 server.applyMiddleware({ app });
const PORT = 4000;

// Now that our HTTP server is fully set up, we can listen to it.
// .listen(process.env.PORT || 5000)
await new Promise(resolve => httpServer.listen({port:process.env.PORT || 4000},resolve));
console.log('started')
// app.listen(PORT, function() {
//     console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
//   });
  