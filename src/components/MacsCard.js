function MacsCard(props) {
    //const url='http://localhost:8000';
  
    return (
      <div className="cica"> 
        <img className="card-img" src={ props.adat.photo} alt="Card image"/>
        <div className="cica-leiras">
          <h1 className="cica-cim">Cica</h1>
          <ul>
            <li>{props.adat.color}</li>
            <li>{props.adat.pattern}</li>
          </ul>
          <p className="cica-p">{props.adat.other_identifying_marks}</p>
        </div>
      </div>
    )
  }
  
  export default MacsCard