import TaskRow from "../Task/TaskRow";
import data from '../../data.json';

function ReCraft(){
    
    return(
        <>
            {data.products.map((p) => {
                return (
                <TaskRow
                    key={p.id}
                    operationData={p}
                    type="craft"
                   />
            );
        })}
        </>
    )
}

export default ReCraft;