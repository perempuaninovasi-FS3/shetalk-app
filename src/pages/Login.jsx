import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import background from "../assets/img/form-login.svg";
import icon from "../assets/img/login-icon.svg";
import Logo from "../components/atoms/Logo";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let userCredentials = {
      email,
      password,
    };
    dispatch(loginUser(userCredentials))
      .then((result) => {
        if (result.payload && result.payload.success === true) {
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        }
        console.log(result.payload);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  // Objek untuk media query
  const mediaQueryStyles = {
    "@media (maxWidth: 992px)": {
      width: "90vw",
    },
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="row">
        <div
          className="col-4 d-none d-lg-block"
          style={{ margin: "92px", marginTop: "200px" }}
        >
          <img src={icon} alt="Login Icon" />
        </div>
        <div
          className="col-4 mx-auto text-center p-4"
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            padding: "40px",
            borderRadius: "8px",
            margin: "100px",
            marginTop: "120px",
            width: "90vw", // Properti style untuk lebar
            maxWidth: "500px", // Membatasi lebar maksimal untuk tampilan desktop
          }}
        >
          <div className="loginform">
            <Form onSubmit={handleLogin}>
              <div style={{ marginBottom: "60px" }}>
                <Logo />
              </div>
              <Form.Group controlId="email" className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="email pengguna.."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="kata sandi.."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                className="btn-picks-avatar"
                style={{
                  backgroundColor: "#43d7c2",
                  border: "none",
                  marginBottom: "14px",
                  marginTop: "60px",
                  padding: "10px",
                  width: "100%",
                  transition: "transform 0.3s",
                }}
                type="submit"
              >
                {loading ? "Loading..." : "Masuk"}
              </Button>
              {error && error.length > 0 && (
                <h6 className="" style={{ color: "red", fontSize: "0.8rem" }}>
                  {error}
                </h6>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
