
const LearnCard = (props) =>{
    const data = props.data
    return(
        <div className="additional-js" style={{backgroundColor: data.color}}>
        <div className="additional-text">
            <p className="three-title">{data.title}</p>
            <p className= "three-title--text">{data.text}</p></div>
        <div className="additional-img"><img src={data.img} /></div>
      </div>
    )
}

export default LearnCard