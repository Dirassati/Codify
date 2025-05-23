const { createAccount} = require("../services/accountService");
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
  
    // Reuse existing createAccount function
    return await createAccount(
      email,
      password,
      'enseignant',// Hardcoded role
      matricule, 
      {
        last_name,
        first_name,
        phone_number,
        address,
        gender,
        degree,
        field,
        level,
        employment_date
      },
      
    );
  };
  module.exports={addTeacher}