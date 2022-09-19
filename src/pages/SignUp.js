import { Button, TextInputField, toaster } from "evergreen-ui";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api/authAPI";
import auth from "../assets/auth.svg";
import { emailRegex, passRegex } from "../utils/Regex";

const SignUp = () => {
  document.title = "Sign Up";
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
  });

  const [errors, setErrors] = useState({ name: false, email: false, password: false });

  // eslint-disable-next-line no-unused-vars
  const { name, email, password, loading } = values;

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    if (inputName === "email") {
      if (!emailRegex.test(inputValue)) {
        setErrors({
          ...errors,
          email: "This is not a valid email address!",
        });
      } else {
        setValues({ ...values, email: inputValue });
        setErrors({ ...errors, email: false });
      }
    } else if (inputName === "password") {
      if (!passRegex.test(inputValue)) {
        setErrors({
          ...errors,
          password:
            "Password must be more than 8 chars combine with uppercase and lowercase, and at least one number",
        });
      } else {
        setValues({ ...values, password: inputValue });
        setErrors({ ...errors, password: false });
      }
    } else setValues({ ...values, name: inputValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    signUp({ name, email, password })
      .then((res) => {
        setValues({ ...values, loading: false });
        toaster.success(res.data.message, { duration: 4 });
        navigate("/signin");
      })
      .catch((err) => {
        setValues({ ...values, loading: false });
        const msg = err.response.data || err.message || "Something went wrong!";
        toaster.danger(msg, { duration: 4 });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="container py-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}>
        <div className="row">
          <div className="col-md-7 shadow-sm rounded-3 border p-2 d-flex flex-column justify-center align-items-center">
            <h3 className="text-brand pt-4" style={{ color: "#8B2363" }}>
              Create Your Account
            </h3>
            <div className="p-2 w-75">
              <TextInputField
                label="Full Name"
                name="name"
                type="text"
                placeholder="John Doe"
                style={{ border: "2px solid #8B2363" }}
                inputHeight={45}
                marginBottom={5}
                onChange={handleChange}
                required
              />
            </div>

            <div className="p-2 w-75">
              <TextInputField
                label="Email"
                name="email"
                type="email"
                placeholder="test@test.com"
                style={{ border: "2px solid #8B2363" }}
                inputHeight={45}
                marginBottom={5}
                required
                onChange={handleChange}
                validationMessage={errors.email}
              />
            </div>

            <div className="p-2 w-75">
              <TextInputField
                label="Password"
                type="password"
                className="custom-input d-block w-100 px-3 py-2 rounded"
                id="password"
                placeholder="Enter Your Secret Code"
                style={{ border: "2px solid #8B2363" }}
                name="password"
                inputHeight={45}
                marginBottom={5}
                required
                onChange={handleChange}
                validationMessage={errors.password}
              />
            </div>

            <p className="p-2">
              By registering, you agree to our{" "}
              <span>
                <Link to="/" className="text-decoration-none">
                  Terms & Conditions.
                </Link>
              </span>
            </p>
            <Button
              isLoading={loading}
              type="submit"
              className="btn-brand-outline w-50 py-3"
              height={56}
              style={{ border: "2px solid #8B2363" }}>
              Sign Up
            </Button>
            <div className="w-75 text-center py-3">
              <p>
                Have an Account ? Please{" "}
                <Link to="/signin">
                  <button className="btn border p-2">Sign In</button>
                </Link>
              </p>
            </div>
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center py-5">
            <img className="img-fluid" src={auth} alt="" />
          </div>
        </div>
      </div>
    </form>
  );
};
export default SignUp;
