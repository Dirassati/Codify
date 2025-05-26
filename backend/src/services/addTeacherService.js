const { createAccount} = require("../services/accountService");
const { checkMatriculeExists } = require('../utils/dbValidators');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

const addTeacher = async (teacherData) => {
    const {
      email,
      password,
      matricule,
      last_name,
      first_name,
      phone_number,
      address,
      gender,
      degree,
      field,
      level,
      employment_date
    } = teacherData;

    // Validate matricule uniqueness
  const matriculeExists = await checkMatriculeExists(matricule);
  if (matriculeExists) {
    throw new Error('Matricule already exists');
  }

    // Process photo upload if exists
  let photoUrl = null;
  if (photo) {
    photoUrl = await uploadToCloudinary(photo); // Implement your file upload logic
  }


  
    // Reuse existing createAccount function
    return await createAccount(
      email,
      matricule,
      password,
      'enseignant',// Hardcoded role
      {
        last_name,
        first_name,
        phone_number,
        address,
        gender,
        degree,
        field,
        level,
        employment_date,
      }
      
    );
  };
  module.exports={addTeacher}