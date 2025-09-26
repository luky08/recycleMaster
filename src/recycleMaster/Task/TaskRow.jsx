import { useState, useRef, useEffect} from 'react'
import './TaskRow.css'

function TaskRow({
  name,
  imgUrl, 
  imgAlt, 
  lvl, 
  taskName, 
  time, 
  upPrice, 
  weightFirst, 
  trashNameFirst, 
  weightSecond, 
  trashNameSecond,
  onActivate,
  onFinish,
  alert,
  canUpgrade,
  isMax,
  onUpgrade,
}) {
  const [progress, setProgress] = useState(0)
  const workingRef = useRef(false)
  const timerRef = useRef(null);


   useEffect(() => {
    // cleanup při unmountu/změně
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

    const handleCraft = () => {
    if (workingRef.current) return; // už běží
    if (typeof onActivate !== 'function') return;

    onActivate(name, trashNameFirst, weightFirst, trashNameSecond, weightSecond);
    workingRef.current = true;
    setProgress(0);

    // Přepočet: time může být v minutách (podle tvé definice)
    // Příklad: time je v minutách => totalMs
    const totalMs = time * 60 * 1000; // pokud už máš v sekundách, uprav si to
    const stepMs = 100;               // rychlost ticku
    const delta = (100 * stepMs) / totalMs;
    let finished = false;

    timerRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + delta;
        if (next >= 100) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          workingRef.current = false;

          if (!finished && typeof onFinish === 'function') {
              finished = true;
              onFinish(name, trashNameFirst, weightFirst, trashNameSecond, weightSecond);
              
            }
            
          return 100;
        }
        return next;
      });
    }, stepMs);




    
  };

  const handleUpgrade = (e) => {
    e.stopPropagation(); // ať klik na pravou část nespouští craft
    if (!onUpgrade || !canUpgrade) return;
    onUpgrade();
  };

  

  return(
        <div className="main-row">
          
          <div onClick={handleCraft}
            className="left"
          >
            <img src={imgUrl} alt={imgAlt} />
          </div>
          <div 
            onClick={handleCraft}
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
                  className="progress" style={{ width: `${progress}%` }}
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
          <div className="right" onClick={handleUpgrade} role="button" aria-disabled={!canUpgrade}>
            {isMax ? (
              <>
                <img src="/assets/upgrade-text.png" alt="Upgrade" style={{ opacity: 0.4 }} />
                <div className="price">MAX</div>
              </>
            ) : (
              <>
                <img src="/assets/upgrade-text.png" alt="Upgrade" />
                <div className="price">{upPrice} Kč</div>
                {!canUpgrade && <div className="no-money">no money</div>}
              </>
            )}
          </div>
        </div>
    )
}

export default TaskRow;