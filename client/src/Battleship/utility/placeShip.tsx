import React from 'react';
export default  function placeShip(ship: any, gridX:any, gridY:any, gameState:any, setGameState:any){
    if(ship == 'battleship') {
        const battleShip = [...gameState.battleShip];
        for(var i=0; i<battleShip.length; i++) {
            //fill in position coordinates
            battleShip[i].pos.x = gridX - 2 + i;
            battleShip[i].pos.y = gridY;
        }
        setGameState({...gameState, battleShipsPlaced:true, battleShip:battleShip})
   } else if(ship == 'carrier') {
        const carrier = [...gameState.carrier];
        for(var i=0; i<carrier.length; i++) {
            carrier[i].pos.x = gridX - 3+i;
            carrier[i].pos.y = gridY;
        }
        setGameState({...gameState, carrierPlaced:true, carrier:carrier})
        // console.log(gameState.carrier)
   } else if (ship == 'destroyer') {
        const destroyer = [...gameState.destroyer];
        for(var i=0; i<destroyer.length; i++) {
            destroyer[i].pos.x = gridX - 1+i;
            destroyer[i].pos.y = gridY;
        }
        setGameState({...gameState, destroyerPlaced:true, destroyer:destroyer})
        console.log(gameState.destroyer);
   }
   console.log(gameState)

}
