import React, { useEffect, useRef, useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import useApiContext from "../contexts/ApiContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Kommenteles = ({ reportId }) => {
  const { user } = useAuthContext();
  const { comments, getComments, deleteComment, createComment, setAktualisFelhasznalo } = useApiContext();

  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const bottomRef = useRef(null);
  const [modalPhoto, setModalPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (reportId) {
      getComments(reportId);
    }
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

      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      toast.error("Hiba történt a komment elküldésekor.");
    }
  };

  const handleDelete = async (reportId, userId) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a kommentet?")) return;

    try {
      await deleteComment(reportId, userId);
      getComments(reportId);
      toast.info("Komment törölve.");
    } catch (err) {
      toast.error("Hiba történt a törlés során.");
    }
  };

  const handleUserClick = (commentUser) => {
    console.log("Kiválasztott kommentelő:", commentUser);
    setAktualisFelhasznalo(commentUser);
    navigate("/profil");
  };
  

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="panel panel-default widget">
            <div className="panel-heading">
              <h3 className="panel-title">Kommentek</h3>
              <span className="label label-info">{comments.length}</span>
            </div>

            <div className="panel-body">
              <ul className="list-group">
                {comments.map((comment, idx) => (
                  <li
                    className="list-group-item comment"
                    key={comment.id || idx}
                  >
                    <div className="row">
                      <div className="col-xs-2 col-md-1">
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleUserClick(comment.user)}
                        >
                          <img
                            src={`http://localhost:8000${comment.user.profile_picture}`}
                            className="kommentProfil"
                            alt="Profilkép"
                          />
                        </span>
                      </div>
                      <div className="col-xs-10 col-md-11">
                        <div className="mic-info">
                          <span
                            style={{ cursor: "pointer", color: "dodgerblue" }}
                            onClick={() => handleUserClick(comment.user)}
                          >
                            {comment.user?.name || "Ismeretlen felhasználó"}
                          </span>{" "}
                          – {new Date(comment.created_at).toLocaleDateString()}
                        </div>

                        <div className="comment-text mt-1 mb-1">
                          {comment.content}
                        </div>

                        {comment.photo && (
                          <img
                            src={comment.photo}
                            alt="Komment kép"
                            style={{
                              maxWidth: "200px",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                            className="mb-2"
                            onClick={() => setModalPhoto(comment.photo)}
                          />
                        )}

                        {(user.id === comment.user?.id || user.role === 0) && (
                          <div className="action">
                            <button
                              type="button"
                              className="kukaGomb"
                              title="Törlés"
                              onClick={() =>
                                handleDelete(comment.report, comment.user.id)
                              }
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
                <div ref={bottomRef} />
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
                <button type="submit" className="btn btn-dark btn-round">
                  Küldés
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {modalPhoto && (
        <div
          className="modal-backdrop-custom"
          onClick={() => setModalPhoto(null)}
        >
          <img
            src={modalPhoto}
            alt="Nagyított komment kép"
            className="modal-image"
          />
        </div>
      )}
    </>
  );
};

export default Kommenteles;
