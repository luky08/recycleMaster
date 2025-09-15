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
        Přidat odpad (+8) za 10 reCoin
      </button>

      {!canBuy && (
        <div className="waste-warning alert-add-waste">
          Nemáš dostatek peněz
        </div>
      )}
    </div>
  );
}

export default BtnAddWaste;
