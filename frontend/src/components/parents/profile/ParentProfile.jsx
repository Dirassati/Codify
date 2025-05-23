"use client"

import { useState, useEffect } from "react"

import { Eye, EyeOff, Upload } from "lucide-react"
// import "./profile.css"
import SearchHeader from '../SearchHeader'
const ParentProfile = () => {
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
    phoneNumber: "",
    email: "",
    address: "",
    profession: "",
    civilStatus: "",
    childsNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true)
      try {
        // In a real app, this would be a fetch call to your API
        // const response = await fetch('/api/profile')
        // const data = await response.json()

        // Simulating API response delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Sample data that would come from the API
        const data = {
          firstName: "malak",
          lastName: "saadi",
         phoneNumber: "+000000",
    email: "aaa@gmail.com",
          address: "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
          profession: "teacher",
    civilStatus: "none",
    childsNumber: "3",
        }

        setProfileData(data)
        setFormData({
          ...data,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
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
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!")
      return
    }
    // In a real app, you would send the password update to your API
    alert("Password updated successfully!")
  }

  const handleFileSelect = (file) => {
    // Check if file is an accepted type
    const acceptedTypes = ["image/jpeg", "image/png", "image/svg+xml"]
    if (!acceptedTypes.includes(file.type)) {
      alert("Please select a JPG, PNG, or SVG file.")
      return
    }

    // Check file size (optional)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert("File is too large. Please select a file under 5MB.")
      return
    }

    setSelectedFile(file)

    // Create a preview URL
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
      // In a real app, you would upload the file to your server
      // const formData = new FormData();
      // formData.append('image', selectedFile);
      // const response = await fetch('/api/profile/image', {
      //   method: 'POST',
      //   body: formData
      // });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success message
      alert("Profile image uploaded successfully!")

      // In a real app, you might get back the URL of the uploaded image
      // and update the profile data
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
  <SearchHeader />
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
              <label htmlFor="phone">Phone Number*</label>
              <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">email*</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
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
              <label htmlFor="profession">profession</label>
              <input type="text" id="profession" name="profession" value={formData.profession} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label htmlFor="field">civilStatus</label>
              <input type="text" id="civilStatus" name="civilStatus" value={formData.civilStatus} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="childsNumber">Number of registered children </label>
              <input
                type="text"
                id="childsNumber"
                name="childsNumber"
                value={formData.childsNumber}
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
              Save Changes
            </button>
          </div>
        </section>

        <hr className="section-divider" />

        {/* Profile Image Section */}
        <section className="profile-section">
          <h2 className="section-title">Profile image</h2>

          <div className="image-upload-container">
            <div
              className="upload-area"
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()

                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  const file = e.dataTransfer.files[0]
                  handleFileSelect(file)
                }
              }}
              onClick={() => document.getElementById("file-input").click()}
            >
              {selectedImage ? (
                <div className="image-preview-container">
                  <img src={selectedImage || "/placeholder.svg"} alt="Profile preview" className="image-preview" />
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage(null)
                      setSelectedFile(null)
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={24} />
                  <p>Drag And Drop Files Here Or Upload</p>
                  <p className="file-info">Accepted file types: JPG, SVG, PNG 120 x 120 (px)</p>
                </>
              )}
            </div>
            <input
              type="file"
              id="file-input"
              accept="image/jpeg,image/png,image/svg+xml"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileSelect(e.target.files[0])
                }
              }}
            />
            <button type="button" className="upload-button" onClick={handleImageUpload} disabled={!selectedFile}>
              Upload
            </button>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </section>
      </form>
    </div>
  )
}

export default ParentProfile

