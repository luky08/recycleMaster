import { useState, useRef, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './TaskRow.css'
import { craft, finishCrafting, upgrade, cleanAlert, transport, finishTransport, sorting, finishSorting } from '../State/gameSlice';

function TaskRow({
  operationData,
  type,

}) {
  const dispatch = useDispatch()
  const level = useSelector((s) => s.game.levels)
  const money = useSelector((s) => s.game.money)
  const alert = useSelector((s) => s.game.alert)
  const d = operationData;
  /*
  const errorProcess = useSelector((s) => s.game.errorsProcess);
  const error = errorProcess?.[d.name];
  const typeForErrorStorage = "Process";
*/
  const levelIndex = level[d.id] ?? 0; 
  const levelData = d.levels[levelIndex];   
  const nextLevelIndex = levelIndex + 1;
  const isMax = levelIndex >= d.levels.length - 1;
  const time = levelData.time
  const canUpgrade= !isMax && money >= levelData.upPrice

  const noMoney = money >= levelData.upPrice
  const weightReSort = levelData.weight

  const craftPayload = {
    name: d.name,
    trashNameFirst: d.trashNameFirst,
    weightFirst: levelData.weightFirst,
    trashNameSecond: levelData.trashNameSecond,
    weightSecond: d.weightSecond
  };
  const finishCraftPayload = {
    name: d.name
  }
  const upgradePayload = {
    id: d.id,
    cost: levelData.upPrice,
    nextLevelIndex: nextLevelIndex
  }
  const transportPayload = {
    weight: levelData.weight,
  }
  const sortPayload = {
    weight: levelData.weight,

  }

  const [progress, setProgress] = useState(0)
  const workingRef = useRef(false)
  const timerRef = useRef(null);
  

  const handleCraft = () => {
    if (workingRef.current) return;
      switch (type) {
        case "craft": {
          dispatch(craft(craftPayload));
          if (alert.active) return;
          startProgress().then(() => {
            dispatch(finishCrafting(finishCraftPayload));
            resetProgress()
          });
          break;
        }
        case "transport":{ 
          dispatch(transport(transportPayload)) 
          startProgress().then(() => {
            dispatch(finishTransport(transportPayload));
            resetProgress()
          });
          break;
        }
        case "sorting": {
          dispatch(sorting(sortPayload)) 
          startProgress().then(() => {
            dispatch(finishSorting(sortPayload));
            resetProgress()
          });
          break;
        }
        default:
          break;
        
        }
  };

  const resetProgress = () => {
    setProgress(0);
  };

  const startProgress = () => {
    return new Promise(resolve => {
    workingRef.current = true;
    const totalMs = time * 60 * 1000; 
    const stepMs = 100;
    const delta = (100 * stepMs) / totalMs;

    timerRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + delta;
        if (next >= 100) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          workingRef.current = false;
            resolve();  
          return 100;
        }
        return next;
      });
    }, stepMs);
    });
  }

  

  const handleUpgrade = () => {
    if (!canUpgrade) return;
    dispatch(upgrade(upgradePayload));
  };

  const TrashInfo = ({ weight, name }) =>
    weight ? (
      <>
        {weight} kg {name && `(${name})`}
      </>
    ) : null;

/*
    useEffect(() => {
      if (!alert.active) return;
      const t = setTimeout(() => {
        dispatch(cleanAlert());
      }, 800);
      return () => clearTimeout(t);
    }, [alert, cleanAlert]);
  
*/
     useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);



  return(
        <div className="main-row" typeof={type}>
          
          <div onClick={handleCraft}
            className="left"
          >
            <img src={`assets/${d.imgName}`} alt={d.imgAlt} />
          </div>
          <div 
            onClick={handleCraft}
            className="middle"
            >
            <div className="text">
              <div>
                 {levelData.level} lvl - {d.taskName}
              </div>
              <div>
                {levelData.weightFirst && <> <TrashInfo weight={levelData.weightFirst} name={d.trashNameFirst} /></>}
                {levelData.weightSecond && <> <TrashInfo weight={levelData.weightSecond} name={d.trashNameSecond} /></>}
                {weightReSort && <> <TrashInfo weight={levelData.weight} name={""} /></>}
                <span> &nbsp; {levelData.time} min </span>
              </div>
            </div>
            <div className="progress-bar">
              
                <div
                  className="progress" style={{ width: `${progress}%` }}
                ></div>
            </div>
            {/* alert udělám přes způsob jak je udělaný ve store */}
            <div
              className="waste-warning"
              style={{ display: alert.message && alert.name.includes(d.name) ? 'block' : 'none' }}
                
              >
                {alert.message} 
            </div>
            
            {/*{error && <div className="error" >{error}</div>}*/}
          </div>

          <div className="right" onClick={handleUpgrade}>
            {isMax ? (
              <>
                <img src="/assets/upgrade-text.png" alt="Upgrade" />
                <div className="price">MAX</div>
              </>
            ) : (
              <>
                <img src="/assets/upgrade-text.png" alt="Upgrade" />
                <div className="price">{levelData.upPrice} Kč</div>
                {!noMoney && <div className="no-money">no money</div>}
              </>
            )}
          </div>

        </div>
    )
}

export default TaskRow;