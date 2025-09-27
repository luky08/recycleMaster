import './ReStoreRow.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function ReStoreRow({ 
    imgUrl, 
    imgAlt, 
    name, 
    nameProduct, 
    quantityName, 
    price,
    onSell,
    error,
    onClearError
}){

    const quantity = useSelector((s) => s.game[quantityName] ?? 0)

    const sellProduct = (e) => {      
    if (typeof onSell !== 'function') return;
        const operation = e.currentTarget.name;
        onSell(quantityName, price, operation)
    }

    useEffect(() => {
      if (!error) return;
      const t = setTimeout(() => {
        onClearError?.();
      }, 800);
      return () => clearTimeout(t);
    }, [error, onClearError]);


    return(
        <div className="main-row store">
          <div className="left">
            <img src={imgUrl} alt={imgAlt} />
          </div>
          <div className="middle">
            <div className="text">
              <div>{nameProduct}</div>
              <div>Quantity: {quantity} <span> Price: {price} kč</span></div>
            </div>
            
          {error && <div className="error" >{error}</div>}
          </div>
          <div className="right">
            <button className="sell-one" onClick={sellProduct} name="one">Sell 1x</button>
            <button className="sell-all" onClick={sellProduct} name="all">Sell all</button>
          </div>
        </div>
    )
}

export default ReStoreRow;