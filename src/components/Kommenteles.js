import React, { useEffect, useRef, useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import useApiContext from "../contexts/ApiContext";
import { toast } from 'react-toastify';



const Kommenteles = ({ reportId }) => {
  const { user } = useAuthContext();
  const {
    comments,
    getComments,
    deleteComment,
    createComment,
  } = useApiContext();

  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const bottomRef = useRef(null);


  useEffect(() => {
    if (reportId) {
      getComments(reportId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportId]);
  



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!content.trim()) return;
  
    const formData = new FormData();
    formData.append("report", reportId);
    formData.append("user", user.id);
    formData.append("content", content);
    if (photo) {
      formData.append("photo", photo);
    }
  
    try {
      await createComment(formData, "/api/create-comment");
      setContent("");
      setPhoto(null);
      toast.success("Komment sikeresen elküldve!");
      getComments(reportId);
  
      // Smooth scroll to the bottom
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      toast.error("Hiba történt a komment elküldésekor.");
    }
  };
  

  const handleDelete = async (commentId) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a kommentet?")) return;
  
    try {
      await deleteComment(commentId);
      getComments(reportId);
      toast.info("Komment törölve.");
    } catch (err) {
      toast.error("Hiba történt a törlés során.");
    }
  };
  

  return (
    <>
    <div className="container">
  <div className="row">
    <div className="panel panel-default widget">
      <div className="panel-heading">
        <span className="glyphicon glyphicon-comment"></span>
        <h3 className="panel-title">Kommentek</h3>
        <span className="label label-info">{comments.length}</span>
      </div>

      <div className="panel-body">
        <ul className="list-group">
          {comments.map((comment) => (
            <li className="list-group-item comment" key={comment.id}>
              <div className="row">
                <div className="col-xs-2 col-md-1">
                  <img
                    src={comment.user?.photo || "/images/user.jpg"}
                    className="rounded-circle img-fluid"
                    alt="Profilkép"
                  />
                </div>
                <div className="col-xs-10 col-md-11">
                  <div className="mic-info">
                    <a href="/profil">
                      {comment.user?.name || "Ismeretlen felhasználó"}
                    </a>{" "}
                    on {new Date(comment.created_at).toLocaleDateString()}
                  </div>

                  <div className="comment-text mt-1 mb-1">{comment.content}</div>

                  {comment.photo && (
                    <img
                      src={comment.photo}
                      alt="Komment kép"
                      style={{ maxWidth: "200px", borderRadius: "6px" }}
                      className="mb-2"
                    />
                  )}

                  {(user.id === comment.user?.id || user.role === 0) && (
                    <div className="action">
                      <button
                        type="button"
                        className="kukaGomb"
                        title="Delete"
                        onClick={() => handleDelete(comment.id)}
                      >
                        <img
                          src="/images/bin.png"
                          alt="Törlés"
                          className="kukaGombKep"
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel-body">
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Írj egy hozzászólást..."
            rows="3"
            className="form-control"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="form-control mt-2 mb-2"
          />
          <button type="submit" className="btn btn-primary btn-block">
            Küldés
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
  </>  
  );
};
export default Kommenteles;
