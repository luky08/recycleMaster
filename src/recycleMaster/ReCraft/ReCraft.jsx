import TaskRow from "../Task/TaskRow";

function ReCraft(){
    return(
        <>
            <TaskRow widthProgress={15} imgUrl="/assets/t-shirt.png" imgAlt="Img T-shirt" lvl={1} taskName="Make a T-shirt" time={8} price={25} weight1={4} trashName1="plastic"/>
            <TaskRow widthProgress={15} imgUrl="/assets/bottle.png" imgAlt="Img Bottle" lvl={1} taskName="Make a Bottle"  time={12} price={25} weight1={6} trashName1="glass"/>
            <TaskRow widthProgress={15} imgUrl="/assets/notebook.png" imgAlt="Img NoteBook" lvl={1} taskName="Make a NoteBook" time={15} price={25} weight1={4} trashName1="paper"/>
            <TaskRow widthProgress={15} imgUrl="/assets/window.png" imgAlt="Img window" lvl={1} taskName="Make a Window" time={35} price={25} weight1={5} trashName1="plastic" weight2={8} trashName2="glass"/>
        </>
    )
}

export default ReCraft;