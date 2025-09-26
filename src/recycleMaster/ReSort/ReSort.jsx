import './ReSort.css'
import { useSelector, useDispatch } from 'react-redux'
import TaskRow from '../Task/TaskRow'
import BtnAddWaste from '../WasteStats/BtnAddWaste'
import { transportWaste, finishTransport, sortingWaste, upgradeTransport, upgradeSort } from '../State/gameSlice';
import { getRandomNumberForSorting } from '../State/randomNumberForSorting';
import data from '../../data.json'; 


function ReSort() {
    
    const readyWaste = useSelector((s) => s.game.readyWaste)
    const alert = useSelector((s) => s.game.alert)
    const levelTransport = useSelector((s) => s.game.levelTransport)
    const levelSort = useSelector((s) => s.game.levelSort)
    const money = useSelector((s) => s.game.money)
    const dispatch = useDispatch()

    const tr = data.transport
    const lvlIndexT = levelTransport;
    const levelDataT = tr.levels[levelTransport]; 
    const isMaxT = lvlIndexT >= tr.levels.length - 1;

    
    const sr = data.sorting
    const lvlIndexS = levelSort;
    const levelDataS = sr.levels[levelSort]; 
    const isMaxS = lvlIndexS >= sr.levels.length - 1;
    const range = getRandomNumberForSorting(levelDataS.weight);
    const weightSort = levelDataS.weight

    


    return(
        <>
        <div className="right-section">
            <TaskRow 
            name={tr.name}
            imgUrl={`assets/${tr.imgName}`}
            imgAlt={tr.imgAlt} 
            taskName={tr.taskName}
            lvl={lvlIndexT + 1}  
            time={levelDataT.time} 
            upPrice={isMaxT ? null : levelDataT.upPrice}
            weightFirst={levelDataT.weight}
            onActivate={(name,trashNameFirst, weightFirst) => dispatch(transportWaste({name, trashNameFirst, weightFirst}))}
            onFinish={(name, trashNameFirst, weightFirst) => dispatch(finishTransport({name, trashNameFirst, weightFirst}))}
            onUpgrade={isMaxT ? undefined : () => dispatch(upgradeTransport({ cost: levelDataT.upPrice, nextLevelIndex: lvlIndexT + 1}))}
            canUpgrade={!isMaxT && money >= levelDataT.upPrice} isMax={isMaxT}
            alert={alert}
            alertMessage="Nemáš dostatek odpadu!"
            />
            <div className="ready-sorting">Waste ready for sorting: {readyWaste} </div>
            <TaskRow 
            name={sr.name}
            imgUrl={`assets/${sr.imgName}`} 
            imgAlt={sr.imgAlt} 
            taskName={sr.taskName}

            lvl={lvlIndexS + 1}  
            time={levelDataS.time} 
            upPrice={isMaxS ? null : levelDataS.upPrice}
            weightFirst={levelDataS.weight}


            onActivate={({weightSort}) => {
            dispatch(sortingWaste(range), {weightSort});
            }}


            onFinish={(name, trashNameFirst, weightFirst, trashNameSecond, weightSecond) => dispatch(finishTransport({name, trashNameFirst, weightFirst, trashNameSecond, weightSecond}))}
            onUpgrade={isMaxS ? undefined : () => dispatch(upgradeSort({ cost: levelDataS.upPrice, nextLevelIndex: lvlIndexS + 1}))}
            canUpgrade={!isMaxS && money >= levelDataS.upPrice} isMax={isMaxS}
            


            alert={alert}
            />
            <div className="btn-add-waste">
                <BtnAddWaste/>
            </div>
        </div>

        </>
    )
}

export default ReSort;