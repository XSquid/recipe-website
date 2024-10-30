import useAuth from '../hooks/useAuth';
import { Link } from "react-router-dom";

export default function AdminButton() {

    const admin = process.env.REACT_APP_ADMIN
    const { auth} = useAuth();

    const renderButton = () => {
        if (auth.username === admin) {
            return(
                <Link to={'/admin'}><button>Admin</button></Link>
            )
        }
        else return null
    }

    return (
        renderButton()
    )
}