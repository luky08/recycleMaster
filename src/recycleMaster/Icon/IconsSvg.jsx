function InfoSvg(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="img" aria-labelledby="helpIconTitle" focusable="false" ><circle cx="12" cy="12" r="9"></circle> <path d="M9.6 8.7a2.6 2.6 0 1 1 3.3 2.5c-.9.4-1.5 1.2-1.5 2.1v.6"></path> <path d="M12 17h.01"></path> </svg>
    )
}

function AchievementSvg({}){
    return(
        <svg width="20" height="20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"> <g strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"> <path d="M38 22h52c0 24-10 40-26 43v12h-0.1V65C48 62 38 46 38 22Z"/> <path d="M38 30H27c-6 0-11 5-11 11v2c0 10 9 18 20 18"/> <path d="M90 30h11c6 0 11 5 11 11v2c0 10-9 18-20 18"/><path d="M64 77v12"/> <path d="M40 98h48"/> <path d="M30 110h68"/> </g> </svg>
    )
}
export {
    InfoSvg,
    AchievementSvg
}