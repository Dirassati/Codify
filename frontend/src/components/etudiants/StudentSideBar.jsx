"use client"

import { useEffect, useState } from "react"
import "./StudentSidebar.css"
import HomeIcon from "@mui/icons-material/Home"
import GridViewIcon from "@mui/icons-material/GridView"
import PersonIcon from "@mui/icons-material/Person"
import NoteIcon from "@mui/icons-material/Note"
import LogoutIcon from "@mui/icons-material/Logout"
import SettingsIcon from "@mui/icons-material/Settings"
import { Link } from "react-router-dom"
import logo from "../../assets/images/logoo1.svg"

function StudentSidebar() {
  const [index, setIndex] = useState(1)

  useEffect(() => {
    setIndex(1)
  }, [])

  const menuItems = [
    { id: 1, label: "home", icon: <HomeIcon />, route: "home" },
    { id: 2, label: "Subjects", icon: <GridViewIcon />, route: "subjects" },
    { id: 3, label: "Profile", icon: <PersonIcon />, route: "profile" },
    { id: 4, label: "Notes", icon: <NoteIcon />, route: "notes" },
    { divider: true },
    { id: 5, label: "Log out", icon: <LogoutIcon />, route: "logout" },
    { id: 6, label: "Settings", icon: <SettingsIcon />, route: "settings" },
  ]

  return (
    <div className="student-sidebar">
      <div className="title">
        <img src={logo || "/placeholder.svg"} alt="Logo" />
        <h2>Dirassati</h2>
      </div>

      <div className="links">
        {menuItems.map((item, idx) =>
          item.divider ? (
            <hr key={`divider-${idx}`} />
          ) : (
            <Link
              key={item.id}
              to={item.route}
              onClick={() => setIndex(item.id)}
              className={`link ${index === item.id ? "clicked" : ""}`}
            >
              <div className="icon-wrapper">{item.icon}</div>
              <div className="name">{item.label}</div>
            </Link>
          )
        )}
      </div>
    </div>
  )
}

export default StudentSidebar
