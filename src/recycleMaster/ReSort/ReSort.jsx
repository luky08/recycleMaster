import './ReSort.css'
import TaskRow from '../Task/TaskRow'

function ReSort() {
    return(
        <>
        <TaskRow widthProgress={15} imgUrl="/assets/ReCar.png" imgAlt="Img ReCar" lvl={1} taskName="Transport of waste to the sorting facility" weight1={8} time={5} price={25}/>
        <TaskRow widthProgress={15} imgUrl="/assets/ReSorting.png" imgAlt="Img reSort" lvl={1} taskName="Waste sorting into plastic, glass, and paper" weight1={8} time={18} price={25}/>
        </>
    )
}

export default ReSort;