import ReStoreRow from './ReStoreRow'

function ReStore(){
    return(
        <>
            <ReStoreRow imgUrl="assets/t-shirt.png" imgAlt="Img t-shirt" name="T-shirt" quantity={2} price={8}/>
            <ReStoreRow imgUrl="assets/bottle.png" imgAlt="Img bottle" name="Bottle" quantity={5} price={12}/>
            <ReStoreRow imgUrl="assets/notebook.png" imgAlt="Img notebook" name="Notebook" quantity={12} price={15}/>
            <ReStoreRow imgUrl="assets/window.png" imgAlt="Img window" name="Window" quantity={0} price={85}/>
        </>
    )
}

export default ReStore;