
import { useSelector } from "react-redux";

function User(){
    
        const userName = useSelector((s) => s.user.userName)
        const age = useSelector((s) => s.user.age)
    return(
        <>
            <div className="user">
                <img src="/assets/user.png" alt="User" className="image" />
                <h2 className="name">{userName}_{age}</h2>
            </div>
        </>
    )
}

export default User;