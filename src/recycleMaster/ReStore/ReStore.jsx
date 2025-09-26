import ReStoreRow from './ReStoreRow'
import data from '../../data.json'




function ReStore(){



    return(
        <>
        {data.products.map((p) => (
            
            <ReStoreRow key={p.id} imgUrl={`assets/${p.imgName}`} imgAlt={p.imgAlt} nameProduct={p.nameProduct} quantityName={p.name} price={p.price}/>
        ))}
            
        </>
    )
}

export default ReStore;