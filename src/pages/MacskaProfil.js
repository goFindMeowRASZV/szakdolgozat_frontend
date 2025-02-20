import React, { useState, useEffect } from "react";
import useAuthContext from "../model/contexts/AuthContext";

/* const MacskaProfil = ({ macskaId }) => {
  const [macska, setMacska] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); */
  
function MacskaProfil() {
  const { aktualisMacska, shelterCat, user} = useAuthContext();
  const [macska, setMacska] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [formData, setFormData] = useState({
    rescuer: '',
    report: '',
    owner:'',
    adoption_date:'',
    kennel_number:'',
    medical_record:'',
    status:'',
    chip_number:'',
    breed:'',
    photo:''
  });
 
 
/*   const handleChange = (e) => {
    const { rescuer, report } = e.target;
      setFormData({ ...formData, [rescuer]: user });
      setFormData({ ...formData, [report]: aktualisMacska.id });
    }

 */
/*   const handleSubmit = (e) => {
    console.log(user)
    console.log(aktualisMacska)
    console.log("Submit")
    e.preventDefault();
    console.log(user.id)
    console.log(aktualisMacska.report_id)
    setFormData({ ...formData, 'rescuer': user.id });
    setFormData({ ...formData, 'report': aktualisMacska.report_id });
    console.log(formData);
    console.log(user.id)
    console.log(aktualisMacska.report_id )
    shelterCat( formData, '/api/shelter-cat')
  }; */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedFormData = {
      ...formData,
      rescuer: user.id,
      report: aktualisMacska.report_id
    };
  
    setFormData(updatedFormData); // Frissítjük az állapotot
    console.log(updatedFormData); // Ellenőrzés
  
    shelterCat(updatedFormData, '/api/shelter-cat');
  };
  

return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "1000px", margin: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px", width: "100%" }}>
        <div className="profilKepElem">
            <img className="profilKep" src={aktualisMacska.photo} alt={aktualisMacska.photo} />
        </div>
        <div>
          {/* <h2>{aktualisMacska.photo}</h2> */}
          <p><strong>Szín:</strong> {aktualisMacska.color}</p>
          <p><strong>Minta:</strong> {aktualisMacska.pattern}</p>
        </div>
      </div>
      <button onClick={handleSubmit}>Befogás</button>
      <div style={{ marginTop: "20px", width: "100%" }}>
        {/* <h3>Hozzászólások</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.text}</li>
          ))}
        </ul>
        <form //</div>onSubmit={handleCommentSubmit} 
        style={{ marginTop: "10px" }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Írj egy hozzászólást..."
            rows="3"
            style={{ width: "100%" }}
          />
          <button type="submit">Küldés</button>
        </form> */}
                <div className="container">
            <div className="row">
                <div className="panel panel-default widget">
                    <div className="panel-heading">
                        <span className="glyphicon glyphicon-comment"></span>
                        <h3 className="panel-title">
                            Kommentek</h3>
                        <span className="label label-info">
                            78</span>
                    </div>
                    <div className="panel-body">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-xs-2 col-md-1">
                                        <img src="images/user.jpg" className="rounded-circle img-fluid" alt="" /></div>
                                    <div className="col-xs-10 col-md-11">
                                        <div>
                                            <div className="mic-info">
                                                By: <a href="#">User01</a> on 2 Aug 2013
                                            </div>
                                        </div>
                                        <div className="comment-text">
                                            Ismerős, mintha láttam volna már erre felé.
                                        </div>
                                        <div className="action">
                                            {/* <button type="button" className="btn btn-primary btn-xs" title="Edit">
                                                <span className="glyphicon glyphicon-pencil"></span>
                                            </button>
                                            <button type="button" className="btn btn-success btn-xs" title="Approved">
                                                <span className="glyphicon glyphicon-ok"></span>
                                            </button> */}
                                            <button type="button" className="kukaGomb" title="Delete">
                                                <img src="images/bin.png" alt="Törlés" className="kukaGombKep"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-xs-2 col-md-1">
                                        <img src="images/user.jpg" className="rounded-circle img-fluid" alt="" /></div>
                                    <div className="col-xs-10 col-md-11">
                                        <div>
                                            
                                            <div className="mic-info">
                                                By: <a href="#">User02</a> on 11 Nov 2013
                                            </div>
                                        </div>
                                        <div className="comment-text">
                                            Nagyon szép cica, remélem megkerül!
                                        </div>
                                        <div className="action">
                                            {/* <button type="button" className="btn btn-primary btn-xs" title="Edit">
                                                <span className="glyphicon glyphicon-pencil"></span>
                                            </button>
                                            <button type="button" className="btn btn-success btn-xs" title="Approved">
                                                <span className="glyphicon glyphicon-ok"></span>
                                            </button> */}
                                            <button type="button" className="kukaGomb" title="Delete">
                                                <img src="images/bin.png" alt="Törlés" className="kukaGombKep"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-xs-2 col-md-1">
                                        <img src="images/user.jpg" className="rounded-circle img-fluid"  alt="" /></div>
                                    <div className="col-xs-10 col-md-11">
                                        <div>
                                        
                                            <div className="mic-info">
                                                By: <a href="#">User03</a> on 11 Nov 2013
                                            </div>
                                        </div>
                                        <div className="comment-text">
                                            Én is láttam őt itt a környékünkön!
                                        </div>
                                        <div className="action">
                                            {/* <button type="button" className="btn btn-primary btn-xs" title="Edit">
                                                <span className="glyphicon glyphicon-pencil"></span>
                                            </button>
                                            <button type="button" className="btn btn-success btn-xs" title="Approved">
                                                <span className="glyphicon glyphicon-ok"></span>
                                            </button> */}
                                            <button type="button" className="kukaGomb" title="Delete">
                                                <img src="images/bin.png" alt="Törlés" className="kukaGombKep"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a href="#" className="btn btn-dark btn-sm btn-block" role="button"><span className="glyphicon glyphicon-refresh"></span> Komment írása</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MacskaProfil;
