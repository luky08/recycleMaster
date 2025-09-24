import './ReSort.css'
import { useSelector, useDispatch } from 'react-redux'
import TaskRow from '../Task/TaskRow'
import BtnAddWaste from '../WasteStats/BtnAddWaste'
import { transportWaste, sortingWaste } from '../State/gameSlice';
import { getRandomNumberForSorting } from '../State/randomNumberForSorting';


function ReSort() {
    
    const readyWaste = useSelector((s) => s.game.readyWaste)
    const alert = useSelector((s) => s.game.alert)
    const dispatch = useDispatch()

    return(
        <>
        <div className="right-section">

            <TaskRow 
            name="transport"
            widthProgress={15} 
            imgUrl="/assets/ReCar.png"
            imgAlt="Img ReCar" 
            lvl={1} 
            taskName="Transport of waste to the sorting facility"
            weight1={8}
            time={5}
            price={25}
            onActivate={() => dispatch(transportWaste())}
            alert={alert}
            />

            <div className="ready-sorting">Waste ready for sorting: {readyWaste} </div>
            
            <TaskRow 
            name="sorting"
            widthProgress={15} 
            imgUrl="/assets/ReSorting.png" 
            imgAlt="Img reSort" 
            lvl={1} 
            taskName="Waste sorting into plastic, glass, and paper" 
            weight1={8} 
            time={18} 
            price={25}
            
            onActivate={() => {
            const range = getRandomNumberForSorting(8);
            dispatch(sortingWaste(range));
            }}
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