import ProfileDetails from "../profileDetails/profileDetails"
import SectionCard from '../sectionCard/sectionCard'
import './mainCenter.css'
import {sectionCards,learnCards} from '../../data'
import LearnCard from '../learCards/learnCards'
const MainCenter = (props) =>{
 
    return(
      <div className="main-center-block">
        <ProfileDetails />
        <h2 className="section-two--hstyle">Your Tasks</h2>
        <div className="section-two--line horizontal-line"></div>
        <div className="section-courses">
          {sectionCards.map((elem,i) => (
            <SectionCard data={elem} key={i} />
          ))}
        </div>
        <h2 className="section-two--hstyle">Additional Sources</h2>
        <div className="section-two--line horizontal-line"></div>
        <div className="additional-flex">
          {learnCards.map((elem,i) => (
            <LearnCard data={elem} key={i} />
          ))}
        </div>
      </div>
    )
}

export default MainCenter