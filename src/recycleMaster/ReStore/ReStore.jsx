import ReStoreRow from './ReStoreRow'
import data from '../../data.json'

function ReStore(){

    return(
        <>
            {data.products.map((p) => (
                <ReStoreRow 
                    key={p.id}
                    productData={p}
                />
            ))}
        </>
    )
}

export default ReStore;