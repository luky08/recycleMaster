import { useSelector } from "react-redux";
import './RecycleMasterProgress.css'


function RecycleMasterProgress(){
    const progress = useSelector((s) => s.game.endGameProgress)

    return (
        <>
            <p className="finish-progress-text"> Your <span>progress</span> in this game</p>
            <div className="progress-bar finish-progress">
                <div
                  className="progress" style={{ width: `${progress}%` }}
                ></div>
            </div>
            </>
    )
}


export default RecycleMasterProgress;