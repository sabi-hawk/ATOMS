import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AtomState } from "../../flux/store";
import { prettyName } from "../../utils";
// import { Modal, Button, Form } from "react-bootstrap";

const ProfileModal = ({ setOpen }: any) => {
  const [show, setShow] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const {
    auth: { user },
  } = useSelector((state: AtomState) => state);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    // setOpen(false);
    setShow(true);
  };
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
      {/* <button
        className="btn btn-primary"
        onClick={() => {
          setShow(true);
        }}
      >
        Edit Profile
      </button> */}
      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog user-model-tags">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div>
                  <div className="input-group flex-nowrap mb-3">
                    <input
                      readOnly
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={prettyName(user.name)}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                    <span className="input-group-text" id="addon-wrapping">
                      @
                    </span>
                  </div>
                </div>
                <div>
                  <div className="input-group mb-3">
                    <input
                      readOnly
                      type="text"
                      className="form-control"
                      placeholder="Recipient's Email"
                      value={user.email.split("@")[0]}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    ></input>
                    <span className="input-group-text" id="basic-addon2">
                      {`@${user.email.split("@")[1]}`}
                      {/* @example.com */}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="">Tags</label>
                  <div className="d-grid custom-user-tags">
                    {tags.map((tag, index) => (
                      <div key={index} className="input-group mt-2">
                        <input
                          onChange={(e) =>
                            handleTagChange(index, e.target.value)
                          }
                          type="text"
                          className="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(index)}
                          className="btn btn-danger"
                          id="button-addon2"
                        >
                          -
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={handleAddTag}
                  >
                    Add Tags
                  </button>
                  <small className="d-block mt-2">
                    Add tags relevant to your profession, work ...
                  </small>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="modal" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Tags</label>
                    {tags.map((tag, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) =>
                            handleTagChange(index, e.target.value)
                          }
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveTag(index)}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="btn btn-primary" onClick={handleAddTag}>
                      +
                    </button>
                  </div>
                </form> 
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => {
                  setShow(false)
                }}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div> */}

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              {tags.map((tag, index) => (
                <div key={index} className="input-group mb-2">
                  <Form.Control
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                  />
                  <div className="input-group-append">
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveTag(index)}
                    >
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
      </Modal> */}
    </>
  );
};

export default ProfileModal;

{
  /* <Form>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tags</Form.Label>
                    {tags.map((tag, index) => (
                      <div key={index} className="input-group mb-2">
                        <Form.Control
                          type="text"
                          value={tag}
                          onChange={(e) =>
                            handleTagChange(index, e.target.value)
                          }
                        />
                        <div className="input-group-append">
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveTag(index)}
                          >
                            -
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="primary" onClick={handleAddTag}>
                      +
                    </Button>
                  </Form.Group>
                </Form> */
}
