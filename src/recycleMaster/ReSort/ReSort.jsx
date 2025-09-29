import './ReSort.css'
import { useSelector } from 'react-redux'
import TaskRow from '../Task/TaskRow'
import BtnAddWaste from '../WasteStats/BtnAddWaste'
import data from '../../data.json'; 


function ReSort() {
    
    const readyWaste = useSelector((s) => s.game.readyWaste)
    const tr = data.transport
    
    const sr = data.sorting


    //const range = getRandomNumberForSorting(levelDataS.weight);

    
    return(
        <>
        <div className="right-section">
            <TaskRow 
                operationData={tr}
                type="transport"            
                alert={alert}
            />


            <div className="ready-sorting">Waste ready for sorting: {readyWaste} </div>
            <TaskRow 

                operationData={sr}
                type="sorting"
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