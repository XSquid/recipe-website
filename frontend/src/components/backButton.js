import { useNavigate } from "react-router-dom";
import './css-files/backButton.css'

export default function BackButton(){


    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(-1);
    }  

    return(
        <div className='back-btn'>
            <i className="fa-solid fa-arrow-left" onClick={clickHandler}></i>
        </div>
    )
}