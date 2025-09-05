import './ReSort.css'
import TaskRow from '../Task/TaskRow'
import WasteStats from '../WasteStats/WasteStats';
import BtnAddWaste from '../WasteStats/BtnAddWaste';

function ReSort() {
    return(
        <>
        <div className="right-section">
            <TaskRow widthProgress={15} imgUrl="/assets/ReCar.png" imgAlt="Img ReCar" lvl={1} taskName="Transport of waste to the sorting facility" weight1={8} time={5} price={25}/>
            <div className="ready-sorting">Waste ready for sorting: 10</div>
            <TaskRow widthProgress={15} imgUrl="/assets/ReSorting.png" imgAlt="Img reSort" lvl={1} taskName="Waste sorting into plastic, glass, and paper" weight1={8} time={18} price={25}/>
            <div className="btn-add-waste">
                <BtnAddWaste/>
            </div>
        </div>

        </>
    )
}

export default ReSort;