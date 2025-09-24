import ReStoreRow from './ReStoreRow'
import { useSelector } from 'react-redux';
import products from '../../products.json'




function ReStore(){



    return(
        <>
        {products.map((p) => (
            
            <ReStoreRow key={p.id} imgUrl={`assets/${p.imgName}`} imgAlt={p.imgAlt} nameProduct={p.nameProduct} quantityName={p.name} price={p.price}/>
        ))}
            
        </>
    )
}

export default ReStore;