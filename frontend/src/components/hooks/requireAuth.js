import {useLocation, Navigate, Outlet} from 'react-router';
import useAuth from './useAuth';

export default function RequireAuth() {

    const {auth} = useAuth();
    const location = useLocation();

return(
    auth?.uid
    ?<Outlet />
    :<Navigate to='/login' state={{from:location}} replace />
)

}

