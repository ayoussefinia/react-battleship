import React, {useRef, useEffect, useState, MouseEvent} from 'react';
import  _ from 'lodash'
import { CSSTransition } from 'react-transition-group';
import handleShipPlacement from './utility/handleShipPlacement';
import placeShip from './utility/placeShip';
import './styles/border.css'
import './styles/game.css';
import {styles} from './styles/javaScriptStyles';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShipControl from './Components/ShipControl';
import MiniGrid from './Components/MiniGrid';
import TopSection from './Components/TopSection';
import Grid from './Components/Grid';
import {ProgressBar} from 'react-bootstrap';
// import { isAbsolute } from 'path';
import { Rocket } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { gql, useMutation, useQuery } from '@apollo/client';

export default  function BattleShip() { 
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [gameState, setGameState] = useState({
                                    grid: [
                                        [{row:0,column:0,hit:false,firedAt:false}]
                                    ],
                                    opponentGrid: [
                                        [{row:0,column:0,hit:false,firedAt:false}]
                                    ],
                                    battleShip: [
                                                 {hit:false, pos:{x:0, y:0}},
                                                 {hit:false, pos:{x:0, y:0}},
                                                 {hit:false, pos:{x:0, y:0}},
                                                 {hit:false, pos:{x:0, y:0}}
                                                ],
                                    carrier :   [
                                                {hit:false, pos:{x:0, y:0}},
                                                {hit:false, pos:{x:0, y:0}},
                                                {hit:false, pos:{x:0, y:0}},
                                                {hit:false, pos:{x:0, y:0}},
                                                {hit:false, pos:{x:0, y:0}}
                                                ],
                                    destroyer:  [
                                                {hit:false, pos:{x:0, y:0}},
                                                {hit:false, pos:{x:0, y:0}},
                                    ],
                                    opponentShotsTaken: [{
                                        row:null,
                                        col: null    
                                    }],
                                    gameGrid:[[]],
                                    battleShipsPlaced: false,
                                    carrierPlaced: false,
                                    destroyerPlaced: false, 
                                    placingBattleShip: false,
                                    placingCarrier: false,
                                    placingDestroyer: false,
                                    manipulatingBattleShip: false,
                                    battleShipVertical: false,
                                    carrierVertical: false,
                                    destroyerVertical:false,
                                    gameStarted: false,
                                    gameStartedBackend: false,
                                    uuid: '' ,
                                    gameId: '',
                                    turn: true,
                                    playerTurn: '',
                                    opponentShotHit:false,
                                    energyLevel: 100,
                                    opponentEnergyLevel: 100,
                                    turnTaken: false,
                                    statusText: '',
                                    oppBattleshipSunk: false,
                                    oppCarrierSunk: false,
                                    oppDestroyerSunk: false,
                                    myBattleshipSunk: false,
                                    myCarrierSunk: false,
                                    myDestroyerSunk: false,
                                    gameWon: false,
                                    gameLost: false
                                    });
    let [selectedShip, setSelectedShip] = useState("");
    let [isSmallScreen, setIsSmallScreen] = useState(false)



    // const POST_GAME_ARRAY = gql`

    // on page load do the following: 
     useEffect(()=>{
        //  change background only when battleship is being played
        if (isInitialRender){
            setIsInitialRender(false)
            document.body.style.backgroundImage = 'linear-gradient(#74acd6, #0c3c7c)';
            if (document.body.clientHeight <= 675 || document.body.clientWidth <= 360){
                setIsSmallScreen(true)
            }
        }

        let gameGrid = Array(numGridEdge).fill(null).map(row => new Array(numGridEdge).fill(null))
        for(var i =0; i<numGridEdge;i++){
            for(var j=0; j<numGridEdge; j++){
                let  obj={column:0, row:0, hit:false, firedAt:false}
                obj.row = i;
                obj.column=j
                gameGrid[i][j] = obj
            }
        }

        let opponentGrid = Array(numGridEdge).fill(null).map(row => new Array(numGridEdge).fill(null))
        for(var i =0; i<numGridEdge;i++){
            for(var j=0; j<numGridEdge; j++){
                let  obj={column:0, row:0, hit:false, firedAt:false}
                obj.row = i;
                obj.column=j
                opponentGrid[i][j] = obj
            }
        }


        // if(!localStorage.getItem("uuid")) {
        const uuid = uuidv4();
        //     localStorage.setItem("uuid", uuid)
        // }
    
        // const uuid = JSON.stringify(localStorage.getItem("uuid"))

        setGameState({...gameState, grid: gameGrid, opponentGrid: opponentGrid, uuid: uuid});
    },[])

    useEffect(()=>{
        if(gameState.gameLost || gameState.gameWon) {
            setGameState({...gameState, gameStarted: false, gameId:""})
        }

    },[gameState.gameWon, gameState.gameLost])

    // useEffect(()=>{
    //     var sunk = true; 
    //     var gameLost = false; 
    //     for(var i= 0;  i<gameState.battleShip.length ; i++) {
    //         if (gameState.battleShip[i].hit == false) {
    //             sunk = false;
    //         }
    //     }
    //     if (gameState.myCarrierSunk && gameState.myDestroyerSunk && sunk) {
    //         gameLost = true;
    //     }
    //     setGameState({...gameState, myBattleshipSunk: sunk, gameLost: gameLost})
        
    // // }, [gameState.battleShip])
    // useEffect(()=>{
    //     var sunk = true; 
    //     var gameLost = false; 
    //     for(var i= 0;  i<gameState.carrier.length ; i++) {
    //         if (gameState.carrier[i].hit == false) {
    //             sunk = false;
    //         }
    //     }
    //     if (gameState.myBattleshipSunk && gameState.myDestroyerSunk && sunk) {
    //         gameLost = true;
    //         setGameState({...gameState, myCarrierSunk: sunk, gameLost: gameLost})
    //     }
    // }, [gameState.carrier])
    // useEffect(()=>{
    //     var sunk = true; 
    //     var gameLost = false; 
    //     for(var i= 0;  i<gameState.destroyer.length ; i++) {
    //         sunk = false; 
    //     }
    //     if (gameState.myBattleshipSunk && gameState.myCarrierSunk && sunk) {
    //         gameLost = true;
    //     }
    //     setGameState({...gameState, myDestroyerSunk: sunk, gameLost: gameLost})
    // }, [gameState.destroyer])

//GLOBALS
    const numGridEdge =8;
    const gridEdgeLength= 336;
    const delta = (gridEdgeLength)/numGridEdge;


    let [selectCarrierStyle, setSelectCarrierStyle] = useState('shipDefaultStyle')
    let [selectBattleshipStyle, setSelectBattleshipStyle] = useState('shipDefaultStyle')
    let [selectDestroyerStyle, setSelectDestroyerStyle] = useState('shipDefaultStyle')

    function handleBattleShipClick() {
        setGameState({...gameState, placingBattleShip:true, placingCarrier:false});
        highlightBattleship()
    }
    function handleDestroyerClick () {
        setGameState({...gameState, placingDestroyer:true, placingBattleShip:false, placingCarrier:false});
        highlightDestroyer()
    }
    function handleCarrierClick (){
        setGameState({...gameState, placingCarrier:true, placingBattleShip:false});
        highlightCarrier()
    }
    function handleGridCarrierClick () {
        setGameState({...gameState, placingBattleShip:false, placingCarrier:true, placingDestroyer:false});
        highlightCarrier()
    }
    function handleGridBattleShipClick () {
        setGameState({...gameState, placingBattleShip:true, placingCarrier:false, placingDestroyer:false});
        highlightBattleship()
    }
    function handleGridDestroyerClick () {
        setGameState({...gameState, placingDestroyer:true, placingCarrier:false, placingBattleShip:false});
        highlightDestroyer()
    }

    function highlightCarrier(){
        setSelectedShip("carrier")
        setSelectCarrierStyle('shipSelectedStyle')
        setSelectBattleshipStyle('shipDefaultStyle')
        setSelectDestroyerStyle('shipDefaultStyle')
        setShipSelectShadow(false)
    }
    function highlightDestroyer(){
        setSelectedShip("destroyer")
        setSelectCarrierStyle('shipDefaultStyle')
        setSelectBattleshipStyle('shipDefaultStyle')
        setSelectDestroyerStyle('shipSelectedStyle')
        setShipSelectShadow(false)
    }
    function highlightBattleship(){
        setSelectedShip("battleship")
        setSelectCarrierStyle('shipDefaultStyle')
        setSelectBattleshipStyle('shipSelectedStyle')
        setSelectDestroyerStyle('shipDefaultStyle')
        setShipSelectShadow(false)
    }

    const Styles = styles(gameState,delta);

    function setManipulateTrue() {
        setGameState({...gameState, manipulatingBattleShip: true});
    }

    async function startGame() {
        await postUUID({variables: {payload: gameState.uuid}})
        setGameState({...gameState, gameStarted: true})
    }


    async function postShips(gameId:any) {
        var postObj = {
            battleShip: [{}],
            destroyer: [{}],
            carrier: [{}],
            gameId: gameId,
            uuid: gameState.uuid
        }
        postObj.battleShip = gameState.battleShip;
        postObj.destroyer = gameState.destroyer;
        postObj.carrier = gameState.carrier;
        const result = await postShipCoordinates({variables: {payload: JSON.stringify(postObj)}})
        console.log("result from post ships: " , result)
    }

    async function postShot(e:any, row:any, col:any) {
        if(gameState.gameStarted && gameState.gameId != '' && gameState.turn ) {
            var postObj = {
                row: row,
                col: col,
                uuid: gameState.uuid,
                gameId: gameState.gameId
            };
            const result = await postShotCoordinate({variables: {payload: JSON.stringify(postObj)}});
            console.log("result from post shot coordinate: " , result.data.postShotCoordinate)
            // let opponentGrid = Array(numGridEdge).fill(null).map(row => new Array(numGridEdge).fill(null))
            // for(var i =0; i<numGridEdge;i++){
            //     for(var j=0; j<numGridEdge; j++){
            //         let  obj={column:0, row:0, hit:false, firedAt:false}
            //         obj.row = i;
            //         obj.column=j
            //         opponentGrid[i][j] = obj
            //     }
            // }
            if(result.data.postShotCoordinate !=null) {
                const responseObj = JSON.parse(result.data.postShotCoordinate)
                console.log("*****parsed response object: "+ responseObj);
                if(responseObj.hit == false) {
                    console.log("you missed")
                    // props.gameState.opponentGrid

                    gameState.opponentGrid[row][col].firedAt = true;
                    gameState.opponentGrid[row][col].hit = false;
                    setGameState({...gameState, statusText: "YOU MISSED", turn: false})
                } else if (responseObj.hit == true){
                    var rString = "YOU HIT YOUR OPPONENT"
                    var battleShipSunk = gameState.oppBattleshipSunk;
                    var carrierSunk = gameState.oppCarrierSunk;
                    var destroyerSunk = gameState.oppDestroyerSunk;
                    if (responseObj.battleshipSunk && !battleShipSunk) {
                        battleShipSunk = true;
                        rString = "YOU SUNK YOUR OPPONENTS BATTLESHIP";
                    } 
                    if (responseObj.carrierSunk && !carrierSunk ) {
                        carrierSunk = true;
                        rString = "YOU SUNK YOUR OPPONENTS CARRIER";
                    }
                    if (responseObj.destroyerSunk && !destroyerSunk) {
                        rString = "YOU SUNK YOUR OPPONENTS DESTROYER";
                        destroyerSunk = true
                    }
                    gameState.opponentGrid[row][col].firedAt = true;
                    gameState.opponentGrid[row][col].hit = true;
                    const newOpponentEnergyLevel = gameState.opponentEnergyLevel-9.0909;
                    setGameState({...gameState, statusText: rString, turn: false, opponentEnergyLevel: newOpponentEnergyLevel, oppBattleshipSunk: battleShipSunk, oppCarrierSunk: carrierSunk, oppDestroyerSunk: destroyerSunk})
                }
            }
        }
        // setGameState({...gameState, turn: false});
    }
    const POST_UUID= gql`
    mutation($payload:String!) {
        postUUID(payload: $payload)
    }
    `
    const POST_SHIP_COORDINATES=gql`
    mutation($payload: String!) {
        postShipCoordinates(payload: $payload)
    }
    `

    const GET_GAME_ID= gql`
    query($payload: String!) {
        getGameId(payload: $payload)
    }
    `

    const GET_OPPONENT_SHOT_DATA= gql`
    query($payload: String!) {
        getOpponentShotsTaken(payload: $payload)
    }
    `

    const POST_SHOT_COORDINATE= gql`
    mutation($payload: String!) {
        postShotCoordinate(payload: $payload)
    }
    `
    const[postShotCoordinate]= useMutation(POST_SHOT_COORDINATE);
    const [postUUID] = useMutation(POST_UUID);
    const [postShipCoordinates] = useMutation(POST_SHIP_COORDINATES);

    const GamePoll =() => {
        var gameData = {
            gameId: gameState.gameId,
            playerId: gameState.uuid
        }
        const stringData = JSON.stringify(gameData);
        const {loading, error, data } = useQuery(GET_OPPONENT_SHOT_DATA, {
            variables: {payload: stringData},
            pollInterval: 5000,
            notifyOnNetworkStatusChange: true
        });

        if(error) {
            console.log('query error:',error);
        }
        if(loading) {
            console.log('query loading: ', loading)
        }
        if(data != null) {
            console.log("data: "+data)
            console.log("data.getOpponentShotsTaken: "+data.getOpponentShotsTaken)
            const parsedData = JSON.parse(data.getOpponentShotsTaken)
            console.log("data.getOpponentShotsTaken length: "+parsedData.length)
  
            console.log("made it inside fi")
        
            console.log("parsed data: "+ parsedData)
            console.log("parsed data length "+ parsedData.length)
            if(parsedData.length > 0) {
                // const returnObj = JSON.parse(data.getOpponetShotsTaken);
                console.log("opponent shots taken object: "+parsedData)
                console.log("gaame state opponent shots taken length: "+ gameState.opponentShotsTaken.length)
                
                // console.log("opponent shots taken object length:" +returnObj.length)
                if(parsedData.length  > gameState.opponentShotsTaken.length || (parsedData.length == 1 && gameState.opponentShotsTaken[0].row ==null)) {
                    console.log("OPPONENT SHOT RECEIVED");
                    var newOpponentShotsTakenArray = [];
                    for(var i = 0; i<parsedData.length; i++) {
                        var obj = {
                            row:null,
                            col: null    
                        };
                        obj.row = parsedData[i].row;
                        obj.col = parsedData[i].col;
                        newOpponentShotsTakenArray.push(obj);
                    }
                    console.log("new OPPShotTakenArr: "+ newOpponentShotsTakenArray);
                    var opponentShotResult = "Opponent Missed"
                    console.log("parsed data row: "+parsedData[parsedData.length-1].row)
                    console.log("parsed data col: "+parsedData[parsedData.length-1].col)
                    const row = parsedData[parsedData.length-1].row;
                    const col = parsedData[parsedData.length-1].col
                    var newEnergyLevel = gameState.energyLevel;
                    for(var i=0; i<gameState.battleShip.length; i++) {
                        if(gameState.battleShip[i].pos.x == parsedData[parsedData.length-1].col && gameState.battleShip[i].pos.y == parsedData[parsedData.length-1].row){
                            opponentShotResult = "Opponent Hit Your Battleship"
                            gameState.grid[row][col].firedAt = true;
                            gameState.grid[row][col].hit = true;  
                            newEnergyLevel = gameState.energyLevel-9.0909;
                        }
                    }
                    for(var i=0; i<gameState.carrier.length; i++) {
                        if(gameState.carrier[i].pos.x == parsedData[parsedData.length-1].col && gameState.carrier[i].pos.y == parsedData[parsedData.length-1].row){
                            gameState.grid[row][col].firedAt = true;
                            gameState.grid[row][col].hit = true;  
                            opponentShotResult = "Opponent Hit Your Carrier"
                            newEnergyLevel = gameState.energyLevel-9.0909;
                        }
                    }
                    for(var i=0; i<gameState.destroyer.length; i++) {
                        if(gameState.destroyer[i].pos.x == parsedData[parsedData.length-1].col && gameState.destroyer[i].pos.y == parsedData[parsedData.length-1].row){
                            gameState.grid[row][col].firedAt = true;
                            gameState.grid[row][col].hit = true;  
                            opponentShotResult = "Opponent Hit Your Destroyer"
                            newEnergyLevel = gameState.energyLevel-9.0909;
                        }
                    }
                    if(opponentShotResult == "Opponent Missed" ) {
                        gameState.grid[row][col].firedAt = true;
                        gameState.grid[row][col].hit = false;  
                        setGameState({...gameState, opponentShotsTaken: newOpponentShotsTakenArray, turn: true, statusText: opponentShotResult, energyLevel: newEnergyLevel});
                    } else {
                        setGameState({...gameState, opponentShotsTaken: newOpponentShotsTakenArray, turn: true, statusText: opponentShotResult, energyLevel: newEnergyLevel});
                    }
                }
            }


        }
        return(<></>)
    }

    const WaitForOpponent = () => {
        const { loading, error, data , stopPolling, startPolling} = useQuery(GET_GAME_ID, {
            variables: { payload: gameState.uuid },
            pollInterval: 5000,
            notifyOnNetworkStatusChange: true
          });

          if(error) {
              console.log('query error:',error);
          }
          if(loading) {
              console.log('query loading: ', loading)
          }
          if(data != null) {
    
            if(data.getGameId != null && data.getGameId != "Still Waiting") {
                const returnObj = JSON.parse(data.getGameId);
                console.log("game Id: " + returnObj.id + "Turn: "+ returnObj.turn);
                // stopPolling();
                var turn = false;
                console.log("***** data.getGameId.turn: "+ returnObj.turn);
                console.log("***** gamestate.uuid " + gameState.uuid);
                if (returnObj.turn == gameState.uuid) {
                    console.log("Your Turn First ");
                    turn = true; 
                }
                setGameState({...gameState, gameId: data.getGameId, turn: turn});
                console.log("game state game Id: " + gameState.gameId)
                postShips(data.getGameId); 
            }
  
            // else {
            //     console.log(data)
            // }
          }
          return(<></>)
    }



    
    // const GameStartedMessage = ()=> {
    //     const { loading, error, data } = useQuery(GET_GAME_ID, {
    //         variables: { payload: gameState.uuid },
    //         pollInterval: 5000,
    //         notifyOnNetworkStatusChange: true
    //       });

    //       if(error) {
    //           console.log('query error:',error);
    //       }
    //       if(loading) {
    //           console.log('query loading: ', loading)
    //       }
    //       if(data != null) {
    //           console.log('game data', data)
    //         // if(data.gameId != null) {
    //         //     return <div style={gameStartedBox}>Game Started</div>
    //         // }
  
    //         // else {
    //         //     console.log(data)
    //         // }
    //       }
    //       return <div style={gameStartedBox}>Waiting for Another Player to Join</div>
    // }
  

    // const [getGameId] = useQuery(GET_GAME_ID, {
    //             variables: { payload: gameState.uuid},
    //             pollInterval: 5000,
    //             notifyOnNetworkStatusChange: true
    //         });

    function fire(row:any, col:any) {
        let opponentShotHit= false;
        console.log('fired')
        const newGrid = gameState.grid;
        let newObj = {row:row, column:col, firedAt:true, hit: false}
        if(gameState.gameStarted) {
            for(var i=0; i<gameState.battleShip.length; i++) {
                if (gameState.battleShip[i].pos.x == col && gameState.battleShip[i].pos.y==row) {
                    newObj.hit =true;
                    opponentShotHit=true;
                }
            }
            for(var i=0; i<gameState.carrier.length; i++) {
                if (gameState.carrier[i].pos.x == col && gameState.carrier[i].pos.y==row) {
                    newObj.hit =true;
                    opponentShotHit=true;
                }
            }
            for(var i=0; i<gameState.destroyer.length; i++) {
                if (gameState.destroyer[i].pos.x == col && gameState.destroyer[i].pos.y==row) {
                    newObj.hit =true;
                    opponentShotHit=true;
                }
            }
            newGrid[row][col]= newObj;
            console.log(newGrid)
        }
        setGameState({...gameState, grid: newGrid, opponentShotHit: opponentShotHit})
        const newEnergyLevel = opponentShotHit? gameState.energyLevel-9.0909: gameState.energyLevel;
        setTimeout(()=>{setGameState({...gameState, turn: !gameState.turn, energyLevel: newEnergyLevel})}, 2000)
    }

    function fireAtOpponent(row:any, col:any) {
        console.log('fire at opponent called')
        const fireCoordinate ={
            row: row,
            column: col,
            gameId: gameState.gameId,
            // uuid: gameState.uuid
        }
    }

    function fireOrPlace(e: any, rowIndex:any, colIndex:any, player:string){
        let shipPlaced = false
        switch(selectedShip){
            case 'battleship': shipPlaced = gameState.battleShipsPlaced
                break;
            case 'carrier': shipPlaced = gameState.carrierPlaced
                break;
            case 'destroyer': shipPlaced = gameState.destroyerPlaced
                break;
        }
        /* if game hasn't started this causes errors in ship placement. if ship 5 is placed, and ship 4 isn't, if the user selects
        ship 4, then back to 5, then selects a place on the board, the board won't let them place ship 4 after that. 
        */
        // if (gameState.gameStarted && shipPlaced){
        //     player == "fireAtOpponent" ? fireAtOpponent(rowIndex,colIndex) : fire(rowIndex,colIndex)
        // } else if (gameState.gameStarted && shipPlaced) {
        //     player ==  "fire" ? fire(rowIndex,colIndex) : console.log();
        // }
        if (gameState.gameStarted && shipPlaced){
            player == "fire" ? postShot(e, rowIndex, colIndex) : console.log("NOT YOUR TURN")
        }
        
        else{
            handleShipPlacement(selectedShip, rowIndex, colIndex, gameState,setGameState,placeShip) 
        }
        
    }
    
    // shadow for shipSelection and board depending on if the user has selected a ship or placed a ship
    let [shipSelectShadow, setShipSelectShadow] = useState(true)
    const highlightArea = { boxShadow: '0 0 0 5000px rgb(0 0 0 / 60%)', zIndex: '10',
                            borderRadius: '150px', transition: 'all 0.4s ease', paddingTop: ''}
    const emptyHighlightArea = { boxShadow: '', zIndex: '', borderRadius: '', transition: 'all 0.4s ease', paddingTop: ''}
    let [selectionStyle, setSelectionStyle] = useState(highlightArea)
    let [boardStyle, setBoardStyle] = useState(emptyHighlightArea)
    let [firstShipPlaced, setFirstShipPlaced] = useState(false)
    let [boardText, setBoardText] = useState("")

    // once ship is selected
    useEffect(() => {
        if (!shipSelectShadow){
            setSelectionStyle(emptyHighlightArea)

            setBoardStyle({boxShadow: '0 0 0 5000px rgb(0 0 0 / 60%)', zIndex: '10',
            borderRadius: '', transition: 'all 0.4s ease', paddingTop: '20px'})
            setBoardText('Place ship here')
        }
    }, [shipSelectShadow])
    
    // once ship is placed
    useEffect(() => {
        if (!firstShipPlaced){
            if(gameState.battleShipsPlaced || gameState.carrierPlaced || gameState.destroyerPlaced){
                setFirstShipPlaced(true)
                setBoardStyle(emptyHighlightArea)
                setBoardText('')
            }
        }
    }, [gameState])

    const YouWin = ()=> {
        return (
            <h1>YOU WINNN</h1>
        )
    }
    
    const YouLoose = ()=> {
        return (
            <h1>YOU WINNN</h1>
        )
    }

function clicked() {
    console.log('gameState.gameId', gameState.gameId);
    console.log('gameState.turn', gameState.turn)
}
console.log("COMPONENT RE-RENDERED");
console.log("GAME ID: "+ gameState.gameId);
console.log("YOUR PLAYER ID: "+gameState.uuid);
console.log("WHOS TURN: "+ gameState.turn);

    return(
        <div  className="noSelect gameBody">
            {gameState.gameStarted == true && gameState.gameId == '' ? <WaitForOpponent/> : null}
            {gameState.gameStarted == true && gameState.gameId != '' ? <GamePoll/> : null}
            {gameState.oppBattleshipSunk && gameState.oppCarrierSunk && gameState.oppDestroyerSunk ? <YouWin/> : null}
            {/* {gameState.myBattleshipSunk && gameState.myCarrierSunk && gameState.myDestroyerSunk ? <YouLoose/> : null} */}
            <TopSection
                gameState={gameState}
            />
            {/* {gameStaste.gameStarted ? <GameStartedMessage uuid={gameState.uuid}/> : <div/>} */}
            <div className='centerWrapper'>
                <div className='center'>
                        <br/>
                </div>
            </div>
            <br/>
            <div className='centerWrapper'>
                <div className='center highlightBoard' style={boardStyle} display-content={boardText} >
                    <Grid
                        gameState={gameState}
                        delta={delta}
                        fireOrPlace={fireOrPlace}
                        postShot={postShot}
                        handleGridCarrierClick={handleGridCarrierClick}
                        handleGridBattleShipClick={handleGridBattleShipClick}
                        handleGridDestroyerClick={handleGridDestroyerClick}
                    />
                </div>
            </div>
            <MiniGrid
                gameState={gameState}
                delta={delta}
                fireOrPlace={fireOrPlace}
            />
            <br/>
            <CSSTransition in={!gameState.gameStarted} timeout={1000}
                        mountOnEnter={true} unmountOnExit={true} classNames="fade">
                <>
                    <ShipControl
                        handleCarrierClick={handleCarrierClick}
                        handleBattleShipClick={handleBattleShipClick}
                        handleDestroyerClick={handleDestroyerClick}
                        selectCarrierStyle={selectCarrierStyle}
                        selectBattleshipStyle={selectBattleshipStyle}
                        selectDestroyerStyle={selectDestroyerStyle}
                        gameState={gameState}
                        setGameState={setGameState}
                        numGridEdge={numGridEdge}
                        startGame={startGame}
                        isSmallScreen={isSmallScreen}
                        firstShipPlaced={firstShipPlaced}
                        selectionStyle={selectionStyle}
                        boardStyle={boardStyle}
                        boardText={boardText}
                    />                                                          
                </>
            </CSSTransition>
        </div>
    );
    
};