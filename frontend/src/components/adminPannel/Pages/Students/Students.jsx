import React from 'react'
import Header from '../Header/Header'
import SearchBar from './SearchBar'
import AllStudents from './AllStudents'

function Students() {
  return (
    <div>
      <Header title="Students" />
      <SearchBar title="student" />
      <AllStudents />
    </div>
  )
}

export default Students