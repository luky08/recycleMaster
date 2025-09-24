import TaskRow from "../Task/TaskRow";
import { useSelector, useDispatch } from "react-redux";
import {craft, finishCrafting} from '../State/gameSlice';
import products from '../../products.json';

function ReCraft(){
    
    const dispatch = useDispatch()
    
    const alert = useSelector((s) => s.game.alert)
    return(
        <>
        
            {products.map((p) => (
                <TaskRow
                    key={p.id}
                    name={p.name}
                    widthProgress={0} 
                    imgUrl={`assets/${p.imgName}`} 
                    imgAlt={p.imgAlt}
                    taskName={p.taskName}
                    trashNameFirst={p.trashNameFirst}
                    trashNameSecond={p.trashNameSecond}
                    lvl={1}  
                    time={8} 
                    price={p.levels.upPrice} 
                    weightFirst={p.weightFirst} 
                    weightSecond={p.weightSecond7}
                    alert={alert}
                    onActivate={(name, trashNameFirst, weightFirst, trashNameSecond, weightSecond) => dispatch(craft({name, trashNameFirst, weightFirst, trashNameSecond, weightSecond}))}
                    onFinish={(name, trashNameFirst, weightFirst, trashNameSecond, weightSecond) => dispatch(finishCrafting({name, trashNameFirst, weightFirst, trashNameSecond, weightSecond}))}

                />
            ))}
        </>
    )
}

export default ReCraft;