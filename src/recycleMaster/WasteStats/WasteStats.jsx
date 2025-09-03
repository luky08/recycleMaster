import './WasteStats.css'

function WasteStats() {
    return (
    <>
        <div class="waste-summary">
            <div class="bin">
                <img src="/assets/plastic.png" alt="Plastic"/>
                <span>50 kg</span>
            </div>
            <div class="bin">
                <img src="/assets/paper.png" alt="Paper"/>
                <span>50 kg</span>
            </div>
            <div class="bin">
                <img src="/assets/glass.png" alt="Glass"/>
                <span>50 kg</span>
            </div>
            <div class="bin">
                <img src="/assets/mixed-waste.png" alt="Mixed waste"/>
                <span>150 kg</span>
            </div>
            <div class="coin">
                <img src="/assets/reCoin.png" alt="reCoin"/>
                <span>3000 Kč</span>
            </div>
            <div className="ham-menu">
                <svg width="40" height="30" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg"><rect y="0" width="40" height="5" rx="2" fill="#ffff" /><rect y="12.5" width="40" height="5" rx="2" fill="#ffff" /><rect y="25" width="40" height="5" rx="2" fill="#ffff" /></svg>
            </div>
        </div>
    </>
    );
}

export default WasteStats;