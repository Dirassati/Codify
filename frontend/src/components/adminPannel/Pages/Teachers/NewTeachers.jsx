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
    photo: null,
    matricule: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photo) {
      alert('Please upload a photo.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call (replace with actual API call in production)
      console.log("Sending data to https://fakeapi.com/teachers ...");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate async operation

      console.log('Form submitted:', formData);
      alert('Teacher information submitted successfully!');

      // Reset form after successful submission
      setFormData({
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
        photo: null,
        matricule: '',
        password: ''
      });
    } catch (err) {
      setError('Failed to submit the form. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
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
                <label htmlFor="firstName">First Name *</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
              <div className="new-teacher-form__group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div className="new-teacher-form__row">
              <div className="new-teacher-form__group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
              <div className="new-teacher-form__group">
                <label htmlFor="phone">Phone *</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div className="new-teacher-form__row">
              <div className="new-teacher-form__group">
                <label htmlFor="matricule">Matricule *</label>
                <input
                  id="matricule"
                  type="text"
                  name="matricule"
                  value={formData.matricule}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
              <div className="new-teacher-form__group">
                <label htmlFor="password">Mot de passe *</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div className="new-teacher-form__row">
              <div className="new-teacher-form__group">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
              <div className="new-teacher-form__group">
                <label htmlFor="photo-upload">Photo *</label>
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
                    aria-required="true"
                  />
                </div>
              </div>
            </div>

            <div className="new-teacher-form__row">
              <div className="new-teacher-form__group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
              <div className="new-teacher-form__group">
                <label htmlFor="placeOfBirth">Place of Birth *</label>
                <input
                  id="placeOfBirth"
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
            </div>
          </div> {/* Closing tag for new-teacher-form__section_first */}

          <div className="new-teacher-form__section_second">
            <h2 className="new-teacher-form__title">Education</h2>

            <div className="new-teacher-form__row">
              <div className="new-teacher-form__group">
                <label htmlFor="university">University *</label>
                <input
                  id="university"
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
              <div className="new-teacher-form__group">
                <label htmlFor="degree">Degree *</label>
                <input
                  id="degree"
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div className="new-teacher-form__row">
              <div className="new-teacher-form__group">
                <label htmlFor="educationStartDate">Start Date *</label>
                <input
                  id="educationStartDate"
                  type="month"
                  name="educationStartDate"
                  value={formData.educationStartDate}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
              <div className="new-teacher-form__group">
                <label htmlFor="educationEndDate">End Date *</label>
                <input
                  id="educationEndDate"
                  type="month"
                  name="educationEndDate"
                  value={formData.educationEndDate}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
              <div className="new-teacher-form__group">
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
            </div>
          </div>

          {error && <div className="new-teacher-form__error">{error}</div>}

          <div className="new-teacher-form__actions">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="new-teacher-form__draft-button"
              disabled={loading}
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="new-teacher-form__submit-button"
              disabled={loading}
            >
              {loading ? <div className="spinner"></div> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTeachers;