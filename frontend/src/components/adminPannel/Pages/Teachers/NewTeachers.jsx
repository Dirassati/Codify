"use client"

import { useState } from "react";
import "./NewTeachers.css";

function NewTeachers() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    gender: "",
    degree: "",
    field: "",
    level: "",
    employment_date: "",
    photo: null,
    matricule: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photo) {
      alert("Please upload a photo");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append form data fields correctly
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          // If file, append directly
          if (key === "photo") {
            formDataToSend.append(key, value);
          } else {
            formDataToSend.append(key, value.toString());
          }
        }
      });

      const response = await fetch("http://localhost:5000/api/admin/addteacher", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Teacher added successfully!");
        // Reset form and file input
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          address: "",
          gender: "",
          degree: "",
          field: "",
          level: "",
          employment_date: "",
          photo: null,
          matricule: "",
          password: "",
        });
        document.getElementById("photo").value = "";
      } else {
        const errorData = await response.json();
        alert("Error adding teacher: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-teacher-form">
      <div className="form-container">
        <h1 className="form-title">Add New Teacher</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Matricule *</label>
              <input
                type="text"
                name="matricule"
                value={formData.matricule}
                onChange={handleChange}
                required
                placeholder="ABC-1234"
              />
            </div>
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Employment Date *</label>
              <input
                type="date"
                name="employment_date"
                value={formData.employment_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Degree *</label>
              <select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
              >
                <option value="">Select Degree</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            <div className="form-group">
              <label>Field *</label>
              <input
                type="text"
                name="field"
                value={formData.field}
                onChange={handleChange}
                placeholder="e.g., Mathematics, Physics"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teaching Level *</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              >
                <option value="">Select Level</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
            </div>
            <div className="form-group">
              <label>Photo *</label>
              <div className="file-upload">
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                  style={{ display: "none" }}
                />
                <label htmlFor="photo" style={{ cursor: "pointer" }}>
                  {formData.photo ? formData.photo.name : "Click to upload photo"}
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading"></span> : "Add Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTeachers;
