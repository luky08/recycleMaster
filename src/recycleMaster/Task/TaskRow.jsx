import { useState } from 'react'
import './TaskRow.css'
import { useSelector } from 'react-redux'

function TaskRow({
  name,
  widthProgress, 
  imgUrl, 
  imgAlt, 
  lvl, 
  taskName, 
  time, 
  price, 
  weightFirst, 
  trashNameFirst, 
  weightSecond, 
  trashNameSecond,
  onActivate,
  onFinish,
  alert
}) {
  const [widthProgressState, setWidthProgress] = useState(0);
  const handleClick = () => {

    if (typeof onActivate === 'function') {
      onActivate(
        name,
        trashNameFirst,
        weightFirst,
        trashNameSecond,
        weightSecond
      )
      console.log(weightFirst);
      const interval = setInterval(() => {
        widthProgress++;
        if(widthProgress >= 100) {
          clearInterval(interval)
          onFinish(
            name,
            trashNameFirst,
            weightFirst,
            trashNameSecond,
            weightSecond
          )
        }
        setWidthProgress(widthProgress)
        }, 100)
    }
      
    }

  

  return(
        <div className="main-row">
          
          <div onClick={handleClick}
            className="left"
          >
            <img src={imgUrl} alt={imgAlt} />
          </div>
          <div 
            onClick={handleClick}
            className="middle"
            >
            <div className="text">
              <div>
                {lvl} lvl - {taskName}
              </div>
              <div>
                {weightFirst} kg {trashNameFirst && `(${trashNameFirst})`} {weightSecond && `${weightSecond} kg (${trashNameSecond})`}  <span> &nbsp;{time} min </span>
              </div>
            </div>
            <div className="progress-bar">
              
                <div
                  className="progress" style={{ width: `${widthProgressState}%` }}
                ></div>
            </div>
            <div
            className="waste-warning"
            style={{ display: alert?.message && alert?.name?.includes(name) ? 'block' : 'none' }}
              id={name}
             >
              {alert?.message} 
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