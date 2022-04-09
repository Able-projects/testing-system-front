import { useEffect } from "react"
import { connect } from 'react-redux';
import MainCenter from "../../components/mainCenter/mainCenter"
import { getQuestionsBySL } from '../../store/actions/questionsList'
import './main.css'
const MainPage = (props) =>{
    useEffect(() => {
        props.getQuestionsBySL("6235e7af14220952af350d19","62518c082d1e9360bf341a72")
    },[])
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

const mapStateToProps = (state) => ({
    authReducer: state.authReducer
  })
  
  export default connect(mapStateToProps, { getQuestionsBySL })(MainPage);
  