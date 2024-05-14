import React from 'react';
import _ from 'lodash';


export function moveShipUp(checkConflicts: any, setGameState:any, gameState: any) {
        if(gameState.placingBattleShip){
            const battleShip = _.cloneDeep(gameState.battleShip);


            if(battleShip[0].pos.y > 0) {
                for(var i = 0; i <battleShip.length; i++) {
                    battleShip[i].pos.y = battleShip[i].pos.y -1;
                }
                const conflict = checkConflicts(battleShip,'battleship', gameState);
                if(conflict !=true) {
                    setGameState({...gameState, battleShip: battleShip});
                }
                
            }
        } else if (gameState.placingCarrier) {
            const carrier = _.cloneDeep(gameState.carrier)
            if(carrier[0].pos.y > 0) {
                for(var i = 0; i <carrier.length; i++) {
                    carrier[i].pos.y = carrier[i].pos.y -1;
                }
                const conflict = checkConflicts(carrier,'carrier', gameState);
                if(conflict !=true) {
                    setGameState({...gameState, carrier: carrier});
                }
            }
        } else if (gameState.placingDestroyer) {
            const destroyer = _.cloneDeep(gameState.destroyer)
            if(destroyer[0].pos.y > 0) {
                for(var i = 0; i <destroyer.length; i++) {
                    destroyer[i].pos.y = destroyer[i].pos.y -1;
                }
                const conflict = checkConflicts(destroyer,'destroyer', gameState);
                if(conflict!= true) {
                    setGameState({...gameState, destroyer: destroyer});
                }
            }
        }
    }

    export function moveShipLeft(checkConflicts: any, setGameState:any, gameState: any) {
        if(gameState.placingBattleShip) {
            const battleShip = _.cloneDeep(gameState.battleShip)
            if(battleShip[0].pos.x > 0) {
                for(var i = 0; i <battleShip.length; i++) {
                    battleShip[i].pos.x = battleShip[i].pos.x -1;
                }
                const conflict = checkConflicts(battleShip,'battleShip', gameState);
                if(conflict!= true) {
                   setGameState({...gameState, battleShip: battleShip});
                }
            }
        } else if(gameState.placingCarrier) {
            const carrier = _.cloneDeep(gameState.carrier)
            if(carrier[0].pos.x > 0) {
                for(var i = 0; i <carrier.length; i++) {
                    carrier[i].pos.x = carrier[i].pos.x -1;
                }
                const conflict = checkConflicts(carrier,'carrier', gameState);
                if(conflict!= true) {
                    setGameState({...gameState, carrier: carrier});
                }
            }
        } else if(gameState.placingDestroyer) {
            const destroyer = _.cloneDeep(gameState.destroyer)
            if(destroyer[0].pos.x > 0) {
                for(var i = 0; i <destroyer.length; i++) {
                    destroyer[i].pos.x = destroyer[i].pos.x -1;
                }
                const conflict = checkConflicts(destroyer,'destroyer', gameState);
                if(conflict!= true) {
                    setGameState({...gameState, destroyer: destroyer});
                }
            }
        }
    }

    export  function moveShipRight(checkConflicts: any, setGameState:any, gameState: any) {
        if(gameState.placingBattleShip) {
            const battleShip = _.cloneDeep(gameState.battleShip)
            if(battleShip[battleShip.length-1].pos.x < 7) {
                for(var i = 0; i <battleShip.length; i++) {
                    battleShip[i].pos.x = battleShip[i].pos.x +1;
                }
                const conflict = checkConflicts(battleShip,'battleShip', gameState);
                if(conflict!= true) {
                    setGameState({...gameState, battleShip: battleShip});
                }
            }
        } else if(gameState.placingCarrier) {
            const carrier = _.cloneDeep(gameState.carrier)
            if(carrier[carrier.length-1].pos.x < 7) {
                for(var i = 0; i <carrier.length; i++) {
                    carrier[i].pos.x = carrier[i].pos.x +1;
                }
                const conflict = checkConflicts(carrier,'carrier', gameState);
                if(conflict!= true) {
                    setGameState({...gameState, carrier: carrier});
                }
            }
        } else if(gameState.placingDestroyer) {

            const destroyer = _.cloneDeep(gameState.destroyer)
            if(destroyer[destroyer.length-1].pos.x < 7) {
                for(var i = 0; i <destroyer.length; i++) {
                    destroyer[i].pos.x = destroyer[i].pos.x +1;
                }
                const conflict = checkConflicts(destroyer,'destroyer', gameState);
                if(conflict != true) {
                    setGameState({...gameState, destroyer: destroyer});
                }
            }
        } 
    }

    export function moveShipDown(checkConflicts: any, setGameState:any, gameState: any) {
        if(gameState.placingBattleShip) {
            const battleShip = _.cloneDeep(gameState.battleShip)
            if(battleShip[battleShip.length-1].pos.y < 7) {
                for(var i = 0; i <battleShip.length; i++) {
                    battleShip[i].pos.y = battleShip[i].pos.y + 1;
                }
                const conflict = checkConflicts(battleShip,'battleShip',gameState);
                if(conflict != true) {
                    setGameState({...gameState, battleShip: battleShip});
                }
            }
        } else if(gameState.placingCarrier) {
            const carrier = _.cloneDeep(gameState.carrier)
            if(carrier[carrier.length-1].pos.y < 7) {
                for(var i = 0; i <carrier.length; i++) {
                    carrier[i].pos.y = carrier[i].pos.y + 1;
                }
                const conflict = checkConflicts(carrier,'carrier',gameState);
                if(conflict != true) {
                    setGameState({...gameState, carrier: carrier});
                }
            }
        } else if (gameState.placingDestroyer) {
            const destroyer = _.cloneDeep(gameState.destroyer)
            if(destroyer[destroyer.length-1].pos.y < 7) {
                for(var i = 0; i <destroyer.length; i++) {
                    destroyer[i].pos.y = destroyer[i].pos.y + 1;
                }
                const conflict = checkConflicts(destroyer,'destroyer', gameState);
                if(conflict != true) {
                    setGameState({...gameState, destroyer: destroyer});
                }
            }
        }

    }