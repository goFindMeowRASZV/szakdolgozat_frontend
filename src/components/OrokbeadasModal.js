import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import useApiContext from "../contexts/ApiContext";
import { myAxios } from "../contexts/MyAxios";

const OrokbeadasModal = ({ show, onClose, macska }) => {
  const { orokbeadasMenhely } = useApiContext();
  const [users, setUsers] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [date, setDate] = useState("");
  const [isSending, setIsSending] = useState(false);

  const isValid = selectedUserEmail && date;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await myAxios.get("/api/get-users");
        setUsers(data);
      } catch (error) {
        console.error("Nem sikerült lekérni a felhasználókat:", error);
      }
    };

    if (show) {
      fetchUsers();
      setSelectedUserEmail("");
      setDate("");
    }
  }, [show]);

  const handleSubmit = async () => {
    if (!isValid || isSending) return;

    setIsSending(true);
    try {
      await orokbeadasMenhely(macska.cat_id, {
        owner_email: selectedUserEmail,
        adoption_date: date,
      });
      onClose();
    } catch (error) {
      console.error("Hiba az örökbeadás során:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Örökbeadás rögzítése</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Felhasználó (e-mail alapján)</Form.Label>
          <Form.Select
            value={selectedUserEmail}
            onChange={(e) => setSelectedUserEmail(e.target.value)}
          >
            <option value="">Válassz egy felhasználót</option>
            {users.map((user) => (
              <option key={user.id} value={user.email}>
                {user.name} - {user.email}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Örökbefogadás dátuma</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Mégse
        </Button>
        <Button
          variant="dark"
          onClick={handleSubmit}
          disabled={!isValid || isSending}
        >
          {isSending ? <Spinner size="sm" animation="border" /> : "Mentés"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrokbeadasModal;
