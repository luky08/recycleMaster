import { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import './HamburgerMenu.css'


function HamburgerComponent(){
    const [open, setOpen] = useState(false)
    const [visible, setVisible] = useState(false);

    //When open changes to true, set visible to true – the panel will be shown
    useEffect(() => {
        if (open) setVisible(true);
    }, [open]);

    // When closing animation finishes, remove panel from DOM
    const handleAnimationEnd = (e) => {
        if (!open && e.animationName === "slideOutToRight") {
        setVisible(false);
        }
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
                <div className="user">
                    <img src="/assets/user.png" alt="User" className="image" />
                    <h2 className="name">Jan Novák</h2>
                </div>
                <a className="link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" role="img" aria-labelledby="settingsTitle settingsDesc" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /> <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/> </svg>
                    Settings
                </a>
                <a className="link logout">
                    <svg xmlns="http://www.w3.org/2000/svg"width="20" height="20" viewBox="0 0 24 24"role="img" aria-labelledby="logoutTitle logoutDesc"fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3" /><path d="M13 17l5-5-5-5" /><path d="M8 12h10" /></svg>
                    Log Out
                </a>
            </div>
        
         </>
    )
}

export default HamburgerComponent;