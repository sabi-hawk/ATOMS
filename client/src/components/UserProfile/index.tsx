import { useState } from "react";
import { useSelector } from "react-redux";
import { AtomState } from "../../flux/store";
import { prettyName } from "../../utils";
import "../index.css";

const ProfileModal = () => {
  const {
    auth: {
      user: { name, email, tags: userTags, _id },
    },
  } = useSelector((state: AtomState) => state);

  const [tags, setTags] = useState<string[]>(userTags);
  const chatLink = `http://localhost:3000/provider/${_id}/chat`;
  const [isCopied, setIsCopied] = useState(false);

  const handleSave = () => {
    console.log("Saved!");
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
                      value={prettyName(name)}
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
                      placeholder="User's Email"
                      value={email?.split("@")[0]}
                      aria-label="Username"
                      aria-describedby="basic-addon2"
                    ></input>
                    <span className="input-group-text" id="basic-addon2">
                      {`@${email?.split("@")[1]}`}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="">Tags</label>
                  <div className="d-grid custom-user-tags">
                    {tags?.map((tag, index) => (
                      <div key={index} className="input-group mt-2">
                        <input
                          onChange={(e) =>
                            handleTagChange(index, e.target.value)
                          }
                          value={tag}
                          type="text"
                          className="form-control"
                          placeholder="enter tag"
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
                <label className="profile-labels">Chat Link</label>
                <div className="input-group flex-nowrap mb-3">
                  <span className="input-group-text" id="addon-wrapping">
                    LINK
                  </span>
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={chatLink}
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                  />
                  <span
                    className="input-group-text span-copy"
                    id="addon-wrapping"
                  >
                    <button
                      disabled={isCopied}
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(chatLink);
                        setIsCopied(true);
                        setTimeout(() => {
                          setIsCopied(false);
                        }, 3000);
                      }}
                    >
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  </span>
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
    </>
  );
};

export default ProfileModal;
