import React from "react";
import { Modal, Button } from "react-bootstrap";

function SikerModal({ story, onClose }) {
  return (
    <Modal show={!!story} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{story?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {story && (
          <>
            <p className="fst-italic mb-3">{story.text1}</p>
            <p className="mb-3">{story.text2}</p>
            <p className="fst-italic">{story.text3}</p>

            <div className="row mt-4">
              <div className="col-md-4 mb-3">
                <img
                  src={story.img}
                  alt=""
                  className="img-fluid rounded shadow-sm"
                />
              </div>
              <div className="col-md-4 mb-3">
                <img
                  src={story.img2}
                  alt=""
                  className="img-fluid rounded shadow-sm"
                />
              </div>
              <div className="col-md-4 mb-3">
                <img
                  src={story.img3}
                  alt=""
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default SikerModal;
