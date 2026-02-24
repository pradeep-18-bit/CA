import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import "../Global.css"; 

function Registers() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const firstNameRef = useRef(null);

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Capitalize first letter for firstname & lastname
    const updatedValue =
      name === "firstname" || name === "lastname"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;

    setForm((prev) => {
      const newForm = { ...prev, [name]: updatedValue };

      // Real-time check for password match
      if (name === "password" || name === "confirmPassword") {
        if (
          newForm.confirmPassword &&
          newForm.password !== newForm.confirmPassword
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: "Passwords do not match",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
        }
      }

      return newForm;
    });

    validateField(name, updatedValue);
  };

  const validateField = (name, value) => {
    let message = "";
    switch (name) {
      case "firstname":
        if (!value.trim()) message = "First Name is required";
        break;
      case "lastname":
        if (!value.trim()) message = "Last Name is required";
        break;
      case "email":
        if (!value.trim()) message = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          message = "Invalid email format";
        break;
      case "password":
        if (!value.trim()) message = "Password is required";
        break;
      case "confirmPassword":
        if (!value.trim()) message = "Confirm Password is required";
        else if (value !== form.password) message = "Passwords do not match";
        break;
      case "mobile":
        if (!value.trim()) message = "Mobile Number is required";
        else if (!/^[0-9]{10}$/.test(value))
          message = "Enter a valid 10-digit mobile number";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      validateField(field, form[field]);
      if (!form[field]) newErrors[field] = "This field is required.";
    });
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.values({ ...errors, ...newErrors }).every((err) => err === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Navigate to login with form data
      navigate("/Signin", { state: { user: form } });
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2 className="form-title">Register Account</h2>

        <div className="row">
          <div className="col">
            <input
              ref={firstNameRef}
              type="text"
              name="firstname"
              placeholder="First Name"
              value={form.firstname}
              onChange={handleChange}
            />
            {errors.firstname && (
              <span className="error">{errors.firstname}</span>
            )}
          </div>
          <div className="col">
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={form.lastname}
              onChange={handleChange}
            />
            {errors.lastname && (
              <span className="error">{errors.lastname}</span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="col">
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="col">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        <button type="submit">Register</button>

        <p className="login-link">
          Already have an account? <a href="/Signin">Login Here</a>
        </p>
      </form>
    </div>
  );
}

export default Registers;
