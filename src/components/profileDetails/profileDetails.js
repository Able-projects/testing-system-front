const ProfileDetails = (props) =>{
    return(
    <div className="profile">
        <div className="profile-detail">
          <h2>Profile Details</h2>
          <div className="profile-text">
            <p>Hi, <span>Username</span>, you have completed</p>
            <p>
              <span>progresshtml</span> of HTML section,
              <span>progresscss</span> of CSS section
            </p>
            <p><span>progressjs</span> of JS section</p>
          </div>
          <div className="profile-btn">
            <a href="#" className="btn">Set Goals</a>
          </div>
        </div>
        <div className="profile-pic">
          <img src="img/5127314 1.svg" />
        </div>
    </div>
    )
}

export default ProfileDetails