import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './TaskRow.css'
import { craft, finishCrafting, upgrade, setAlert, transport, finishTransport, sorting, finishSorting, selectCanCraft, cleanAlert, startBlocking, stopBlocking } from '../State/gameSlice';

function TaskRow({
  operationData,
  type
}) {
  const dispatch = useDispatch()
  const level = useSelector((s) => s.game.levels)
  const money = useSelector((s) => s.game.money)
  const alert = useSelector((s) => s.game.alert)
  const data = operationData;

 
  const levelIndex = level[data.id] ?? 0; 
  const levelData = data.levels[levelIndex];   
  const nextLevelIndex = levelIndex + 1;
  const isMax = levelIndex >= data.levels.length - 1;
  const time = levelData.time
  const canUpgrade= !isMax && money >= levelData.upPrice

  const noMoney = money >= levelData.upPrice
  const weightReSort = levelData.weight

  const craftPayload = {
    name: data.name,
    trashNameFirst: data.trashNameFirst,
    weightFirst: levelData.weightFirst,
    trashNameSecond: data.trashNameSecond,
    weightSecond: levelData.weightSecond
  };
  const finishCraftPayload = {
    name: data.name,
    rePoint: data.rePoint
  }
  const upgradePayload = {
    id: data.id,
    cost: levelData.upPrice,
    nextLevelIndex: nextLevelIndex
  }
  const transportPayload = {
    weight: levelData.weight,
  }
  const sortPayload = {
    weight: levelData.weight,
  }
  const canCraft = useSelector((s) => selectCanCraft(s, craftPayload));
  const canTransport = useSelector((s) => s.game.waste) > 0;
  const canSort = useSelector((s) => s.game.readyWaste) > 0;

  const [progress, setProgress] = useState(0)
  const workingRef = useRef(false)
  const timerRef = useRef(null);

  const handleCraft = () => {
    if (workingRef.current) return;
    switch (type) {
      case "craft": {
        if (!canCraft) {
          dispatch(setAlert({ name: data.name, message: `Not enough material for ${data.name}` }));
          return;
        }
        dispatch(craft(craftPayload));
        dispatch(startBlocking());
        startProgress().then(() => {
          dispatch(finishCrafting(finishCraftPayload));
          dispatch(stopBlocking());
          resetProgress()
        });
        break;
      }
      case "transport":{ 
        if (!canTransport) {
          dispatch(setAlert({ name: data.name, message: `Not enough material for ${data.name}` }));
          return;
        }
        dispatch(transport(transportPayload)) 
        startProgress().then(() => {
          dispatch(finishTransport(transportPayload));
          resetProgress()
        });
        break;
      }
      case "sorting": {
        if (!canSort) {
          dispatch(setAlert({ name: data.name, message: `Not enough material for ${data.name}` }));
          return;
        }
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
    
  useEffect(() => {
    if (!alert.active) return;
    const t = setTimeout(() => {
      dispatch(cleanAlert());
    }, 1100);
    return () => clearTimeout(t);
  }, [alert, cleanAlert]);
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return(
    <div className="main-row" typeof={type}>
      <div onClick={handleCraft}
        className="left"
      >
        <img src={`assets/${data.imgName}`} alt={data.imgAlt} />
      </div>
      <div 
        onClick={handleCraft}
        className="middle"
      >
        <div className="text">
          <div>
            {levelData.level} lvl - {data.taskName} {data.rePoint && <>, {data.rePoint} xp </>}
          </div>
          <div>
            {levelData.weightFirst && <> <TrashInfo weight={levelData.weightFirst} name={data.trashNameFirst} /></>}
            {levelData.weightSecond && <> <TrashInfo weight={levelData.weightSecond} name={data.trashNameSecond} /></>}
            {weightReSort && <> <TrashInfo weight={levelData.weight} name={""} /></>}
            <span> &nbsp; {levelData.time} min </span>
          </div>
        </div>
        <div className="progress-bar">
          <div
            className="progress" style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div
          className="waste-warning"
          style={{ display: alert.message && alert.name.includes(data.name) ? 'block' : 'none' }}
        >
          {alert.message} 
        </div>
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
            <div className="price">{levelData.upPrice} rc</div>
            {!noMoney && <div className="no-money">No ReCoin</div>}
          </>
        )}
      </div>
    </div>
  )
}

export default TaskRow;