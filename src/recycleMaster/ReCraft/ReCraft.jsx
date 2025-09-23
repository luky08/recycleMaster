import TaskRow from "../Task/TaskRow";
import { useSelector, useDispatch } from "react-redux";
import {craft, finishCrafting} from '../State/gameSlice';

function ReCraft(){
    
    const dispatch = useDispatch()
    
    const alert = useSelector((s) => s.game.alert)
    return(
        <>
            <TaskRow
                name="tshirt"
                widthProgress={0} 
                imgUrl="/assets/t-shirt.png" 
                imgAlt="Img T-shirt" 
                lvl={1} 
                taskName="Make a T-shirt" 
                time={8} 
                price={25} 
                weight1={4} 
                trashName1="plastic"
                alert={alert}
                onActivate={(name, trashName1, weight1, trashName2, weight2) => dispatch(craft({name, trashName1, weight1, trashName2, weight2}))}
                onFinish={(name, trashName1, weight1, trashName2, weight2) => dispatch(finishCrafting({name, trashName1, weight1, trashName2, weight2}))}

            />
            <TaskRow 
                name="bottle"
                widthProgress={0} 
                imgUrl="/assets/bottle.png" 
                imgAlt="Img Bottle" 
                lvl={1} 
                taskName="Make a Bottle"
                time={12} 
                price={25} 
                weight1={6} 
                trashName1="glass"
                alert={alert}
                onActivate={(name, trashName1, weight1, trashName2, weight2) => dispatch(craft({name, trashName1, weight1, trashName2, weight2}))}
                onFinish={(name, trashName1, weight1, trashName2, weight2) => dispatch(finishCrafting({name, trashName1, weight1, trashName2, weight2}))}

           />
            <TaskRow 
                name="notebook"
                widthProgress={0} 
                imgUrl="/assets/notebook.png" 
                imgAlt="Img NoteBook" 
                lvl={1} 
                taskName="Make a NoteBook" 
                time={15} 
                price={25} 
                weight1={4} 
                trashName1="paper"
                alert={alert}
                onActivate={(name, trashName1, weight1, trashName2, weight2) => dispatch(craft({name, trashName1, weight1, trashName2, weight2}))}
                           onFinish={(name, trashName1, weight1, trashName2, weight2) => dispatch(finishCrafting({name, trashName1, weight1, trashName2, weight2}))}

           />
            <TaskRow 
                name="window"
                widthProgress={0} 
                imgUrl="/assets/window.png" 
                imgAlt="Img window" 
                lvl={1} 
                taskName="Make a Window" 
                time={35} 
                price={25} 
                weight1={5} 
                trashName1="plastic" 
                weight2={8} 
                trashName2="glass"
                onFinish={(name, trashName1, weight1, trashName2, weight2) => dispatch(finishCrafting({name, trashName1, weight1, trashName2, weight2}))}
                onActivate={(name, trashName1, weight1, trashName2, weight2) => dispatch(craft({name, trashName1, weight1, trashName2, weight2}))}
            />
        </>
    )
}

export default ReCraft;