import './ReStoreRow.css';
import { useSelector } from 'react-redux';

function ReStoreRow({ imgUrl, imgAlt, name, nameProduct, quantityName, price}){

    const quantity = useSelector((s) => s.game[quantityName] ?? 0)


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
          </div>
          <div className="right">
            <button className="sell-one">Sell 1x</button>
            <button className="sell-all">Sell all</button>
          </div>
        </div>
    )
}

export default ReStoreRow;