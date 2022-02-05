
const SectionCard = (props) =>{
    const data = props.data
    return(
      <div className="section-html grid-help">
        <h3 className="section-title--style">{data.title}</h3>
        <p className="section-title--qna">{data.text}</p>
        <img className = "courses-img"src={data.img} />
        <div className="container-bar">
          <div className="progress-bar"></div>
        </div>
      </div>
    )
}

export default SectionCard