import Login from "./auth/login/login";
import Feed from "./feed/feed";

const Protected=()=>{
    
    return(
        <>
{localStorage.getItem('user')?
<Feed></Feed>
:<Login></Login>}
        </>
    )
}

export default Protected;