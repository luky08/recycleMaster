import { useSelector } from 'react-redux';
import HamburgerMenu from '../HamburgerMenu';
import './WasteStats.css'

function WasteStats() {
    const waste = useSelector((s) => s.game.waste)
    const money = useSelector((s) => s.game.money)
    const plastic = useSelector((s) => s.game.plastic)
    const glass = useSelector((s) => s.game.glass)
    const paper = useSelector((s) => s.game.paper)

    return (
    <>
        <div className="waste-summary">
            <div className="bin">
                <img src="/assets/plastic.png" alt="Plastic"/>
                <span>{plastic} kg</span>
            </div>
            <div className="bin">
                <img src="/assets/paper.png" alt="Paper"/>
                <span>{paper} kg</span>
            </div>
            <div className="bin">
                <img src="/assets/glass.png" alt="Glass"/>
                <span>{glass} kg</span>
            </div>
            <div className="bin">
                <img src="/assets/mixed-waste.png" alt="Mixed waste"/>
                <span>{waste} kg</span>
            </div>
            <div className="coin">
                <img src="/assets/reCoin.png" alt="reCoin"/>
                <span>{money} re</span>
            </div>
            <div className="ham-menu">
                <HamburgerMenu/>
            </div>
        </div>
    </>
    );
}

export default WasteStats;