import React, { useState } from "react";
import Header from '../Header/Header';
import './NewTeachers.css';

function NewTeachers() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    placeOfBirth: '',
    city: '',
    university: '',
    degree: '',
    educationStartDate: '',
    educationEndDate: '',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      photo: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Teacher information submitted successfully!');
  };

  const handleSaveDraft = () => {
    console.log('Draft saved:', formData);
    alert('Draft saved successfully!');
  };

  return (
    <div className="new-teacher-form">
      <Header title="Add New Teacher" />
      <div className="new-teacher-form__container">
        <form onSubmit={handleSubmit}>
          <div className="new-teacher-form__section_first">
            <h2 className="new-teacher-form__title">Personal Details</h2>
            <div className="new-teacher-form__row">
              <div className="new-teacher-form__group">
                <label>First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="new-teacher-form__group">
                <label>Last Name *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="new-teacher-form__row">
              <div className="new-teacher-form__group">
                <label>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="new-teacher-form__group">
                <label>Phone *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="new-teacher-form__row">
            <div className="new-teacher-form__group">
              <label>Address *</label>
              <textarea name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="new-teacher-form__group">
              <label>Photo *</label>
              <div className="new-teacher-form__file-upload">
                <label htmlFor="photo-upload" className="new-teacher-form__file-label">
                  {formData.photo ? formData.photo.name : 'Drag and drop or click here to select file'}
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                  required
                />
              </div>
            </div>
            </div>



            <div className="new-teacher-form__row">
              <div className="new-teacher-form__group">
                <label>Date of Birth *</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
              </div>
              <div className="new-teacher-form__group">
                <label>Place of Birth *</label>
                <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} required />
              </div>
            </div>

          <div className="new-teacher-form__section_second">
            <h2 className="new-teacher-form__title">Education</h2>

            <div className="new-teacher-form__row">

            <div className="new-teacher-form__group">
              <label>University *</label>
              <input type="text" name="university" value={formData.university} onChange={handleChange} required />
            </div>
            <div className="new-teacher-form__group">
              <label>Degree *</label>
              <input type="text" name="degree" value={formData.degree} onChange={handleChange} required />
            </div>

          </div>
            <div className="new-teacher-form__row">
              <div className="new-teacher-form__group">
                <label>Start Date *</label>
                <input type="month" name="educationStartDate" value={formData.educationStartDate} onChange={handleChange} required />
              </div>
              <div className="new-teacher-form__group">
                <label>End Date *</label>
                <input type="month" name="educationEndDate" value={formData.educationEndDate} onChange={handleChange} required />
              </div>
              <div className="new-teacher-form__group">
              <label>City *</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            </div>
            
          </div>

          <div className="new-teacher-form__actions">
            <button type="button" onClick={handleSaveDraft} className="new-teacher-form__draft-button">
              Save as Draft
            </button>
            <button type="submit" className="new-teacher-form__submit-button">
              Submit
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTeachers;
