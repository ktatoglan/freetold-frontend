import { useState, useEffect, useRef } from "react";
import "../../Style/Modal.css";
import { toast } from "react-toastify";
import { useAppProvider } from "../../Contexts/AppContext";
import axios from "axios";

const RegisterModal = ({ closeRegisterModal }) => {
  const RegisterModalRef = useRef();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [staying, setStaying] = useState("");
  const [postcode, setPostcode] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl, userId, setUserId } = useAppProvider();

  const handleRegister = () => {
    axios.post(`${serverUrl}/register`, {
      email,
      name,
      postcode,
      password
    })
    .then(response => {

      toast.success(response.data.message);
      setUserId(response.data.userId);
      closeRegisterModal();
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error(error);
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        RegisterModalRef.current &&
        !RegisterModalRef.current.contains(event.target)
      ) {
        closeRegisterModal();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeRegisterModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closeRegisterModal]);

  return (
    <div className="modalBackground">
      <div className="modalContainer registerModal" ref={RegisterModalRef}>
        <div className="title">
          <h3>Create an account</h3>
        </div>
        <div className="form">
          <div className="row">
            <div className="col">
              <p htmlFor="">Email address</p>
              <input
                type="email"
                className="text-input"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p htmlFor="">What should we call you?</p>
              <input
                type="text"
                className="text-input"
                placeholder="Alena"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p htmlFor="">Your Current Postcode</p>
              <input
                type="text"
                className="text-input"
                placeholder="Address"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p htmlFor="">Password</p>
              <input
                type="password"
                className="text-input"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>
                Should include uppercase letter, number and 8 characters or more
              </p>
            </div>
          </div>
          <div className="row m-0">
            <div className="col">
              <div className="toggle-group">
                <input type="checkbox" id="switch" />
                <label for="switch">Toggle</label>
                <p>Stay signed in</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                By proceeding, you agree to our Terms of Use and confirm you
                have read our Privacy and Cookie Statement. This site is
                protected by reCAPTCHA and the Google Privacy Policy and Terms
                of Service apply.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                className="write-a-review"
                onClick={async () => {
                  await handleRegister();
                }}
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
