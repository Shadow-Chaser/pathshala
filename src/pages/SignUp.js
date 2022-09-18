import { Link } from "react-router-dom";
import auth from "../assets/auth.svg";

const SignUp = () => {
  return (
    <form>
      <div
        className="container py-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}>
        <div className="row">
          <div className="col-md-7 shadow-sm rounded-3 border p-2 d-flex flex-column justify-center align-items-center">
            <h3 className="text-brand pt-4" style={{ color: "#8B2363" }}>
              Create Your Account
            </h3>
            <div className="p-2 w-75">
              <label htmlFor="name">Full Name</label>
              <input
                name="name"
                type="text"
                className="custom-input d-block w-100 px-3 py-2 rounded"
                id="name"
                placeholder="John Doe"
                style={{ border: "2px solid #8B2363" }}
                required
              />
            </div>

            <div className="p-2 w-75">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="custom-input d-block w-100 px-3 py-2 rounded"
                id="email"
                placeholder="Name@example.com"
                style={{ border: "2px solid #8B2363" }}
                name="email"
                required
              />
            </div>

            <div className="p-2 w-75">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="custom-input d-block w-100 px-3 py-2 rounded"
                id="password"
                placeholder="Enter Your Secret Code"
                style={{ border: "2px solid #8B2363" }}
                name="password"
                required
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
            <button className="btn-brand-outline w-50 py-3" style={{ border: "2px solid #8B2363" }}>
              Sign Up
            </button>
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
