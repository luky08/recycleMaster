import TaskRow from "../Task/TaskRow";
import { useSelector, useDispatch } from "react-redux";
import {craft, finishCrafting, upgradeProduct} from '../State/gameSlice';
import data from '../../data.json';

function ReCraft(){
    
    const dispatch = useDispatch()
    const alert = useSelector((s) => s.game.alert)
    const productLevels = useSelector((s) => s.game.productLevels)
    const money = useSelector((s) => s.game.money)
    return(
        <>
            {data.products.map((p) => {
                
                const lvlIndex = productLevels[p.id] ?? 0; // 0 => level 1
                const levelData = p.levels[lvlIndex];     // { level, time, upPrice, weightFirst, ... }
                const isMax = lvlIndex >= p.levels.length - 1;

                return (
                <TaskRow
                    key={p.id}
                    name={p.name}
                    widthProgress={0} 
                    imgUrl={`assets/${p.imgName}`} 
                    imgAlt={p.imgAlt}
                    taskName={p.taskName}
                    trashNameFirst={p.trashNameFirst}
                    trashNameSecond={p.trashNameSecond}
                    lvl={lvlIndex + 1}  
                    time={levelData.time} 
                    upPrice={isMax ? null : levelData.upPrice}
                    weightFirst={levelData.weightFirst} 
                    weightSecond={levelData.weightSecond}
                    alert={alert}
                    onActivate={(name, trashNameFirst, weightFirst, trashNameSecond, weightSecond) => dispatch(craft({name, trashNameFirst, weightFirst, trashNameSecond, weightSecond}))}
                    onFinish={(name, trashNameFirst, weightFirst, trashNameSecond, weightSecond) => dispatch(finishCrafting({name, trashNameFirst, weightFirst, trashNameSecond, weightSecond}))}
                    onUpgrade={isMax ? undefined : () => dispatch(upgradeProduct({ id: p.id, cost: levelData.upPrice, nextLevelIndex: lvlIndex + 1}))}
                    canUpgrade={!isMax && money >= levelData.upPrice} isMax={isMax}
                />
            );
        })}
        </>
    )
}

export default ReCraft;