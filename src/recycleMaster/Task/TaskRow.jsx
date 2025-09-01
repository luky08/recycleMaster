import './TaskRow.css'
function TaskRow({widthProgress, imgUrl, lvl, taskName, weight, time, price}) {
    return(
        <div className="main-row">
          <div
            className="left"
          >
            <img src={imgUrl} alt="Převoz odpadu" />
          </div>
          <div className="middle">
            <div className="text">
              <div>
                {lvl} - {taskName}
              </div>
              <div>
                {weight} kg <span> {time} min </span>
              </div>
            </div>
            <div className="progress-bar">
              
                <div
                  className="progress" style={{ width: `${widthProgress}%` }}
                ></div>
            </div>
          </div>
          <div className="right" >
            <img src="/assets/upgrade-text.png" alt="Upgrade" />
            <div className="price"> {price} kč</div>
          </div>
        </div>
    )
}

export default TaskRow;