const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Initialize Firebase if not already done (should be in a separate config file)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const bucket = admin.storage().bucket();

const uploadFile = async (file, folderPath) => {
  try {
    // Generate unique filename
    const fileExtension = path.extname(file.originalname);
    const fileName = `${folderPath}/${Date.now()}${fileExtension}`;

    // Upload to Firebase Storage
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Make file publicly readable
    await fileUpload.makePublic();

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return {
      url: publicUrl,
      fileName: fileName,
      mimeType: file.mimetype,
      size: file.size,
      uploadedAt: new Date(),
    };
  } catch (error) {
    console.error("Firebase upload error:", error);
    throw error;
  }
};

module.exports = { uploadFile };
