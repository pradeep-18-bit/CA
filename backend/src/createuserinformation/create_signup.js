
// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./register.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function Signuppage() {
//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobile: "",
//     role: "",
//   });

//   // 👁 ONLY added
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const location = useLocation();
//   const firstNameRef = useRef(null);
//   const navigate = useNavigate();

//   const token = location.state?.token || localStorage.getItem("token");

//   useEffect(() => {
//     firstNameRef.current?.focus();
//   }, []);

//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(""), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   // PASSWORD STRENGTH (UNCHANGED)
//   const validatePasswordStrength = (value) => {
//     let error = "";

//     if (value.length < 8) error = "At least 8 characters required";
//     else if (!/[A-Z]/.test(value)) error = "Add an uppercase letter (A-Z)";
//     else if (!/[a-z]/.test(value)) error = "Add a lowercase letter (a-z)";
//     else if (!/[@$!%*?&]/.test(value))
//       error = "Add a symbol (@ $ ! % * ? &)";
//     else if (!/\d/.test(value)) error = "Add a number (0-9)";
//     else error = "";

//     setPasswordError(error);
//     return error ? "Weak password" : "";
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     const updatedValue =
//       name === "firstname" || name === "lastname"
//         ? value.charAt(0).toUpperCase() + value.slice(1)
//         : value;

//     setForm((prev) => ({ ...prev, [name]: updatedValue }));

//     if (name === "password") validatePasswordStrength(updatedValue);

//     validateField(name, updatedValue);
//   };

//   const validateField = (name, value) => {
//     let message = "";

//     switch (name) {
//       case "firstname":
//         if (!value.trim()) message = "First Name is required";
//         break;
//       case "lastname":
//         if (!value.trim()) message = "Last Name is required";
//         break;
//       case "email":
//         if (!value.trim()) message = "Email is required";
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//           message = "Invalid email format";
//         break;
//       case "password":
//         if (!value.trim()) message = "Password is required";
//         else message = validatePasswordStrength(value);
//         break;
//       case "confirmPassword":
//         if (!value.trim()) message = "Confirm Password is required";
//         else if (value !== form.password) message = "Passwords do not match";
//         break;
//       case "mobile":
//         if (!value.trim()) message = "Mobile Number is required";
//         else if (!/^[0-9]{10}$/.test(value))
//           message = "Enter a valid 10-digit number";
//         break;
//       case "role":
//         if (!value.trim()) message = "Role is required";
//         break;
//       default:
//         break;
//     }

//     setErrors((prev) => ({ ...prev, [name]: message }));
//   };

//   // ✅ RESTORED (UNCHANGED)
//   const validateForm = () => {
//     const newErrors = {};

//     Object.keys(form).forEach((field) => {
//       validateField(field, form[field]);

//       if (!form[field]) {
//         const required = {
//           firstname: "First Name is required",
//           lastname: "Last Name is required",
//           email: "Email is required",
//           password: "Password is required",
//           confirmPassword: "Confirm Password is required",
//           mobile: "Mobile Number is required",
//           role: "Role is required",
//         };
//         newErrors[field] = required[field];
//       }
//     });

//     setErrors((prev) => ({ ...prev, ...newErrors }));

//     return Object.values({ ...errors, ...newErrors }).every(
//       (err) => err === ""
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     if (!token) {
//       setErrors({ general: "No admin token found. Please log in as admin." });
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/User/create-user",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             firstName: form.firstname,
//             lastName: form.lastname,
//             email: form.email,
//             mobileNumber: form.mobile,
//             password: form.password,
//             role: form.role.toLowerCase(),
//           }),
//         }
//       );

//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch {
//         data = { message: text };
//       }

//       if (!response.ok) {
//         setErrors({ general: data.message || "Registration failed." });
//         return;
//       }

//       setSuccessMessage(data.message || "Account created successfully!");
//       setForm({
//         firstname: "",
//         lastname: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         mobile: "",
//         role: "",
//       });
//       setPasswordError("");
//     } catch {
//       setErrors({ general: "Server error. Please try again later." });
//     }
//   };

//   return (
//     <div className="register-wrapper">
//       <form className="register-box" onSubmit={handleSubmit}>
//         <h2 className="form-title">Create User</h2>

//         {errors.general && <p className="error">{errors.general}</p>}
//         {successMessage && <p className="success">{successMessage}</p>}

//         {/* FIRST + LAST NAME */}
//         <div className="row">
//           <div className="col">
//             <label>First Name</label>
//             <input
//               ref={firstNameRef}
//               type="text"
//               name="firstname"
//               value={form.firstname}
//               onChange={handleChange}
//               className={errors.firstname ? "error-input" : ""}
//               placeholder="First Name"
//             />
//             {errors.firstname && <span className="error">{errors.firstname}</span>}
//           </div>

//           <div className="col">
//             <label>Last Name</label>
//             <input
//               type="text"
//               name="lastname"
//               value={form.lastname}
//               onChange={handleChange}
//               className={errors.lastname ? "error-input" : ""}
//               placeholder="Last Name"
//             />
//             {errors.lastname && <span className="error">{errors.lastname}</span>}
//           </div>
//         </div>

//         {/* EMAIL + MOBILE */}
//         <div className="row">
//           <div className="col">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className={errors.email ? "error-input" : ""}
//               placeholder="Email"
//             />
//             {errors.email && <span className="error">{errors.email}</span>}
//           </div>

//           <div className="col">
//             <label>Mobile Number</label>
//             <input
//               type="text"
//               name="mobile"
//               value={form.mobile}
//               onChange={handleChange}
//               className={errors.mobile ? "error-input" : ""}
//               placeholder="Mobile Number"
//             />
//             {errors.mobile && <span className="error">{errors.mobile}</span>}
//           </div>
//         </div>

//         {/* PASSWORD + CONFIRM PASSWORD */}
//         <div className="row">
//           <div className="col">
//             <label>Password</label>
//             <div style={{ position: "relative" }}>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className={errors.password ? "error-input" : ""}
//                 placeholder="Password"
//               />
//               <span
//                 onClick={() => setShowPassword((p) => !p)}
//                 style={{
//                   position: "absolute",
//                   right: "10px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   cursor: "pointer",
//                 }}
//               >
//                 {showPassword ? <FaEye /> : <FaEyeSlash />}
//               </span>
//             </div>

//             {form.password && passwordError && (
//               <p className="invalid">• {passwordError}</p>
//             )}
//             {form.password && !passwordError && (
//               <p className="valid">✔ Password is strong</p>
//             )}
//           </div>

//           <div className="col">
//             <label>Confirm Password</label>
//             <div style={{ position: "relative" }}>
//               <input
//                 type={showConfirm ? "text" : "password"}
//                 name="confirmPassword"
//                 value={form.confirmPassword}
//                 onChange={handleChange}
//                 className={errors.confirmPassword ? "error-input" : ""}
//                 placeholder="Confirm Password"
//               />
//               <span
//                 onClick={() => setShowConfirm((p) => !p)}
//                 style={{
//                   position: "absolute",
//                   right: "10px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   cursor: "pointer",
//                 }}
//               >
//                 {showConfirm ? <FaEye /> : <FaEyeSlash />}
//               </span>
//             </div>

//             {errors.confirmPassword && (
//               <span className="error">{errors.confirmPassword}</span>
//             )}
//           </div>
//         </div>

//         {/* ROLE */}
//         <div className="row">
//           <div className="col">
//             <label>Role</label>
//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               className={errors.role ? "error-input" : ""}
//             >
//               <option value="">Select Role</option>
//               <option value="staff">Staff</option>
//               <option value="intern">Intern</option>
//             </select>
//             {errors.role && <span className="error">{errors.role}</span>}
//           </div>
//         </div>

//         <button type="submit">ADD</button>
//       </form>
//     </div>
//   );
// }

// export default Signuppage;















import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./register.css";

function Signuppage() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordError, setPasswordError] = useState(""); // only one error

  const location = useLocation();
  const firstNameRef = useRef(null);
  const navigate = useNavigate();

  const token = location.state?.token || localStorage.getItem("token");

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // ✔ ONE ERROR AT A TIME — REAL TIME VALIDATION
  const validatePasswordStrength = (value) => {
    let error = "";

    if (value.length < 8) error = "At least 8 characters required";
    else if (!/[A-Z]/.test(value)) error = "Add an uppercase letter (A-Z)";
    else if (!/[a-z]/.test(value)) error = "Add a lowercase letter (a-z)";
    else if (!/[@$!%*?&]/.test(value))
      error = "Add a symbol (@ $ ! % * ? &)";
    else if (!/\d/.test(value)) error = "Add a number (0-9)";
    else error = ""; // strong password

    setPasswordError(error);
    return error ? "Weak password" : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedValue =
      name === "firstname" || name === "lastname"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;

    setForm((prev) => ({ ...prev, [name]: updatedValue }));

    if (name === "password") validatePasswordStrength(updatedValue);

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
        else message = validatePasswordStrength(value);
        break;
      case "confirmPassword":
        if (!value.trim()) message = "Confirm Password is required";
        else if (value !== form.password) message = "Passwords do not match";
        break;
      case "mobile":
        if (!value.trim()) message = "Mobile Number is required";
        else if (!/^[0-9]{10}$/.test(value))
          message = "Enter a valid 10-digit number";
        break;
      case "role":
        if (!value.trim()) message = "Role is required";
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

      if (!form[field]) {
        const required = {
          firstname: "First Name is required",
          lastname: "Last Name is required",
          email: "Email is required",
          password: "Password is required",
          confirmPassword: "Confirm Password is required",
          mobile: "Mobile Number is required",
          role: "Role is required",
        };
        newErrors[field] = required[field];
      }
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));

    return Object.values({ ...errors, ...newErrors }).every((err) => err === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!token) {
      setErrors({ general: "No admin token found. Please log in as admin." });
      return;
    }

    try {
      const response = await fetch(
        "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/User/create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: form.firstname,
            lastName: form.lastname,
            email: form.email,
            mobileNumber: form.mobile,
            password: form.password,
            role: form.role.toLowerCase(),
          }),
        }
      );

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        setErrors({ general: data.message || "Registration failed." });
        return;
      }

      setSuccessMessage(data.message || "Account created successfully!");

      setForm({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        role: "",
      });

      setPasswordError("");

    } catch (error) {
      console.error("Error registering user:", error);
      setErrors({ general: "Server error. Please try again later." });
    }
  };

  return (
    <div className="register-wrapper">
      <div className="stars-container">
  <div className="star small" style={{ top: "10%", left: "15%" }}></div>
  <div className="star mid" style={{ top: "20%", left: "70%" }}></div>
  <div className="star big" style={{ top: "30%", left: "40%" }}></div>

  <div className="star small" style={{ top: "50%", left: "80%" }}></div>
  <div className="star big" style={{ top: "70%", left: "20%" }}></div>
  <div className="star mid" style={{ top: "85%", left: "60%" }}></div>

  <div className="star small" style={{ top: "40%", left: "10%" }}></div>
  <div className="star big" style={{ top: "15%", left: "85%" }}></div>
  <div className="star mid" style={{ top: "60%", left: "50%" }}></div>

  <div className="star small" style={{ top: "75%", left: "35%" }}></div>
  <div className="star mid" style={{ top: "25%", left: "25%" }}></div>
  <div className="star big" style={{ top: "5%",  left: "55%" }}></div>

  <div className="star big" style={{ top: "92%", left: "10%" }}></div>
  <div className="star small" style={{ top: "68%", left: "90%" }}></div>
  <div className="star mid" style={{ top: "48%", left: "75%" }}></div>

  <div className="star small" style={{ top: "33%", left: "5%" }}></div>
  <div className="star small" style={{ top: "12%", left: "45%" }}></div>
  <div className="star mid" style={{ top: "88%", left: "50%" }}></div>
  <div className="star big" style={{ top: "58%", left: "5%" }}></div>
  <div className="star mid" style={{ top: "78%", left: "70%" }}></div>
</div>
       
      <div 
  style={{
    position: "absolute",
    top: "20px",
    left: "20px",
    zIndex: 10
  }}
>
  <button
    type="button"
    onClick={() => navigate("/usermanagement")}
    style={{
      width: "80px",
      height: "35px",
      background: "black",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
      border: "none"
    }}
  >
    ← Back
  </button>
</div>



      <form className="register-box" onSubmit={handleSubmit}>
        
        <h2 className="form-title">Create User</h2>

        {errors.general && <p className="error">{errors.general}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
          
        {/* FIRST + LAST NAME */}
        <div className="row">
          <div className="col">
            <label>First Name</label>
            <input
              ref={firstNameRef}
              type="text"
              name="firstname"
              className={errors.firstname ? "error-input" : ""}
              placeholder="First Name"
              value={form.firstname}
              onChange={handleChange}
            />
            {errors.firstname && <span className="error">{errors.firstname}</span>}
          </div>

          <div className="col">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              className={errors.lastname ? "error-input" : ""}
              placeholder="Last Name"
              value={form.lastname}
              onChange={handleChange}
            />
            {errors.lastname && <span className="error">{errors.lastname}</span>}
          </div>
        </div>

        {/* EMAIL + MOBILE */}
        <div className="row">
          <div className="col">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className={errors.email ? "error-input" : ""}
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="col">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              className={errors.mobile ? "error-input" : ""}
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>
        </div>

        {/* PASSWORD + CONFIRM PASSWORD */}
        <div className="row">
          <div className="col">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className={errors.password ? "error-input" : ""}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            {/* SHOW ONLY ONE ERROR */}
            {form.password && passwordError && (
              <p className="invalid">• {passwordError}</p>
            )}

            {/* STRONG PASSWORD MESSAGE */}
            {form.password && !passwordError && (
              <p className="valid">✔ Password is strong</p>
            )}

            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="col">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={errors.confirmPassword ? "error-input" : ""}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        {/* ROLE */}
        <div className="row">
          <div className="col">
            <label>Role</label>
            <select
              name="role"
              className={errors.role ? "error-input" : ""}
              value={form.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="staff">Staff</option>
              <option value="intern">Intern</option>
            </select>
            {errors.role && <span className="error">{errors.role}</span>}
          </div>
        </div>

        <button type="submit">ADD</button>

   {/* <div style={{
        display: "flex",
  justifyContent: "space-between",
  marginTop: "15px"
}}>
  
  {/* ADD BUTTON */}
  {/* <button type="submit">ADD</button> */}

  {/* BACK BUTTON */}
  {/* <button
    type="button"
    onClick={() => navigate("/usermanagement")}
    style={{
      width: "30px",
      height: "23px",
      background: "#444",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
      border: "none"
    }}
  > */}
     {/* ← */}
  {/* </button> */}

{/* </div> */} 

        

      </form>
      
    </div>
  );
}

export default Signuppage;









