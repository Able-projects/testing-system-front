import MainCenter from "../../components/mainCenter/mainCenter"
import './main.css'
const MainPage = (props) =>{
    return(
        <div className="main-page">
            <div className="main-left">

            </div>
            <div className="main-center">
                <MainCenter />
            </div>   
            <div className="main-right">

            </div>  
        </div>
      
    )
}

export default MainPage