import './ReSorting.css'
import TaskRow from '../Task/TaskRow'

function WasteSorting() {
    return(
        <>
        <TaskRow widthProgress="15" imgUrl="/assets/ReCar.png" lvl="1" taskName="Transport of waste to the sorting facility" weight1="8" time="2" price="25"/>
        <TaskRow widthProgress="15" imgUrl="/assets/ReSorting.png" lvl="1" taskName="Waste sorting into plastic, glass, and paper" weight1="8" time="2" price="25"/>
        </>
    )
}

export default WasteSorting;