import {styles} from '../styles/javaScriptStyles';

export default function MiniGrid(props:any) {
    const Styles = styles(props.gameState,props.delta);
    return(
        <div style={props.gameState.gameStarted? Styles.miniGridStyles : Styles.displayNoneStyles }>
        {props.gameState.turn != true ? 
                   props.gameState.opponentGrid.map((row:any, rowIndex:any)=>{return(
                       row.map((col:any, colIndex:any)=>{return( <div style={props.gameState.opponentGrid[rowIndex][colIndex].firedAt ==true?
                                                                       (props.gameState.opponentGrid[rowIndex][colIndex].hit==true?
                                                                           Styles.hitStyles : Styles.missedStyles):Styles.gridElementStyles}
                                                               // onClick={()=>fireAtOpponent(rowIndex,colIndex)}
                                                            //    onClick={(e)=>props.fireOrPlace(e, rowIndex,colIndex, "fire")}
                                                                       
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
            
                   <div  style={Styles.miniGridCarrierStyle}> </div>
                   <div style={Styles.miniGridBattleShipStyle}> </div>
                   <div style={Styles.miniGridDestroyerStyle}> </div>
          
   </div>
    )
}