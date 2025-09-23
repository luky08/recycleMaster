import ReStoreRow from './ReStoreRow'
import { useSelector } from 'react-redux';



function ReStore(){
    const tshirt = useSelector((s) => s.game.tshirt)
    const bottle = useSelector((s) => s.game.bottle)
    const notebook = useSelector((s) => s.game.notebook)
    const window = useSelector((s) => s.game.window)




    const products = [
        { id: 1, name:"shirt", imgUrl: "assets/t-shirt.png", imgAlt:"Img t-shirt", nameProduct:"T-shirt", quantity: tshirt, price: 8 },
        { id: 2, name:"bottle", imgUrl: "assets/bottle.png", imgAlt:"Img bottle", nameProduct:"Bottle", quantity: bottle, price: 12 },
        { id: 3, name:"notebook", imgUrl: "assets/notebook.png", imgAlt:"Img notebook", nameProduct:"Notebook", quantity: notebook, price: 15 },
        { id: 4, name:"window", imgUrl: "assets/window.png", imgAlt:"Img window", nameProduct:"T-shirt", quantity: window, price: 85 },
    ];

    return(
        <>
        {products.map((p) => (
            
            <ReStoreRow key={p.id} imgUrl={p.imgUrl} imgAlt={p.imgAlt} nameProduct={p.nameProduct} quantity={p.quantity} price={p.price}/>
        ))}
            
        </>
    )
}

export default ReStore;