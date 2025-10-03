import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Hamburger from "hamburger-react";
import './HamburgerMenu.css';
import HowToPlayInfo from "./Components/HowToPlayInfo";
import { InfoSvg, AchievementSvg } from "./Icon/IconsSvg";
import User from "./Components/User";


function HamburgerComponent(){
    const [open, setOpen] = useState(false)
    const [visible, setVisible] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const endGameProgress = useSelector((s) => s.game.endGameProgress)
    const win = endGameProgress >= 100;
    const styleWin = !win ? { filter: 'grayscale(100%)' } : {};
    
    useEffect(() => {
        if (open) setVisible(true);
    }, [open]);

    const handleAnimationEnd = (e) => {
        if (!open && e.animationName === "slideOutToRight") {
        setVisible(false);
        }
    };

    const toggleSection = (section) => {
        setActiveSection((prev) => (prev === section ? null : section));
    };

    return(
        <>
        <Hamburger 
        toggled={open}
        toggle={setOpen}/>
        <div
        className={`menu ${open ? "slideInFromRight" : "slideOutToRight"} ${visible ? "" : "hidden"}`}
        onAnimationEnd={handleAnimationEnd}
        aria-hidden={!open}
            >
            <User/>
            <a className="link" onClick={() => toggleSection("achievement")}>
                <AchievementSvg/>
                Achievement
            </a>

            {activeSection === "achievement" && (
                <div className="submenu achievement">
                    <img style={styleWin} src="/assets/winAchievement.png"/>
                </div>
            )}

            <a className="link" onClick={() => toggleSection("help")}>
                <InfoSvg />
                Help
            </a>

            {activeSection === "help" && (
                <div className="submenu">
                    <HowToPlayInfo/>
                </div>
            )}

                {/*
                
                <a className="link" onClick={() => toggleSection("settings")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" role="img" aria-labelledby="settingsTitle settingsDesc" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /> <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/> </svg>
                    Settings
                </a>

                {activeSection === "settings" && (
                    <div className="submenu">
                        <p>Nastavení účtu:</p>
                        <ul>
                        <li>Změnit heslo</li>
                        <li>Notifikace</li>
                        <li>Jazyk</li>
                        </ul>
                    </div>
                )}*/}
            </div>
        
         </>
    )
}

export default HamburgerComponent;