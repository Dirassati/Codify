const bcrypt = require('bcrypt');

// Generate a hash with the same parameters your app uses
bcrypt.hash('admin101', 10)
  .then(hash => {
    console.log('Generated Hash:', hash);
  });