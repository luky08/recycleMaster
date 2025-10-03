import './ReSort.css'
import { useSelector } from 'react-redux'
import TaskRow from '../Task/TaskRow'
import BtnAddWaste from '../WasteStats/BtnAddWaste'
import data from '../../data.json'; 

function ReSort() {
    const readyWaste = useSelector((s) => s.game.readyWaste)
    return(
        <>
        <div className="right-section">
            <TaskRow 
                operationData={data.transport}
                type="transport"      
            />
            <div className="ready-sorting">Waste ready for sorting: {readyWaste} </div>
            <TaskRow 
                operationData={data.sorting}
                type="sorting"
            />
            <div className="btn-add-waste">
                <BtnAddWaste/>
            </div>
        </div>
        </>
    )
}

export default ReSort;