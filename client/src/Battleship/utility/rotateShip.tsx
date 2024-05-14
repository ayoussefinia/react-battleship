import _ from 'lodash';
export default  function rotateShip(gameState:any, checkConflicts:any, setGameState:any, numGridEdge:any) {
    if(gameState.placingBattleShip) {
        const battleShip = gameState.battleShip
        const newBattleShip = _.cloneDeep(battleShip);
        if(!gameState.battleShipVertical){
            if(numGridEdge-2 >  battleShip[0].pos.y  && battleShip[0].pos.y > 0 ) {
                for(var i = 0; i <battleShip.length; i++) {
                    newBattleShip[i].pos.y = battleShip[2].pos.y - 1 +i;
                    newBattleShip[i].pos.x = battleShip[2].pos.x -1;
                }
                const conflict = checkConflicts(newBattleShip,'battleShip', gameState);
                if(conflict != true) {
                    setGameState({...gameState, battleShip: newBattleShip, battleShipVertical:true});
                }
            }
        } 
        else {
            if(battleShip[0].pos.x >0 && battleShip[0].pos.x <numGridEdge-2) {
                for(var i = 0; i <battleShip.length; i++) {
                    newBattleShip[i].pos.y = battleShip[2].pos.y - 1;
                    newBattleShip[i].pos.x = battleShip[2].pos.x - 1 +i;
                }
                const conflict = checkConflicts(newBattleShip,'battleShip',gameState);
                if(conflict != true) {
                    setGameState({...gameState, battleShip: newBattleShip, battleShipVertical:false});
                }
            }
        }

    } else if (gameState.placingCarrier) {
        const carrier = gameState.carrier;
        const newCarrier = _.cloneDeep(carrier);
        if(!gameState.carrierVertical){
            if(numGridEdge-2 >  carrier[0].pos.y  && carrier[0].pos.y > 1 ) {
                for(var i = 0; i <carrier.length; i++) {
                    newCarrier[i].pos.y = carrier[2].pos.y -2 +i;
                    newCarrier[i].pos.x = carrier[2].pos.x ;
                }
                const conflict = checkConflicts(newCarrier,'carrier',gameState);
                if(conflict != true) {
                    setGameState({...gameState, carrier: newCarrier, carrierVertical:true});
                }
            }
        } 
        else {
            if(carrier[0].pos.x >1 && carrier[0].pos.x <numGridEdge-2) {
                for(var i = 0; i <carrier.length; i++) {
                    newCarrier[i].pos.y = newCarrier[2].pos.y ;
                    newCarrier[i].pos.x = newCarrier[2].pos.x - 2 +i;
                }
                const conflict = checkConflicts(newCarrier,'carrier', gameState);
                if(conflict != true) {
                    setGameState({...gameState, carrier: newCarrier, carrierVertical:false});
                }
            }
        }
    } else if (gameState.placingDestroyer) {
        const destroyer = gameState.destroyer;
        const newDestroyer = _.cloneDeep(destroyer);
        if(!gameState.destroyerVertical){
     
            if(numGridEdge-1 >  destroyer[0].pos.y) {

                for(var i = 0; i <destroyer.length; i++) {
                    newDestroyer[i].pos.y = destroyer[1].pos.y +i;
                    newDestroyer[i].pos.x = destroyer[0].pos.x ;
                }

                const conflict = checkConflicts(newDestroyer,'destroyer', gameState);
                if(conflict != true) {
                    setGameState({...gameState, destroyer: newDestroyer, destroyerVertical:true});
                }
            }
        } 
        else {
            
            if(destroyer[0].pos.x <numGridEdge-1) {
                for(var i = 0; i <destroyer.length; i++) {
                    newDestroyer[i].pos.y = newDestroyer[0].pos.y ;
                    newDestroyer[i].pos.x = newDestroyer[0].pos.x +i;
                }
                const conflict = checkConflicts(newDestroyer,'destroyer', gameState);
                if(conflict != true) {
                    setGameState({...gameState, destroyer: newDestroyer, destroyerVertical:false});
                }
            }
        }

    }

}