import { useState, useEffect } from 'react';
import {styles} from '../styles/javaScriptStyles';
import '../styles/border.css';
import '../styles/game.css';
import { CSSTransition } from 'react-transition-group';
import { faHourglass1 } from '@fortawesome/free-solid-svg-icons';
export default function Grid(props:any) {
    const Styles = styles(props.gameState,props.delta);
    let [topPadding, setTopPadding] = useState({})

    useEffect(() => {
        console.log("grid useEffect called", props.gameState.gameStarted)
        if (props.gameState.gameStarted && window.innerWidth <= 586){
            setTopPadding({marginTop: '500px'})
        }
    }, [props.gameState.gameStarted])

    const noShipsPositioned = <div className='gridInfo'>Select a ship then click the grid to position the ship (make sure there is enough space)</div>
    const startGame = <div className='gridInfo'>Click Start Game</div>
    const positionNext = <div className='gridInfo'>Position Next Ship</div>
    const yourTurn = <div className='gridInfo'>Your Turn</div>
    const opponentTurn = <div className='gridInfo'>Opponent Turn</div>
    const waiting  = <div className='gridInfo'>Waiting for Opponent</div>
    return(
        <div className='alignGridInfo'>
        {props.gameState.battleShipsPlaced == false && props.gameState.destroyerPlaced == false && props.gameState.carrierPlaced == false ? noShipsPositioned : null}
        {props.gameState.gameStarted == false && props.gameState.battleShipsPlaced == true && props.gameState.destroyerPlaced == true && props.gameState.carrierPlaced == true ? startGame : null} 
        {props.gameState.gameStarted == false && (props.gameState.battleShipsPlaced == true || props.gameState.destroyerPlaced == true || props.gameState.carrierPlaced == true)
        && !(props.gameState.battleShipsPlaced == true && props.gameState.destroyerPlaced == true && props.gameState.carrierPlaced == true) ? positionNext : null} 
        {props.gameState.gameStarted == true && props.gameState.gameId == '' ? waiting : null}
        {props.gameState.gameStarted == true && props.gameState.gameId != '' && props.gameState.turn == true ? yourTurn : null}
        {props.gameState.gameStarted == true && props.gameState.gameId != '' && props.gameState.turn == false ? opponentTurn : null}
        <div className= {props.gameState.gameStarted? 'gameGridStyles gameGridGameStarted' : 'gameGridStyles '}
        style={topPadding}>
        {props.gameState.turn == true ? 
            props.gameState.opponentGrid.map((row:any, rowIndex:any)=>{return(
                row.map((col:any, colIndex:any)=>{return( <div style={props.gameState.opponentGrid[rowIndex][colIndex].firedAt ==true?
                                                                (props.gameState.opponentGrid[rowIndex][colIndex].hit==true?
                                                                    Styles.hitStyles : Styles.missedStyles):Styles.gridElementStyles}
                                                        // className= {props.gameState.opponentGrid[rowIndex][colIndex].firedAt ==true?
                                                        //     (props.gameState.opponentGrid[rowIndex][colIndex].hit==true?
                                                        //         'hitAnimation' : 'missedAnimation'): 'nothingClass'}
                                                        // onClick={()=>fireAtOpponent(rowIndex,colIndex)}
                                                        onClick={(e)=>props.fireOrPlace(e, rowIndex,colIndex, "fire")}
                                                        // onClick={(e) => props.postShot(e, rowIndex, colIndex)}
                                                   
                                                    ></div>)}) 
                )})
        :
        props.gameState.grid.map((row:any, rowIndex:any)=>{return(
            row.map((col:any, colIndex:any)=>{return( <div style={props.gameState.grid[rowIndex][colIndex].firedAt ==true?
                                                         (props.gameState.grid[rowIndex][colIndex].hit==true?
                                                              Styles.hitStyles :Styles.missedStyles):Styles.gridElementStyles}
                                                //    onClick={()=>fire(rowIndex,colIndex)}
                                                // onClick={(e)=>fireOrPlace(e, rowIndex,colIndex, "fire")}
                                                        
                                              ></div>)}) 
         )})}
        
                                                        
                                                        
        {/* {gameState.grid.map((row, rowIndex)=>{return(
           row.map((col, colIndex)=>{return( <div style={gameState.grid[rowIndex][colIndex].firedAt ==true?
                                                        (gameState.grid[rowIndex][colIndex].hit==true?
                                                             hitStyles : missedStyles):gridElementStyles}
                                                  onClick={()=>fire(rowIndex,colIndex)}
                                                        
                                             ></div>)}) 
        )})} */}
        {/* temproary because uuid issues, remove later*/}
        <CSSTransition in={props.gameState.carrierPlaced} timeout={1000} 
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
                 <div onClick={props.handleGridCarrierClick} style={Styles.gridCarrierStyle}> </div>
            </>
        </CSSTransition>
        <CSSTransition in={props.gameState.battleShipsPlaced} timeout={1000} 
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
            <div onClick={props.handleGridBattleShipClick} style={Styles.gridBattleShipStyle}> </div>
            </>
        </CSSTransition>
        <CSSTransition in={props.gameState.destroyerPlaced} timeout={1000}
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
             <div onClick={props.handleGridDestroyerClick} style={Styles.gridDestroyerStyle}> </div>
            </>
        </CSSTransition>
        {/* uncomment below out when uuid is fixed */}
        {/* <CSSTransition in={gameState.carrierPlaced && gameState.turn != gameState.uuid} timeout={1000} 
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
                 <div onClick={handleGridCarrierClick} style={gridCarrierStyle}> </div>
            </>
        </CSSTransition>
        <CSSTransition in={gameState.battleShipsPlaced && gameState.turn != gameState.uuid} timeout={1000} 
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
            <div onClick={handleGridBattleShipClick} style={gridBattleShipStyle}> </div>
            </>
        </CSSTransition>
        <CSSTransition in={gameState.destroyerPlaced && gameState.turn != gameState.uuid} timeout={1000}
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
             <div onClick={handleGridDestroyerClick} style={gridDestroyerStyle}> </div>
            </>
        </CSSTransition> */}

        
        
    </div>
    </div>
    )
}