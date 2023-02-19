import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ProfileModal = () => {
  const [show, setShow] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    console.log("Saved!");
    setShow(false);
  };
  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };
  const handleAddTag = () => {
    setTags([...tags, ""]);
  };
  const handleRemoveTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              {tags.map((tag, index) => (
                <div key={index} className="input-group mb-2">
                  <Form.Control type="text" value={tag} onChange={(e) => handleTagChange(index, e.target.value)} />
                  <div className="input-group-append">
                    <Button variant="danger" onClick={() => handleRemoveTag(index)}>
                      -
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="primary" onClick={handleAddTag}>
                +
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;