import {useDispatch, useSelector} from 'react-redux';
import { buyWaste } from '../State/gameSlice'; 


function BtnAddWaste(){

    const dispatch = useDispatch()
    const money = useSelector((s) => s.game.money)
    const canBuy = money >= 10

    return(
        <button
            className="btn-add-waste"
            onClick={() => canBuy && dispatch(buyWaste())}
            disabled={!canBuy}
            >
            Přidat odpad (+8) za 10 reCoin
        </button>
    )
}

export default BtnAddWaste;