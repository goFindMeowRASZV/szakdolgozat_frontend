import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function VendegFigyelmeztetoModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bejelentkezés szükséges</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Kérlek, jelentkezz be az örökbefogadáshoz!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Bezárás
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
