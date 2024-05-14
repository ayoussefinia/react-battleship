import React from 'react'
import '../styles/border.css';
import '../styles/game.css';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import checkConflicts from '../utility/checkConflicts';
import { moveShipUp } from '../utility/moveShip';
import { moveShipLeft } from '../utility/moveShip';
import { moveShipRight } from '../utility/moveShip';
import { moveShipDown } from '../utility/moveShip';
import rotateShip from '../utility/rotateShip';
import { faArrowUp, faArrowLeft, faArrowRight, faArrowDown, faRotateLeft, faRotateRight, faCircleXmark, faShip, faBookSkull, faRocket } from '@fortawesome/free-solid-svg-icons'
import { styles } from '../styles/javaScriptStyles';
export default function ShipControl(props: any) {
    return (
        <div className='bottomDiv'
            style={{ backgroundColor: 'white', borderRadius: '20px', width: '97%', margin: '0% 1.5% 0% 1.5%', paddingBottom: '2px' }}>
            <div className='centerWrapper' style={{padding:'5px'}}>
                <CSSTransition in={props.gameState.battleShipsPlaced && props.gameState.carrierPlaced && props.gameState.destroyerPlaced && props.isSmallScreen}
                    timeout={1000} mountOnEnter={true} unmountOnExit={true} classNames="fade">
                    <>
                        <div className='startGameBtn' onClick={props.startGame}>Start Game</div>
                    </>
                </CSSTransition>
            </div>
            <div className='centerWrapper smallScreenWrapper'>
                <div className='center' style={{ width: "80%" }}>
                    <div className="shipSelection" style={props.selectionStyle}>
                        <div className="centerWrapper">
                            <div className="center" style={{ fontSize: '20px' }}>Select a Ship</div>
                        </div>
                        <div className="shipSection">
                            <div className="center">
                                <div
                                    className="defaultWrapper"
                                    onClick={props.handleCarrierClick}
                                >
                                    <div className={`${props.selectCarrierStyle}`}></div>
                                    <div className={`${props.selectCarrierStyle}`}></div>
                                    <div className={`${props.selectCarrierStyle}`}></div>
                                    <div className={`${props.selectCarrierStyle}`}></div>
                                    <div className={`${props.selectCarrierStyle}`}></div>
                                </div>
                            </div>
                        </div>
                        <div className="shipSection">
                            <div className="center">
                                <div
                                    className="defaultWrapper"
                                    onClick={props.handleBattleShipClick}
                                >
                                    <div className={`${props.selectBattleshipStyle}`}></div>
                                    <div className={`${props.selectBattleshipStyle}`}></div>
                                    <div className={`${props.selectBattleshipStyle}`}></div>
                                    <div className={`${props.selectBattleshipStyle}`}></div>
                                </div>
                            </div>
                        </div>
                        <div className="shipSection">
                            <div className="center">
                                <div
                                    className="defaultWrapper"
                                    onClick={props.handleDestroyerClick}
                                >
                                    <div className={`${props.selectDestroyerStyle}`}></div>
                                    <div className={`${props.selectDestroyerStyle}`}></div>
                                </div>
                            </div>

                        </div>
                        {/* <br /> */}
                    </div>

                </div>
                <div className='center switchOrder' style={{ width: "40%" }} >
                    <div className='buttonPanelContainer'>
                        <CSSTransition in={props.firstShipPlaced} timeout={1000}
                            mountOnEnter={true} unmountOnExit={true} classNames="fade">
                            <>
                                <div className="center manipulateTitle noSelect" style={{ fontSize: '20px', marginTop: '8px' }}>Position Ship</div>
                                <div className='manipulateShipPanel'>
                                    <div className='arrowUpContainer'>
                                        <FontAwesomeIcon icon={faArrowUp}
                                            className='arrowStyles'
                                            onClick={()=>moveShipUp(checkConflicts, props.setGameState, props.gameState)}
                                        />
                                    </div>
                                    <div className='leftAndRightContainer'>
                                        <div className='arrowLeftContainer'>
                                            <FontAwesomeIcon className='arrowStyles'
                                                icon={faArrowLeft}
                                                onClick={()=>moveShipLeft(checkConflicts, props.setGameState, props.gameState)}
                                            />
                                        </div>
                                        <div className='arrowRightContainer'>
                                            <FontAwesomeIcon icon={faArrowRight}
                                                className='arrowStyles'
                                                onClick={()=>moveShipRight(checkConflicts, props.setGameState, props.gameState)}
                                            />
                                        </div>
                                    </div>
                                    <div className='arrowDownContainer'>
                                        <FontAwesomeIcon icon={faArrowDown}
                                            className='arrowStyles'
                                            onClick={()=>moveShipDown(checkConflicts,props.setGameState, props.gameState)}
                                            />

                                    </div>
                                    <div className='rotateLeftAndRightContainer'>
                                        <div className='rotateLeftContainer'>
                                            <FontAwesomeIcon icon={faRotateLeft}
                                                className='arrowStyles'
                                                onClick={()=>rotateShip(props.gameState,checkConflicts,props.setGameState,props.numGridEdge)}
                                            />
                                        </div></div></div>
                            </>
                        </CSSTransition>


                    </div>
                </div>

            </div>
            <div className='centerWrapper'>
                <CSSTransition in={props.gameState.battleShipsPlaced && props.gameState.carrierPlaced && props.gameState.destroyerPlaced && !props.isSmallScreen}
                    timeout={1000} mountOnEnter={true} unmountOnExit={true} classNames="fade">
                    <>
                        <div className='startGameBtn' onClick={props.startGame}>Start Game</div>
                    </>
                </CSSTransition>
            </div>
        </div>
    )
} 