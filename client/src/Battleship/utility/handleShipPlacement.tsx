export default     function handleShipPlacement(ship:string, rowIndex:any, colIndex: any, gameState:any, setGameState:any, placeShip:any) {
    let gridX = colIndex;
    let gridY = rowIndex; 
    console.log("gridX:",gridX, "gridY:", gridY)
    
    // initialize half ship width & height
    let rightShip = 0;
    let leftShip = 0
    let upShip = 0;
    let downShip = 0;
    // let halfShipHeight=delta/2;
    let halfShipHeight = 20;
    let vert = false;
    switch (ship) {
        case 'battleship': leftShip = 2
            rightShip = 2
            upShip = 0
            downShip = 4
            vert = gameState.battleShipVertical;
            break;
        case 'carrier' : 
            leftShip = 3 
            rightShip = 2 
            upShip = 0
            downShip = 5 
            vert = gameState.carrierVertical;
            break
        case 'destroyer' : leftShip = 1
            rightShip = 1 
            upShip = 0 
            downShip = 2
            vert = gameState.destroyerVertical;
            break
    }
    if (!vert){
        if((gridX - leftShip >= 0 && gridX + rightShip < 9)    &&
            (gridX >= 0 && gridX < 9) && 
            (gridY >= 0 && gridY < 9)) { 

                //check conflicts then place
                placeShip(ship, gridX, gridY, gameState, setGameState)
            }
    }else{
        if((gridY - upShip >= 0 && gridY + downShip < 9)&&
            (gridX >= 0 && gridX < 9) && 
            (gridY >= 0 && gridY < 9))
            {
                //check conflicts then place
                placeShip(ship, gridX, gridY, gameState, setGameState)
            }
    }
}