import './TaskRow.css'

function TaskRow({
  widthProgress, 
  imgUrl, 
  imgAlt, 
  lvl, 
  taskName, 
  time, 
  price, 
  weight1, 
  trashName1, 
  weight2, 
  trashName2,
  onActivate
}) {


    const handleClick = () => {
      if (typeof onActivate === 'function') onActivate()
    }

  return(
        <div className="main-row">
          
          <div onClick={handleClick}
            className="left"
          >
            <img src={imgUrl} alt={imgAlt} />
          </div>
          <div 
            className="middle"
            >
            <div className="text">
              <div>
                {lvl} lvl - {taskName}
              </div>
              <div>
                {weight1} kg {trashName1 && `(${trashName1})`} {weight2 && `${weight2} kg (${trashName2})`}  <span> &nbsp;{time} min </span>
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