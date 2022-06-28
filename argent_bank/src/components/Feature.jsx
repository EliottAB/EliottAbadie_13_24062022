import "../css/components/feature.css"

export function Feature(props){

    return(
        <div className="feature-item">
          <img src={props.image} alt={props.iagealt} className="feature-icon" />
          <h3 className="feature-item-title">{props.title}</h3>
          <p>{props.text}</p>
        </div>
    )

}