import React, { useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import Kommenteles from "../components/Kommenteles";
import useApiContext from "../contexts/ApiContext";



function MacskaProfil() {
  const { user } = useAuthContext();
  const { aktualisMacska, shelterCat } = useApiContext();

  const [formData] = useState({
    rescuer: "",
    report: "",
    owner: "",
    adoption_date: "",
    kennel_number: "",
    medical_record: "",
    status: "",
    chip_number: "",
    breed: "",
    photo: "",
  });
 
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedFormData = {
      ...formData,
      rescuer: user.id, 
      report: aktualisMacska.report_id, 
    };
    
    console.log("Küldött adatok:", updatedFormData); 
  
    
    shelterCat(updatedFormData, "/api/shelter-cat");
  };
  


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        <div className="profilKepElem">
          <img
            className="profilKep"
            src={aktualisMacska.photo}
            alt={aktualisMacska.photo}
          />
        </div>
        <div>
          {/* <h2>{aktualisMacska.photo}</h2> */}
          <p>
            <strong>Szín:</strong> {aktualisMacska.color}
          </p>
          <p>
            <strong>Minta:</strong> {aktualisMacska.pattern}
          </p>
        </div>
      </div>
      {aktualisMacska.status === "m"
              ? " "
              :  <button onClick={handleSubmit}>Befogás</button>} 
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
        <div><Kommenteles reportId={aktualisMacska.report_id} />
        </div>
        
      </div>
    </div>
  );
}

export default MacskaProfil;
