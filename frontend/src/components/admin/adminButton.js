import { useNavigate } from "react-router";
import useAuth from '../hooks/useAuth';

export default function AdminButton() {

    const navigate = useNavigate();
    const admin = process.env.REACT_APP_ADMIN
    const { auth} = useAuth();

    const renderButton = () => {
        if (auth.username === admin) {
            return(
                <button onClick={() => navigate('/admin')}>Admin</button>
            )
        }
        else return null
    }

    return (
        renderButton()
    )
}