import { useDispatch, useSelector } from 'react-redux';
import { buyWaste } from '../State/gameSlice';

function BtnAddWaste() {
  const dispatch = useDispatch();
  const money = useSelector((state) => state.game.money);
  const canBuy = money >= 10;

  return (
    <div>
      <button
        className="btn-add-waste"
        onClick={() => {
          if (canBuy) dispatch(buyWaste());
        }}
      >
        Add waste (+8) for 10 reCoins
      </button>

      {!canBuy && (
        <div className="waste-warning alert-add-waste">
          You don't have enough reCoins
        </div>
      )}
    </div>
  );
}

export default BtnAddWaste;
