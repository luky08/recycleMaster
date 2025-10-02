import { useSelector } from "react-redux";
import './RecycleMasterProgress.css';

function RecycleMasterProgress() {
    const progress = useSelector((s) => s.game.endGameProgress);
    const vin = progress >= 100;

    return (
        <>
            <p className="finish-progress-text">
                {vin ? (
                    <>You have completed this game and earned the title <span>Recycle Master</span></>
                ) : (
                    <>Your <span>progress</span> in this game</>
                )}
            </p>

            <div className="progress-bar finish-progress">
                <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </>
    );
}

export default RecycleMasterProgress;
