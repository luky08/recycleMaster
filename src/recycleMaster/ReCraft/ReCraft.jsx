import TaskRow from "../Task/TaskRow";

function ReCraft(){
    return(
        <>
            <TaskRow widthProgress="15" imgUrl="/assets/t-shirt.png" lvl="1" taskName="Make a T-shirt" time="5" price="25" weight1="4" trashName1="plastic"/>
            <TaskRow widthProgress="15" imgUrl="/assets/bottle.png" lvl="1" taskName="Make a Bottle"  time="5" price="25" weight1="2" trashName1="glass"/>
            <TaskRow widthProgress="15" imgUrl="/assets/notebook.png" lvl="1" taskName="Make a NoteBook" time="5" price="25" weight1="3" trashName1="paper"/>
            <TaskRow widthProgress="15" imgUrl="/assets/window.png" lvl="1" taskName="Make a Window" time="5" price="25" weight1="5" trashName1="plastic" weight2="5" trashName2="glass"/>
        </>
    )
}

export default ReCraft;