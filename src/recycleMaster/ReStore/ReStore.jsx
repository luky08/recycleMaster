import ReStoreRow from './ReStoreRow'
import data from '../../data.json'
import { useDispatch, useSelector } from 'react-redux';
import {sellProduct, clearError} from '../State/gameSlice'






function ReStore(){

    const dispatch = useDispatch();

    const errors = useSelector((s) => s.game.errorsStore);
    


    return(
        <>
        {data.products.map((p) => (
            
            <ReStoreRow 
                key={p.id} 
                imgUrl={`assets/${p.imgName}`} 
                imgAlt={p.imgAlt} 
                nameProduct={p.nameProduct} 
                quantityName={p.name} 
                price={p.price}
                onSell={(quantityName, price, operation) => dispatch(sellProduct({ quantityName, price, operation}))}
                error={errors?.[p.name]}  
                onClearError={() => dispatch(clearError(p.name))}
            />
        ))}
            
        </>
    )
}

export default ReStore;