import { Button, TextInputField, toaster } from "evergreen-ui";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/authAPI";
import auth from "../assets/auth.svg";
import { authenticate, isAuthenticated } from "../helpers/Auth";

const SignIn = () => {
  document.title = "Sign In";

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const { email, password, loading } = values;

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setValues({ ...values, [inputName]: inputValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    signIn({ email, password })
      .then((res) => {
        setValues({ ...values, loading: false });
        res.status === 200 &&
          toaster.success("Successfully logged in your account!", { duration: 4 });
        authenticate(res.data.access_token);
        isAuthenticated() && navigate("/");
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
              Sign In to Your Account
            </h3>

            <div className="p-2 w-75">
              <TextInputField
                label="Email"
                type="email"
                className="custom-input d-block w-100 px-3 py-2 rounded"
                placeholder="Name@example.com"
                style={{ border: "2px solid #8B2363" }}
                inputHeight={45}
                name="email"
                marginBottom={5}
                required
                onChange={handleChange}
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
              />
            </div>
            <Button
              isLoading={loading}
              type="submit"
              height={56}
              className="btn-brand-outline w-50 py-3"
              style={{ border: "2px solid #8B2363" }}>
              Sign In
            </Button>
            <div className="w-75 text-center py-3">
              <p>
                Want to create an Account ? Please{" "}
                <Link to="/signup">
                  <button className="btn border p-2">Sign Up</button>
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
export default SignIn;
