import './ReStoreRow.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {sellProduct, clearError} from '../State/gameSlice'

function ReStoreRow({ 
  productData,
}){
  const dispatch = useDispatch()

    const p = productData;
    const quantity = useSelector((s) => s.game[p.name])
    

    

    const handleSell = (e) => {
        const actionSell = e.currentTarget.dataset.action;
        const sellPayload = {
          name: p.name,
          price: p.price,
          actionSell: actionSell
        }
        dispatch(sellProduct(sellPayload))
    }
/*
    useEffect(() => {
      if (!error) return;
      const t = setTimeout(() => {
        onClearError?.(); 
      }, 800);
      return () => clearTimeout(t);
    }, [error, onClearError]);
*/

    return(
        <div className="main-row store">
          <div className="left">
            <img src={`assets/${p.imgName}`} alt={p.imgAlt} />
          </div>
          <div className="middle">
            <div className="text">
              <div>{p.nameProduct}</div>
              <div>Quantity: {quantity} <span> Price: {p.price} kč</span></div>
            </div>
            
          {/*error && <div className="error" >{error}</div>*/}
          </div>
          <div className="right">
            <button className="sell-one" onClick={handleSell} data-action="one">Sell 1x</button>
            <button className="sell-all" onClick={handleSell} data-action="all">Sell all</button>
          </div>
        </div>
    )
}

export default ReStoreRow;