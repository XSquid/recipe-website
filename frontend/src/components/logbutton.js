import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "./axios";
import useAuth from "./hooks/useAuth";

export default function LogButton() {

    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        const response = await axios.post('/logout')
        setAuth({})
        navigate('/')
    }

    return (
        auth?.uid
            ?
            <>
                <button onClick={logoutHandler}>Log Out</button>
                <Link to={'/profile'}><button>Profile</button></Link>
            </>

            :
            <>
                <Link to={'/register'}><button>Register</button></Link>
                <Link to={'/login'}><button>Login</button></Link>
            </>

    )


}

