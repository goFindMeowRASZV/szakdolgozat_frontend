import React, { useState, useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";
import { Link } from "react-router-dom";


const Kommenteles= () => {
    const { user, createComment} = useAuthContext();

    const [formData, setFormData] = useState({
        user: "",
        content: "",
        photo: "",
      });

    const handleChange = (e) => {
        const {  value, name} = e.target;
     
        if (name === 'tartalom') {
            setFormData({ ...formData, [name]: value });
        }
        console.log(formData);
     
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user.id)
        setFormData({ ...formData, 'creator_id': user.id });
        console.log(formData);
    
        createComment(formData, '/api/create-comment');

    }
    return(
    <div className="container">
    <div className="row">
      <div className="panel panel-default widget">
        <div className="panel-heading">
          <span className="glyphicon glyphicon-comment"></span>
          <h3 className="panel-title">Kommentek</h3>
          <span className="label label-info">78</span>
        </div>
        <div className="panel-body">
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
                <div className="col-xs-2 col-md-1">
                  <img
                    src="images/user.jpg"
                    className="rounded-circle img-fluid"
                    alt=""
                  />
                </div>
                <div className="col-xs-10 col-md-11">
                  <div>
                    <div className="mic-info">
                      <a href="#">User02</a> on 11 Nov 2013
                    </div>
                  </div>
                  <div className="comment-text">
                    Nagyon szép cica, remélem megkerül!
                  </div>
                  <div className="action">
                    <button
                      type="button"
                      className="kukaGomb"
                      title="Delete"
                    >
                      <img
                        src="images/bin.png"
                        alt="Törlés"
                        className="kukaGombKep"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-xs-2 col-md-1">
                  <img
                    src="images/user.jpg"
                    className="rounded-circle img-fluid"
                    alt=""
                  />
                </div>
                <div className="col-xs-10 col-md-11">
                  <div>
                    <div className="mic-info">
                      <a href="#">User03</a> on 11 Nov 2013
                    </div>
                  </div>
                  <div className="comment-text">
                    Én is láttam őt itt a környékünkön!
                  </div>
                  <div className="action">
                    <button
                      type="button"
                      className="kukaGomb"
                      title="Delete"
                    >
                      <img
                        src="images/bin.png"
                        alt="Törlés"
                        className="kukaGombKep"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="panel-body">
          <ul className="list-group">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2 col-md-1">
                    <img src="images/user.jpg" className="rounded-circle img-fluid" alt="" />
                  </div>
                  <div className="col-xs-10 col-md-11">
                    <div className="mic-info">
                      <Link className="nav-link" to="/profil">{user.name}</Link> 
                      <p>{new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="comment-text">komment</div>
                    <div className="action">
                    <button
                      type="button"
                      className="kukaGomb"
                      title="Delete"
                    >
                      <img
                        src="images/bin.png"
                        alt="Törlés"
                        className="kukaGombKep"
                      />
                    </button>
                  </div>
                  </div>
                </div>
              </li>
            
          </ul>

          {/* Komment írása gomb */}
          <button className="btn btn-dark btn-sm btn-block">
            <span className="glyphicon glyphicon-refresh"></span> Komment írása
          </button>

          {/* Az új komment beviteli mezője (feltételes megjelenítés) */}
            <form
              onSubmit={handleSubmit}
              style={{ marginTop: "10px" }}
            >
              <textarea
                name="tartalom"
                value={formData.content}
                onChange={handleChange}
                placeholder="Írj egy hozzászólást..."
                rows="3"
                style={{ width: "100%" }}
              />
              <button type="submit" className="btn btn-primary">
                Küldés
              </button>
            </form>
        </div>
      </div>
    </div>
  </div>
          
    )
}
export default Kommenteles