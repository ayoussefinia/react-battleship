import React from 'react';
import _ from 'lodash';
export default function checkConflicts(newShip:any, shipType:string, gameState:any) {
        
    let battleDestroyerConflict = false;
    let battleCarrierConflict = false; 
    let destroyerCarrierConflict =false;
    let carrier = gameState.carrier;
    let battleShip= gameState.battleShip;
    let destroyer = gameState.destroyer;
    if(shipType=='carrier') {
        carrier=newShip;
    } else if (shipType=='destroyer'){
        destroyer=newShip
    } else {battleShip=newShip}

    let carrierStringArray=[];
    let destroyerStringArray=[];
    let battleShipStringArray=[];
    for(let i=0;i<carrier.length;i++){carrierStringArray.push(JSON.stringify(carrier[i].pos))}
    for(let i=0;i<destroyer.length;i++){destroyerStringArray.push(JSON.stringify(destroyer[i].pos))}
    for(let i=0;i<battleShip.length;i++){battleShipStringArray.push(JSON.stringify(battleShip[i].pos))}
   
    for(let i=0;i<carrier.length;i++){
        if(_.includes(destroyerStringArray, carrierStringArray[i]) && 
        gameState.carrierPlaced==true && gameState.destroyerPlaced==true){
            destroyerCarrierConflict =true;
        } else if(_.includes(battleShipStringArray, carrierStringArray[i]) &&
        gameState.carrierPlaced==true && gameState.battleShipsPlaced==true
        ){
            battleCarrierConflict = true;
        }
    }

    for(let i=0;i<battleShip.length;i++){
        if(_.includes(destroyerStringArray, battleShipStringArray[i]) &&
        gameState.battleShipsPlaced==true && gameState.destroyerPlaced==true
        ) {
            battleDestroyerConflict = true;
        }
    }

    console.log(destroyerStringArray)
    for(var i=0 ; i<carrier.length;i++){


        console.log('conflicts',battleDestroyerConflict,battleCarrierConflict,destroyerCarrierConflict)
        if(battleDestroyerConflict==true||battleCarrierConflict==true
            ||destroyerCarrierConflict==true ) {
                return true
            }
        return false;
    }
}
