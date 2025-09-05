import HamburgerMenu from '../HamburgerMenu';
import './WasteStats.css'

function WasteStats() {
    return (
    <>
        <div className="waste-summary">
            <div className="bin">
                <img src="/assets/plastic.png" alt="Plastic"/>
                <span>50 kg</span>
            </div>
            <div className="bin">
                <img src="/assets/paper.png" alt="Paper"/>
                <span>50 kg</span>
            </div>
            <div className="bin">
                <img src="/assets/glass.png" alt="Glass"/>
                <span>50 kg</span>
            </div>
            <div className="bin">
                <img src="/assets/mixed-waste.png" alt="Mixed waste"/>
                <span>150 kg</span>
            </div>
            <div className="coin">
                <img src="/assets/reCoin.png" alt="reCoin"/>
                <span>3000 Kč</span>
            </div>
            <div className="ham-menu">
                <HamburgerMenu/>
            </div>
        </div>
    </>
    );
}

export default WasteStats;