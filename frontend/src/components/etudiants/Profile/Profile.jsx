"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Upload } from "lucide-react"
import "./profile.css"
import SearchField from '../SearchField'

const Profile = () => {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    nationality: "",
    address: "",
    grade: "",
    field: "",
    dateOfBirth: "",
    placeOfBirth: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Fetch profile data from API and map to formData
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true)
      try {
        const studentId = 19 // Replace with dynamic id if needed
        const response = await fetch(`http://localhost:5000/api/students/${studentId}/details`)
        const json = await response.json()

        if (json.success && json.data) {
          const data = json.data
          setProfileData(data)

          setFormData({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            age: "", // Not available in API response
            nationality: "", // Not available in API response
            address: "", // Not available in API response
            grade: data.grade ? data.grade.name : "",
            field: data.specialization || "",
            dateOfBirth: "", // Not available in API response
            placeOfBirth: "", // Not available in API response
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          })
        } else {
          setError("Failed to load profile data.")
        }
        setLoading(false)
      } catch (err) {
        console.error("Error fetching profile data:", err)
        setError("Failed to load profile data. Please try again later.")
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // In a real app, you would send the updated data to your API
    alert("Profile updated successfully!")
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!")
      return
    }
    alert("Password updated successfully!")
  }

  const handleFileSelect = (file) => {
    const acceptedTypes = ["image/jpeg", "image/png", "image/svg+xml"]
    if (!acceptedTypes.includes(file.type)) {
      alert("Please select a JPG, PNG, or SVG file.")
      return
    }
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert("File is too large. Please select a file under 5MB.")
      return
    }
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image to upload")
      return
    }
    setLoading(true)
    try {
      // Simulate API upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Profile image uploaded successfully!")
      setLoading(false)
    } catch (err) {
      console.error("Error uploading image:", err)
      alert("Failed to upload image. Please try again.")
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="search-wrapper">
        <SearchField />
      </div>

      <form onSubmit={handleSubmit}>
        {/* General Information Section */}
        <section className="profile-section">
          <h2 className="section-title">General</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First name*</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last name*</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age*</label>
              <input type="text" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="nationality">Nationality*</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="address">Adresse</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} rows={3} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="grade">Grade</label>
              <input type="text" id="grade" name="grade" value={formData.grade} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label htmlFor="field">Field</label>
              <input type="text" id="field" name="field" value={formData.field} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="placeOfBirth">Place of Birth</label>
              <input
                type="text"
                id="placeOfBirth"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* Password Section */}
        <section className="profile-section">
          <h2 className="section-title">Password</h2>

          <div className="form-row">
            <div className="form-group password-group">
              <label htmlFor="currentPassword">Current password</label>
              <div className="password-input-container">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group password-group">
              <label htmlFor="newPassword">New password</label>
              <div className="password-input-container">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
                <button type="button" className="password-toggle" onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group password-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="button" className="save-button" onClick={handlePasswordChange}>
              Save Password
            </button>
          </div>
        </section>

        <hr className="section-divider" />

        {/* Profile Image Section */}
        <section className="profile-section">
          <h2 className="section-title">Profile Image</h2>

          <div className="upload-wrapper">
            <div className="upload-container">
              {selectedImage ? (
                <img src={selectedImage} alt="Selected profile" className="profile-image-preview" />
              ) : (
                <p>No image selected</p>
              )}

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.svg"
                id="profileImage"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileSelect(e.target.files[0])
                  }
                }}
              />
              <label htmlFor="profileImage" className="upload-label">
                <Upload size={20} />
                Choose a file
              </label>
            </div>
            <button type="button" className="upload-button" onClick={handleImageUpload}>
              Upload Image
            </button>
          </div>
        </section>

        <hr className="section-divider" />

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default Profile
