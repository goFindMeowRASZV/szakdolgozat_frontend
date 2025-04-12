import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { myAxios } from "../contexts/MyAxios";

const UserModal = ({ onClose, onSave, userData, currentUser }) => {
  const isEdit = Boolean(userData);
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [role, setRole] = useState(
    userData?.role ?? (currentUser?.role === 1 ? 1 : 2)
  );
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await myAxios.put(`/api/admin/update-user/${userData.id}`, {
          name,
          email,
          role: currentUser.role === 0 ? role : userData.role,
        });
        toast.success("Felhasználó frissítve.");
      } else {
        const createData = {
          name,
          email,
          password,
          role: currentUser?.role === 1 ? 1 : role,
        };
        await myAxios.post("/api/create-user", createData);
        toast.success("Felhasználó létrehozva.");
      }

      onSave();
      onClose();
    } catch (err) {
      toast.error("Hiba történt mentés közben.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? "Felhasználó szerkesztése" : "Új felhasználó"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Név</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {!isEdit && (
            <Form.Group className="mb-3">
              <Form.Label>Jelszó</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Szerepkör</Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(parseInt(e.target.value))}
              disabled={currentUser?.role !== 0 && !isEdit}
            >
              {currentUser?.role === 0 && (
                <>
                  <option value={0}>Admin</option>
                  <option value={1}>Staff</option>
                  <option value={2}>User</option>
                </>
              )}
              {currentUser?.role === 1 && <option value={1}>Staff</option>}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Mégse
        </Button>
        <Button variant="dark" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Mentés"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
