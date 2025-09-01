import { NavLink } from 'react-router-dom';
import './tabs.css';

function Tabs(){

    return(
        <div>
            <div className="tabs">
                <NavLink
                to="/wastesorting"
                className={({ isActive }) => `tab ${isActive ? "active" : "inactive"}`}
                end
                >
                WasteSorting
                </NavLink>
                <NavLink
                to="/recraft"
                className={({ isActive }) => `tab ${isActive ? "active" : "inactive"}`}
                >
                ReCraft
                </NavLink>
                <NavLink
                to="/restore"
                className={({ isActive }) => `tab ${isActive ? "active" : "inactive"}`}
                >
                ReStore
                </NavLink>
            </div>
        </div>
    )
}

export default Tabs;