import ReStoreRow from './ReStoreRow'
import { useSelector } from 'react-redux';



function ReStore(){
    const tshirt = useSelector((s) => s.game.tshirt)
    const bottle = useSelector((s) => s.game.bottle)
    const notebook = useSelector((s) => s.game.notebook)
    const window = useSelector((s) => s.game.window)

    return(
        <>
        
            <ReStoreRow imgUrl="assets/t-shirt.png" imgAlt="Img t-shirt" name="T-shirt" quantity={tshirt} price={8}/>
            <ReStoreRow imgUrl="assets/bottle.png" imgAlt="Img bottle" name="Bottle" quantity={bottle} price={12}/>
            <ReStoreRow imgUrl="assets/notebook.png" imgAlt="Img notebook" name="Notebook" quantity={notebook} price={15}/>
            <ReStoreRow imgUrl="assets/window.png" imgAlt="Img window" name="Window" quantity={window} price={85}/>
        </>
    )
}

export default ReStore;