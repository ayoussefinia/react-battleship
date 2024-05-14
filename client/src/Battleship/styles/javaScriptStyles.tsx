import React from 'react';
import battleshipImage from  '../assets/battleship.svg'
import carrierImage from '../assets/carrier.svg';
import destroyerImage from '../assets/destroyer.svg'

 export function styles(gameState:any, delta:any) {

    const returnStyles= {
        hitStyles :{
            background: 'rgba(255, 34, 34, 0.5)'
        },
       missedStyles :{
            background: 'rgba(34, 41, 255, 0.5)'
        },
       gridBattleShipStyle : {
            position: 'absolute',
            top: gameState.battleShipVertical? (gameState.battleShip[0].pos.y * delta - delta) + 4 :  (gameState.battleShip[0].pos.y * delta) + 1,
            left: gameState.battleShipVertical? (gameState.battleShip[0].pos.x*delta) + 1 : (gameState.battleShip[0].pos.x*delta) + 2,
            // width: window.innerHeight*.75 * (4/8),
            // height: window.innerHeight*.75 * (3/8) /3 ,
            width: '164px',
            height: '40px',
            backgroundImage: `url(${battleshipImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat', 
            // backgroundSize: '100% 60%',
            transform: `rotate(${gameState.battleShipVertical? 90 : 0}deg) `,
            transformOrigin:'0% 100%',
            zIndex: gameState.gameStarted? (gameState.turn? -1: 0): 0,
            cursor: 'pointer',
            transitionProperty: 'all',
            transitionDuration: '0.5s'
        } as React.CSSProperties,
        miniGridBattleShipStyle : {
            position: 'absolute',
            top: gameState.battleShipVertical? (gameState.battleShip[0].pos.y *  12.5 -  12.5) :  (gameState.battleShip[0].pos.y *  12.5) ,
            left: gameState.battleShipVertical? (gameState.battleShip[0].pos.x* 12.5)  : (gameState.battleShip[0].pos.x* 12.5) ,
            // width: window.innerHeight*.75 * (4/8),
            // height: window.innerHeight*.75 * (3/8) /3 ,
            width: '50px',
            height: '12.5px',
            backgroundImage: `url(${battleshipImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat', 
            // backgroundSize: '100% 60%',
            transform: `rotate(${gameState.battleShipVertical? 90 : 0}deg) `,
            transformOrigin:'0% 100%',
            zIndex: gameState.gameStarted? (gameState.turn? 0: -1): 0,
            cursor: 'pointer'
        } as React.CSSProperties,
    
         gridCarrierStyle : {
            position: 'absolute',
            top: gameState.carrierVertical? (gameState.carrier[0].pos.y * delta - delta) + 4:  (gameState.carrier[0].pos.y * delta) + 1,
            left: gameState.carrierVertical? (gameState.carrier[0].pos.x*delta) + 1: (gameState.carrier[0].pos.x*delta) + 2,
            // width: window.innerHeight*.75 * (5/8),
            // height: window.innerHeight*.75 /8,
            width: '206px',
            height: '40px',
    
            backgroundImage: `url(${carrierImage})`,
            // backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat', 
            transform: `rotate(${gameState.carrierVertical? 90 : 0}deg) `,
            transformOrigin:'0% 100%',
            zIndex: gameState.gameStarted? (gameState.turn? -1: 0) : 0,
            cursor: 'pointer',
            transitionProperty: 'all',
            transitionDuration: '0.5s'
        } as React.CSSProperties,
        miniGridCarrierStyle : {
            position: 'absolute',
            top: gameState.carrierVertical? (gameState.carrier[0].pos.y *  12.5 -  12.5) :  (gameState.carrier[0].pos.y *  12.5),
            left: gameState.carrierVertical? (gameState.carrier[0].pos.x* 12.5): (gameState.carrier[0].pos.x* 12.5),
            // width: window.innerHeight*.75 * (5/8),
            // height: window.innerHeight*.75 /8,
            width: '62.5px',
            height: '12.5px',
    
            backgroundImage: `url(${carrierImage})`,
            // backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat', 
            transform: `rotate(${gameState.carrierVertical? 90 : 0}deg) `,
            transformOrigin:'0% 100%',
            zIndex: gameState.gameStarted? (gameState.turn? 0: -1) : 0,
            cursor: 'pointer'
        } as React.CSSProperties,
    
         gridDestroyerStyle : {
            position: 'absolute',
            top: gameState.destroyerVertical? (gameState.destroyer[0].pos.y * delta - delta) + 4 :  (gameState.destroyer[0].pos.y * delta) + 1,
            left: gameState.destroyerVertical? (gameState.destroyer[0].pos.x*delta) + 1: (gameState.destroyer[0].pos.x*delta) + 2,
            // width: window.innerHeight*.75 * (destroyerLength/numGridEdge),
            // height: window.innerHeight*.75/numGridEdge,
            width: '80px',
            height: '40px',
            backgroundImage: `url(${destroyerImage})`,
            // backgroundSize: '100% 60%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: `rotate(${gameState.destroyerVertical? 90 : 0}deg) `,
            transformOrigin:'0% 100%',
            zIndex: gameState.gameStarted? (gameState.turn? -1: 0): 0,
            cursor: 'pointer',
            transitionProperty: 'all',
            transitionDuration: '0.5s'
        } as React.CSSProperties,
        miniGridDestroyerStyle : {
            position: 'absolute',
            top: gameState.destroyerVertical? (gameState.destroyer[0].pos.y * 12.5-  12.5) :  (gameState.destroyer[0].pos.y *  12.5),
            left: gameState.destroyerVertical? (gameState.destroyer[0].pos.x* 12.5) : (gameState.destroyer[0].pos.x* 12.5) ,
            // width: window.innerHeight*.75 * (destroyerLength/numGridEdge),
            // height: window.innerHeight*.75/numGridEdge,
            width: '25px',
            height: '12.5px',
            backgroundImage: `url(${destroyerImage})`,
            // backgroundSize: '100% 60%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: `rotate(${gameState.destroyerVertical? 90 : 0}deg) `,
            transformOrigin:'0% 100%',
            zIndex: gameState.gameStarted? (gameState.turn? 0: -1): 0,
            cursor: 'pointer'
        } as React.CSSProperties,
        gridElementStyles : {
            width: '100%',
            height: '100%',
            border: '1px solid black',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr'
        },
    
        statsSection : {
            width: '100%',
            height: '20%',
            background: 'white',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        } as React.CSSProperties,
    
        displayNoneStyles : {
            display: 'none'
        },
        powerLevelsContainer : {
            width: '100%',
            height: '20%',
            // border: '1px solid black',
            // position: 'relative',
            display: 'flex',
            top: 0
        },
        progressBarStyle : {
            width: '100%',
            height: '100%',
            display: 'flex',
    
        },
        shotResult : {  
            width: '200px',
            height: '50px',
            color: 'blue',
            // fontSize: '4rem'
        },
        progressLeft : {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '49%',
            height: '15%'
        }as React.CSSProperties,
        progressRight: {
            transform: 'rotate(180deg)',
            position: 'absolute',
            right: 0,
            top: 0,
            width: '49%',
            height: '15%'
        }as React.CSSProperties,
    
        statsLeft: {
            position: 'absolute',
            left: 0,
            bottom:0,
            width: '50%',
            height: '80%',
        
            display: 'flex',
            alignItems: 'center'
        }as React.CSSProperties,
        statsRight: {
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            bottom:0,
            right: 0,
            width: '50%',
            height: '80%',
    
        }as React.CSSProperties,
    
        playerTitle: {
            position: 'absolute',
            top: 0,
            left: '20px',
            fontFamily: 'Orbitron',
            fontWeight: 500,
            fontSize: '1.15em',
            color: 'rgb(55,106,161)'
    
        } as React.CSSProperties,
        opponentTitle: {
            position: 'absolute',
            top: 0,
            right: '20px',
            fontFamily: 'Orbitron',
            fontWeight: 500,
            fontSize: '1.15em',
            color: 'rgb(55,106,161)'
        }as React.CSSProperties,
    
         vs : {
            fontFamily: 'Orbitron',
            fontWeight: 500,
            fontSize: '1.5em',
            color: 'rgb(55,106,161)',
            justifySelf: 'center',
            alignSelf: 'center'
        }as React.CSSProperties,
    
         miniGridStyles :{
            background: 'white',
            position: 'absolute',
            bottom: '25px',
            right: '25px',
            width: '100px',
            height: '100px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
            gridTemplateRows:' 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
        } as React.CSSProperties
    


    }

return returnStyles;
}