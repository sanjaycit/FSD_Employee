import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    empID: "",
    email: "",
    phoneNumber: "",
    department: "",
    date_of_join: "",
    role: "",
  });

  const [empIDError, setEmpIDError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState({
    firstName: "",
    lastName: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailError("");
    setEmpIDError("");
    setNameError("");
    setPhoneError("");
    if (name === "email" && value !== "") {
      setEmailError(validateEmail(value) ? "" : "Invalid email format");
    }

    if (name === "phoneNumber" && value !== "") {
      setPhoneError(
        validatePhoneNumber(value) ? "" : "Phone number must be 10 digits"
      );
    }

    if ((name === "firstName" || name === "lastName") && value !== "") {
      setNameError((prev) => ({
        ...prev,
        [name]: validateName(value) ? "" : "Name must only contain alphabets",
      }));
    }

    setFormData({ ...formData, [name]: value });
    handleSubmit();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!validateName(formData.firstName)) {
        setNameError((prev) => ({
          ...prev,
          firstName: "Name must only contain alphabets",
        }));
        return;
      }

      if (!validateName(formData.lastName)) {
        setNameError((prev) => ({
          ...prev,
          lastName: "Name must only contain alphabets",
        }));
        return;
      }

      if (!validateEmail(formData.email)) {
        setEmailError("Invalid email format");
        return;
      }

      if (!validatePhoneNumber(formData.phoneNumber)) {
        setPhoneError("Phone number must be 10 digits");
        return;
      }

      console.log(formData);

      const res = await fetch("http://localhost:8080/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Employee added successfully");
        console.log("Employee added successfully");
        handleReset();
      } else {
        const error = await res.json();
        if (error.field === "empID") {
          setEmpIDError(error.message);
        } else if (error.field === "email") {
          setEmailError(error.message);
        }
      }
    } catch (err) {
      console.log("Error in fetching data", err.message);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      empID: "",
      email: "",
      phoneNumber: "",
      department: "",
      date_of_join: "",
      role: "",
    });
    setEmpIDError("");
    setEmailError("");
    setPhoneError("");
    setNameError({ firstName: "", lastName: "" });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={formData.firstName}
            name="firstName"
            onChange={handleChange}
            required
          />
          <span className="error-wrapper">
            {nameError.firstName && <span>{nameError.firstName}</span>}
          </span>
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={formData.lastName}
            name="lastName"
            onChange={handleChange}
            required
          />
          <span className="error-wrapper">
            {nameError.lastName && <span>{nameError.lastName}</span>}
          </span>
        </div>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            value={formData.empID}
            name="empID"
            onChange={handleChange}
            required
          />
          <span className="error-wrapper">
            {empIDError && <span>{empIDError}</span>}
          </span>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />
          <span className="error-wrapper">
            {emailError && <span>{emailError}</span>}
          </span>
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={formData.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            required
          />
          <span className="error-wrapper">
            {phoneError && <span>{phoneError}</span>}
          </span>
        </div>
        <div>
          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div>
          <label>Date of Joining:</label>
          <input
            type="date"
            name="date_of_join"
            value={formData.date_of_join}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
