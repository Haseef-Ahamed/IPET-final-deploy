const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const path = require("path");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
require('dotenv').config();

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

const verifyJWT = (req, res, next) => {
  // Log the incoming Authorization header
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    console.error("verifyJWT: No token provided in Authorization header");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Attach decoded admin info to the request
    next();
  } catch (error) {
    console.error("verifyJWT: Token verification failed", {
      error: error.message,
      token,
    });
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Helper function to upload file to Cloudinary
async function uploadToCloudinary(file, folder) {
  return new Promise((resolve, reject) => {
    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.data);

    const uploadStream = cloudinary.uploader.upload_stream({
      folder: folder,
      resource_type: 'auto'
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });

    bufferStream.pipe(uploadStream);
  });
}

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Create the `user_registration` table if it doesn't exist
const createUserRegistrationTableQuery = `
CREATE TABLE IF NOT EXISTS user_registration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  nameWithInitials VARCHAR(100) NOT NULL,
  nameDenoted VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  dob DATE NOT NULL,
  email VARCHAR(100) NOT NULL,
  nic VARCHAR(20) NOT NULL,
  passport VARCHAR(20),
  mobile VARCHAR(20) NOT NULL,
  mobileCode VARCHAR(10),
  homeTelCode VARCHAR(10),
  officeTelCode VARCHAR(10),
  homeFaxCode VARCHAR(10),
  officeFaxCode VARCHAR(10),
  homeTel VARCHAR(20),
  officeTel VARCHAR(20),
  homeFax VARCHAR(20),
  officeFax VARCHAR(20),
  workplace VARCHAR(255) NOT NULL,
  designation VARCHAR(255) NOT NULL,
  currentAddressLine1 VARCHAR(255) NOT NULL,
  currentAddressLine2 VARCHAR(255),
  currentCity VARCHAR(100) NOT NULL,
  currentProvince VARCHAR(100) NOT NULL,
  currentCountry VARCHAR(100) NOT NULL,
  officialAddressLine1 VARCHAR(255) NOT NULL,
  officialAddressLine2 VARCHAR(255),
  officialCity VARCHAR(100) NOT NULL,
  officialProvince VARCHAR(100) NOT NULL,
  officialCountry VARCHAR(100) NOT NULL,
  permanentAddressLine1 VARCHAR(255) NOT NULL,
  permanentAddressLine2 VARCHAR(255),
  permanentCity VARCHAR(100) NOT NULL,
  permanentProvince VARCHAR(100) NOT NULL,
  permanentCountry VARCHAR(100) NOT NULL,
  profile_picture_path VARCHAR(255),
  birth_certificate_path VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  examination VARCHAR(255),
  year VARCHAR(50),
  subjects JSON,
  credits JSON,
  is_al_completed BOOLEAN,
  period_of_study_from VARCHAR(50),
  period_of_study_to VARCHAR(50),
  institution_name VARCHAR(255),
  institution_type VARCHAR(255),
  qualifications JSON,
  al_certificate_path VARCHAR(255),
  higher_education_certificate_path VARCHAR(255),
  higher_education_institutes JSON,
  training_experience JSON,
  training_period_from VARCHAR(50),
  training_period_to VARCHAR(50),
  training_ongoing BOOLEAN,
  training_place_of_work VARCHAR(255),
  training_position_held VARCHAR(255),
  training_work_description TEXT,
  training_certificate_path VARCHAR(255),
  professional_memberships JSON,
  membership_number VARCHAR(50) UNIQUE,
  admin1status VARCHAR(20) DEFAULT 'pending',
  admin2status VARCHAR(20) DEFAULT 'pending',
  admin3status VARCHAR(20) DEFAULT 'pending',
  admin4status VARCHAR(20) DEFAULT 'pending',
  forwarded_admins JSON DEFAULT NULL,
  received_admins JSON DEFAULT NULL,
  resetToken VARCHAR(255),
  resetTokenExpiry DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

db.query(createUserRegistrationTableQuery, (err) => {
  if (err) {
    console.error("Error creating user_registration table:", err.message);
  } else {
    console.log("Table 'user_registration' created or already exists.");
  }
});

// Create the `events_courses` table if it doesn't exist
const createEventsCoursesTableQuery = `
CREATE TABLE IF NOT EXISTS events_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type ENUM('event', 'course') NOT NULL,
  main_image_url VARCHAR(255) NOT NULL,
  sub_images JSON,
  uploaded_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

db.query(createEventsCoursesTableQuery, (err) => {
  if (err) {
    console.error("Error creating events_courses table:", err.message);
  } else {
    console.log("Table 'events_courses' created or already exists.");
  }
});

app.post("/api/register/personal", async (req, res) => {
  const personalData = req.body;

  // Validate required fields
  if (
    !personalData.title ||
    !personalData.nameWithInitials ||
    !personalData.nameDenoted ||
    !personalData.lastName ||
    !personalData.gender ||
    !personalData.dob ||
    !personalData.email ||
    !personalData.nic ||
    !personalData.mobile ||
    !personalData.currentAddressLine1 ||
    !personalData.currentCity ||
    !personalData.currentProvince ||
    !personalData.currentCountry ||
    !personalData.permanentAddressLine1 ||
    !personalData.permanentCity ||
    !personalData.permanentProvince ||
    !personalData.permanentCountry ||
    !personalData.password
  ) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(personalData.password, 10);
    personalData.password = hashedPassword;

    // Insert personal data into the database
    const query = "INSERT INTO user_registration SET ?";
    db.query(query, personalData, (err, result) => {
      if (err) {
        console.error("Error saving personal info:", {
          message: err.message,
          code: err.code,
          errno: err.errno,
          sql: err.sql,
          sqlState: err.sqlState,
          sqlMessage: err.sqlMessage,
        });
        return res.status(500).json({ error: "Failed to save personal info.", details: err.message });
      }
      res.status(201).json({
        message: "Personal info saved successfully!",
        userId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Failed to process registration." });
  }
});

// API Endpoint for Admin Login
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.error("POST /api/admin/login: Missing username or password");
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    // Fetch admin credentials from the database
    const query = "SELECT * FROM admin_credentials WHERE username = ?";
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error("POST /api/admin/login: Error fetching admin credentials", err.message);
        return res.status(500).json({ error: "Failed to fetch admin credentials." });
      }

      if (results.length === 0) {
        console.error("POST /api/admin/login: No admin found for username", username);
        return res.status(401).json({ error: "Invalid username or password." });
      }

      const admin = results[0];

      // Compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        console.error("POST /api/admin/login: Invalid password for username", username);
        return res.status(401).json({ error: "Invalid username or password." });
      }

      // Generate JWT token
      const token = jwt.sign(
        { adminId: admin.id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Successful login
      res.status(200).json({
        success: true,
        message: "Login successful!",
        token: token,
        adminId: admin.id,
        username: admin.username,
      });
    });
  } catch (error) {
    console.error("POST /api/admin/login: Login error", error.message);
    res.status(500).json({ error: "Failed to process login." });
  }
});

// API Endpoint to Upload Profile Picture
app.post("/api/upload/profile-picture", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const file = req.files.file;
    const fileUrl = await uploadToCloudinary(file, 'profile-pictures');

    res.status(200).json({ filePath: fileUrl });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ error: "Failed to upload file." });
  }
});

// API Endpoint to Upload Birth Certificate
app.post("/api/upload/birth-certificate", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      console.error("No file uploaded in request.");
      return res.status(400).json({ error: "No file uploaded.", http_code: 400 });
    }

    const file = req.files.file;
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Validate file type
    if (!allowedTypes.includes(file.mimetype)) {
      console.error("Invalid file type:", file.mimetype);
      return res.status(400).json({ error: "Please upload PDF or Image files only (PDF, JPEG, PNG, JPG).", http_code: 400 });
    }

    // Validate file size
    if (file.size > maxSize) {
      console.error("File size exceeds limit:", file.size);
      return res.status(400).json({ error: "File size should be less than 5MB.", http_code: 400 });
    }

    // Validate file is not empty
    if (!file.data || file.data.length === 0) {
      console.error("Empty file buffer received:", file);
      return res.status(400).json({ error: "Empty file.", http_code: 400 });
    }

    const fileUrl = await uploadToCloudinary(file, "birth-certificates");
    res.status(200).json({ filePath: fileUrl });
  } catch (error) {
    console.error("Error uploading birth certificate:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Failed to upload file.", details: error.message });
  }
});

app.post("/api/register/academic", (req, res) => {
  const {
    id,
    examination,
    year,
    subjects,
    credits,
    higherEducationInstitutes,
    isAlCompleted,
    alCertificatePath,
  } = req.body;

  const query = `
    UPDATE user_registration 
    SET 
      examination = ?,
      year = ?,
      subjects = ?,
      credits = ?,
      higher_education_institutes = ?,
      is_al_completed = ?,
      al_certificate_path = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [
      examination,
      year,
      JSON.stringify(subjects),
      JSON.stringify(credits),
      JSON.stringify(higherEducationInstitutes),
      isAlCompleted,
      alCertificatePath,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error saving academic qualifications:", err.message);
        return res.status(500).json({ error: "Failed to save academic qualifications." });
      }

      // If no rows were affected, return a meaningful response
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "No user found with the given ID." });
      }

      res.status(201).json({ message: "Academic qualifications saved successfully!" });
    }
  );
});

// API Endpoint to Save Proposers' Data
app.post("/api/register/proposers", (req, res) => {
  const { userId, proposers } = req.body;

  // Validate required fields
  if (!userId || !proposers || proposers.length === 0) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  // Update the record with proposers' data
  const query = `
    UPDATE user_registration 
    SET 
      proposers = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [JSON.stringify(proposers), userId],
    (err, result) => {
      if (err) {
        console.error("Error saving proposers' data:", err.message);
        return res.status(500).json({ error: "Failed to save proposers' data." });
      }
      res.status(201).json({ message: "Proposers' data saved successfully!" });
    }
  );
});

// API Endpoint to Upload Training Certificate
// Upload Training Certificate Endpoint
app.post("/api/upload/training-certificate", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      console.error("No file uploaded in request.");
      return res.status(400).json({ error: "No file uploaded.", http_code: 400 });
    }

    const file = req.files.file;
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Validate file type
    if (!allowedTypes.includes(file.mimetype)) {
      console.error("Invalid file type:", file.mimetype);
      return res.status(400).json({ error: "Please upload PDF or Image files only (PDF, JPEG, PNG, JPG).", http_code: 400 });
    }

    // Validate file size
    if (file.size > maxSize) {
      console.error("File size exceeds limit:", file.size);
      return res.status(400).json({ error: "File size should be less than 5MB.", http_code: 400 });
    }

    // Validate file is not empty
    if (!file.data || file.data.length === 0) {
      console.error("Empty file buffer received:", file);
      return res.status(400).json({ error: "Empty file.", http_code: 400 });
    }

    const fileUrl = await uploadToCloudinary(file, "training-certificates");
    res.status(200).json({ filePath: fileUrl });
  } catch (error) {
    console.error("Error uploading training certificate:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Failed to upload file.", details: error.message });
  }
});

// API Endpoint to Save Training Experience
app.post("/api/register/training", (req, res) => {
  const { userId, trainingEntries } = req.body;

  // Validate required fields
  if (!userId || !trainingEntries || trainingEntries.length === 0) {
    return res.status(400).json({ error: "User ID and training entries are required." });
  }

  // Validate each training entry
  const missingFields = [];
  trainingEntries.forEach((entry, index) => {
    if (!entry.periodOfWorkFrom) missingFields.push(`periodOfWorkFrom-${index}`);
    if (!entry.periodOfWorkTo && !entry.ongoing) missingFields.push(`periodOfWorkTo-${index}`);
    if (!entry.placeOfWork) missingFields.push(`placeOfWork-${index}`);
    if (!entry.positionHeld) missingFields.push(`positionHeld-${index}`);
    if (!entry.workDescription) missingFields.push(`workDescription-${index}`);
    if (!entry.trainingCertificatePath) missingFields.push(`trainingCertificatePath-${index}`);
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing required fields.",
      missingFields: missingFields,
    });
  }

  // Prepare the training data to be saved as a JSON array
  const trainingData = trainingEntries.map((entry) => ({
    periodOfWorkFrom: entry.periodOfWorkFrom,
    periodOfWorkTo: entry.ongoing ? "Ongoing" : entry.periodOfWorkTo,
    ongoing: entry.ongoing,
    placeOfWork: entry.placeOfWork,
    positionHeld: entry.positionHeld,
    workDescription: entry.workDescription,
    trainingCertificatePath: entry.trainingCertificatePath,
  }));

  // Update the user's record with the training data
  const query = `
    UPDATE user_registration 
    SET 
      training_experience = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [JSON.stringify(trainingData), userId],
    (err, result) => {
      if (err) {
        console.error("Error saving training experience:", err.message);
        return res.status(500).json({ error: "Failed to save training experience." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      res.status(201).json({ message: "Training experience saved successfully!" });
    }
  );
});

// API Endpoint to Fetch All User Details
app.get("/api/user-details/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT * 
    FROM user_registration
    WHERE id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user details:", err.message);
      return res.status(500).json({ error: "Failed to fetch user details." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = results[0];

    // Parse the professional_memberships JSON array
    if (user.professional_memberships) {
      user.professional_memberships = JSON.parse(user.professional_memberships);
    }

    // Parse the training_experience JSON array
    if (user.training_experience) {
      user.training_experience = JSON.parse(user.training_experience);
    }

    res.status(200).json(user);
  });
});

// API Endpoint to Fetch All User Details
app.get("/api/user-details", (req, res) => {
  // Query to fetch all user details
  const query = `
    SELECT * 
    FROM user_registration
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching user details:", err.message);
      return res.status(500).json({ error: "Failed to fetch user details." });
    }

    // Check if any users were found
    if (results.length === 0) {
      return res.status(404).json({ error: "No users found." });
    }

    // Return all user details
    res.status(200).json(results);
  });
});

// API Endpoint to Upload Membership Certificate
app.post("/api/upload/membership-certificate", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const file = req.files.file;
    const fileUrl = await uploadToCloudinary(file, 'membership-certificates');

    res.status(200).json({ filePath: fileUrl });
  } catch (error) {
    console.error("Error uploading membership certificate:", error);
    res.status(500).json({ error: "Failed to upload file." });
  }
});

app.post("/api/register/professional-membership", (req, res) => {
  const { userId, professionalMemberships } = req.body;

  // Validate required fields
  if (!userId || !professionalMemberships || professionalMemberships.length === 0) {
    return res.status(400).json({ error: "User ID and professional memberships are required." });
  }

  // Validate each professional membership entry
  const missingFields = [];
  professionalMemberships.forEach((entry, index) => {
    if (!entry.institution) missingFields.push(`institution-${index}`);
    if (!entry.membershipNumber) missingFields.push(`membershipNumber-${index}`);
    if (!entry.joinedYear) missingFields.push(`joinedYear-${index}`);
    if (!entry.certificatePath) missingFields.push(`certificatePath-${index}`);
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing required fields.",
      missingFields: missingFields,
    });
  }

  // Update only the professional_memberships field
  const query = `
    UPDATE user_registration 
    SET 
      professional_memberships = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [JSON.stringify(professionalMemberships), userId],
    (err, result) => {
      if (err) {
        console.error("Error saving professional memberships:", err.message);
        return res.status(500).json({ error: "Failed to save professional memberships." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      res.status(201).json({ message: "Professional memberships saved successfully!" });
    }
  );
});

// API Endpoint to Upload Membership Certificate (Alternative Endpoint)
app.post("/api/membership_upload", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const file = req.files.file;
    const fileUrl = await uploadToCloudinary(file, 'membership-certificates');

    // Return the blob URL to the frontend
    res.status(200).json({ filePath: fileUrl });
  } catch (error) {
    console.error("Error uploading membership certificate:", error);
    res.status(500).json({ error: "Failed to upload file." });
  }
});

// API Endpoint to Approve a User
app.post("/api/approve-user", (req, res) => {
  const { userId, ...statusUpdates } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const updates = Object.keys(statusUpdates).map((key) => `${key} = ?`).join(", ");
  const params = Object.values(statusUpdates);
  params.push(userId);

  const query = `
    UPDATE user_registration 
    SET ${updates}
    WHERE id = ?
  `;

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error approving user:", err.message);
      return res.status(500).json({ error: "Failed to approve user." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User approved successfully!" });
  });
});

// API Endpoint to Fetch Pending Users (excluding rejected status)
app.get("/api/pending-users", (req, res) => {
  const query = `
    SELECT 
      id AS idNo,
      nameWithInitials AS name,
      email AS emailAddress,
      nic AS nicNo,
      dob,
      admin1status,
      admin2status,
      admin3status,
      admin4status
    FROM user_registration
    WHERE 
      (admin1status = 'pending' OR 
       admin2status = 'pending' OR 
       admin3status = 'pending' OR 
       admin4status = 'pending') AND
      admin1status != 'rejected' AND
      admin2status != 'rejected' AND
      admin3status != 'rejected' AND
      admin4status != 'rejected'
  `;

  // Apply JWT middleware to all admin routes
  app.use('/api/admin', verifyJWT); // Protect all routes under /api/admin

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching pending users:", err.message);
      return res.status(500).json({ error: "Failed to fetch pending users." });
    }
    res.status(200).json(results);
  });
});

// Backend API for rejecting a user
app.post("/api/reject-user", (req, res) => {
  const { userId, ...statusUpdates } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const updates = Object.keys(statusUpdates).map((key) => `${key} = ?`).join(", ");
  const params = Object.values(statusUpdates);
  params.push(userId);

  const query = `
    UPDATE user_registration 
    SET ${updates}
    WHERE id = ?
  `;

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error rejecting user:", err.message);
      return res.status(500).json({ error: "Failed to reject user." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User rejected successfully!" });
  });
});

app.post("/api/forward-form", (req, res) => {
  const { userId, forwardedAdminId, currentAdminId } = req.body;

  // Validate required fields and ensure they are strings
  if (
    !userId ||
    !forwardedAdminId ||
    typeof forwardedAdminId !== "string" ||
    !currentAdminId ||
    typeof currentAdminId !== "string"
  ) {
    return res.status(400).json({ error: "User ID, forwarded admin username, and current admin username are required as strings." });
  }

  // Convert userId to integer
  const userIdInt = parseInt(userId);
  if (isNaN(userIdInt) || userIdInt <= 0) {
    return res.status(400).json({ error: "User ID must be a valid positive integer." });
  }

  // Validate admin usernames (optional: add regex to ensure format like "adminX")
  if (!forwardedAdminId.startsWith("admin") || !currentAdminId.startsWith("admin")) {
    return res.status(400).json({ error: "Admin usernames must start with 'admin'." });
  }

  // Fetch the current forwarded and received admins
  const fetchQuery = `
    SELECT forwarded_admins, received_admins 
    FROM user_registration 
    WHERE id = ?
  `;

  db.query(fetchQuery, [userIdInt], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err.message);
      return res.status(500).json({ error: "Failed to fetch user data." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = results[0];

    // Parse the existing forwarded and received admins (handle null)
    let forwardedAdmins = user.forwarded_admins ? JSON.parse(user.forwarded_admins) : [];
    let receivedAdmins = user.received_admins ? JSON.parse(user.received_admins) : [];

    // Ensure no null values in arrays
    forwardedAdmins = forwardedAdmins.filter((id) => id !== null && id !== undefined);
    receivedAdmins = receivedAdmins.filter((id) => id !== null && id !== undefined);

    // Add the current admin to the forwarded admins list
    if (!forwardedAdmins.includes(currentAdminId)) {
      forwardedAdmins.push(currentAdminId);
    }

    // Add the forwarded admin to the received admins list
    if (!receivedAdmins.includes(forwardedAdminId)) {
      receivedAdmins.push(forwardedAdminId);
    }

    // Update the user record with the new forwarded and received admins
    const updateQuery = `
      UPDATE user_registration 
      SET 
        forwarded_admins = ?,
        received_admins = ?
      WHERE id = ?
    `;

    db.query(
      updateQuery,
      [JSON.stringify(forwardedAdmins), JSON.stringify(receivedAdmins), userIdInt],
      (err, result) => {
        if (err) {
          console.error("Error updating forwarded and received admins:", err.message);
          return res.status(500).json({ error: "Failed to forward the form." });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ message: "Form forwarded successfully!" });
      }
    );
  });
});

// API Endpoint to Fetch Forwarded and Received Admins
app.get("/api/user-admins/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT forwarded_admins, received_admins 
    FROM user_registration 
    WHERE id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching forwarded and received admins:", err.message);
      return res.status(500).json({ error: "Failed to fetch admins data." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = results[0];

    // Parse the forwarded and received admins JSON arrays
    if (user.forwarded_admins) {
      user.forwarded_admins = JSON.parse(user.forwarded_admins);
    }
    if (user.received_admins) {
      user.received_admins = JSON.parse(user.received_admins);
    }

    res.status(200).json(user);
  });
});

// Create the `admin_registration` table if it doesn't exist
const createAdminRegistrationTableQuery = `
CREATE TABLE IF NOT EXISTS admin_registration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  nameWithInitials VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  dob DATE NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  nic VARCHAR(20) NOT NULL UNIQUE,
  mobile VARCHAR(20) NOT NULL,
  mobileCode VARCHAR(10),
  address VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

db.query(createAdminRegistrationTableQuery, (err) => {
  if (err) {
    console.error("Error creating admin_registration table:", err.message);
  } else {
    console.log("Table 'admin_registration' created or already exists.");
  }
});

// API Endpoint for Admin Registration
app.post("/api/admin/register", async (req, res) => {
  const adminData = req.body;

  // Validate required fields
  if (
    !adminData.title ||
    !adminData.nameWithInitials ||
    !adminData.lastName ||
    !adminData.gender ||
    !adminData.dob ||
    !adminData.email ||
    !adminData.nic ||
    !adminData.mobile ||
    !adminData.address ||
    !adminData.password
  ) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    adminData.password = hashedPassword;

    // Insert admin data into the database
    const query = "INSERT INTO admin_registration SET ?";
    db.query(query, adminData, (err, result) => {
      if (err) {
        console.error("Error saving admin info:", err.message);
        return res.status(500).json({ error: "Failed to save admin info." });
      }
      res.status(201).json({
        message: "Admin registration successful!",
        adminId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Failed to process admin registration." });
  }
});

// Create the `admin_credentials` table if it doesn't exist
const createAdminCredentialsTableQuery = `
CREATE TABLE IF NOT EXISTS admin_credentials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  resetToken VARCHAR(255),
  resetTokenExpiry DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

db.query(createAdminCredentialsTableQuery, (err) => {
  if (err) {
    console.error("Error creating admin_credentials table:", err.message);
  } else {
    console.log("Table 'admin_credentials' created or already exists.");

    // Define admin records to insert
    const admins = [
      { username: 'admin1', password: 'Admin@1234', email: 'admin1@ipet.lk' },
      { username: 'admin2', password: 'Admin@1234', email: 'admin2@ipet.lk' },
      { username: 'admin3', password: 'Admin@1234', email: 'admin3@ipet.lk' },
      { username: 'admin4', password: 'Admin@1234', email: 'admin4@ipet.lk' },
    ];

    // Function to insert admin records
    const insertAdminRecords = async () => {
      for (const admin of admins) {
        try {
          // Hash the password
          const hashedPassword = await bcrypt.hash(admin.password, 10);

          // Check if the admin already exists
          const checkQuery = `SELECT id FROM admin_credentials WHERE username = ? OR email = ?`;
          db.query(checkQuery, [admin.username, admin.email], (err, results) => {
            if (err) {
              console.error(`Error checking for admin ${admin.username}:`, err.message);
              return;
            }

            if (results.length > 0) {
              console.log(`Admin ${admin.username} already exists, skipping insertion.`);
              return;
            }

            // Insert the admin record
            const insertQuery = `
              INSERT INTO admin_credentials (username, password, email)
              VALUES (?, ?, ?)
            `;
            db.query(insertQuery, [admin.username, hashedPassword, admin.email], (err, result) => {
              if (err) {
                console.error(`Error inserting admin ${admin.username}:`, err.message);
              } else {
                console.log(`Admin ${admin.username} inserted successfully with ID: ${result.insertId}`);
              }
            });
          });
        } catch (error) {
          console.error(`Error hashing password for ${admin.username}:`, error.message);
        }
      }
    };

    // Execute the insertion
    insertAdminRecords();
  }
});

// API Endpoint for User Login (using membership number)
app.post("/api/user/login", async (req, res) => {
  const { membershipNumber, password } = req.body;

  if (!membershipNumber || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Membership number and password are required." });
  }

  try {
    const query = "SELECT * FROM user_registration WHERE membership_number = ?";
    db.query(query, [membershipNumber], async (err, results) => {
      if (err) {
        console.error("Error fetching user details:", err.message);
        return res
          .status(500)
          .json({ success: false, error: "Failed to fetch user details." });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid membership number or password." });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid membership number or password." });
      }

      // ✅ Successful login
      return res.status(200).json({
        success: true,
        message: "Login successful!",
        userId: user.id,
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
});


// Helper function to update the user record
function updateUserRecord(userId, updatedData, res) {
  const query = `
    UPDATE user_registration 
    SET ?
    WHERE id = ?
  `;

  db.query(query, [updatedData, userId], (err, result) => {
    if (err) {
      console.error("Error updating user:", err.message);
      return res.status(500).json({ error: "Failed to update user." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully!" });
  });
}

// API Endpoint to Update User Information
app.put("/api/update-user/:userId", (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  // Validate required fields
  if (
    !updatedData.title ||
    !updatedData.nameWithInitials ||
    !updatedData.nameDenoted ||
    !updatedData.lastName ||
    !updatedData.gender ||
    !updatedData.dob ||
    !updatedData.email ||
    !updatedData.nic ||
    !updatedData.mobile ||
    !updatedData.workplace ||
    !updatedData.designation ||
    !updatedData.currentAddressLine1 ||
    !updatedData.currentCity ||
    !updatedData.currentProvince ||
    !updatedData.currentCountry ||
    !updatedData.officialAddressLine1 ||
    !updatedData.officialCity ||
    !updatedData.officialProvince ||
    !updatedData.officialCountry ||
    !updatedData.permanentAddressLine1 ||
    !updatedData.permanentCity ||
    !updatedData.permanentProvince ||
    !updatedData.permanentCountry
  ) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  // Update the user record in the database
  const query = `
    UPDATE user_registration 
    SET 
      title = ?,
      nameWithInitials = ?,
      nameDenoted = ?,
      lastName = ?,
      gender = ?,
      dob = ?,
      email = ?,
      nic = ?,
      passport = ?,
      mobile = ?,
      mobileCode = ?,
      homeTelCode = ?,
      officeTelCode = ?,
      homeFaxCode = ?,
      officeFaxCode = ?,
      homeTel = ?,
      officeTel = ?,
      homeFax = ?,
      officeFax = ?,
      workplace = ?,
      designation = ?,
      currentAddressLine1 = ?,
      currentAddressLine2 = ?,
      currentCity = ?,
      currentProvince = ?,
      currentCountry = ?,
      officialAddressLine1 = ?,
      officialAddressLine2 = ?,
      officialCity = ?,
      officialProvince = ?,
      officialCountry = ?,
      permanentAddressLine1 = ?,
      permanentAddressLine2 = ?,
      permanentCity = ?,
      permanentProvince = ?,
      permanentCountry = ?,
      profile_picture_path = ?,
      birth_certificate_path = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [
      updatedData.title,
      updatedData.nameWithInitials,
      updatedData.nameDenoted,
      updatedData.lastName,
      updatedData.gender,
      updatedData.dob,
      updatedData.email,
      updatedData.nic,
      updatedData.passport,
      updatedData.mobile,
      updatedData.mobileCode,
      updatedData.homeTelCode,
      updatedData.officeTelCode,
      updatedData.homeFaxCode,
      updatedData.officeFaxCode,
      updatedData.homeTel,
      updatedData.officeTel,
      updatedData.homeFax,
      updatedData.officeFax,
      updatedData.workplace,
      updatedData.designation,
      updatedData.currentAddressLine1,
      updatedData.currentAddressLine2,
      updatedData.currentCity,
      updatedData.currentProvince,
      updatedData.currentCountry,
      updatedData.officialAddressLine1,
      updatedData.officialAddressLine2,
      updatedData.officialCity,
      updatedData.officialProvince,
      updatedData.officialCountry,
      updatedData.permanentAddressLine1,
      updatedData.permanentAddressLine2,
      updatedData.permanentCity,
      updatedData.permanentProvince,
      updatedData.permanentCountry,
      updatedData.profile_picture_path,
      updatedData.birth_certificate_path,
      userId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating user information:", err.message);
        return res.status(500).json({ error: "Failed to update user information." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      res.status(200).json({ message: "User updated successfully!" });
    }
  );
});

// API Endpoint for Forgot Password
app.post("/api/user/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    // Check if the user exists
    const query = "SELECT * FROM user_registration WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Error fetching user:", err.message);
        return res.status(500).json({ error: "Failed to process request." });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      const user = results[0];

      // Generate a reset token
      const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Set the reset token and expiry time in the database
      const updateQuery = `
        UPDATE user_registration 
        SET 
          resetToken = ?,
          resetTokenExpiry = DATE_ADD(NOW(), INTERVAL 1 HOUR)
        WHERE id = ?
      `;

      db.query(updateQuery, [resetToken, user.id], (err) => {
        if (err) {
          console.error("Error updating reset token:", err.message);
          return res.status(500).json({ error: "Failed to process request." });
        }

        // Send the reset link to the user's email
        const resetLink = `http://www.ipet.lk/reset-password/${resetToken}`;
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Password Reset Request",
          html: `
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link will expire in 1 hour.</p>
          `,
        };

        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            console.error("Error sending email:", err.message);
            return res.status(500).json({ error: "Failed to send reset email." });
          }

          res.status(200).json({
            success: true,
            message: "Password reset link sent to your email."
          });
        });
      });
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
});

// API Endpoint for Reset Password
app.post("/api/user/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Check if the token is valid and not expired
    const query = `
      SELECT * FROM user_registration 
      WHERE id = ? 
        AND resetToken = ? 
    `;

    db.query(query, [userId, token], async (err, results) => {
      if (err) {
        console.error("Error fetching user:", err.message);
        return res.status(500).json({ error: "Failed to process request." });
      }

      if (results.length === 0) {
        console.log("Invalid or expired token for user ID:", userId);
        return res.status(400).json({ error: "Invalid or expired token. 3" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password and clear the reset token
      const updateQuery = `
        UPDATE user_registration 
        SET 
          password = ?,
          resetToken = NULL,
          resetTokenExpiry = NULL
        WHERE id = ?
      `;
      db.query(updateQuery, [hashedPassword, userId], (err) => {
        if (err) {
          console.error("Error updating password:", err.message);
          return res.status(500).json({ error: "Failed to update password." });
        }

        res.status(200).json({
          success: true,
          message: "Password reset successfully!"
        });
      });
    });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(400).json({ error: "Invalid or expired token. 2" });
  }
});

// API Endpoint for Admin Forgot Password
app.post("/api/admin/forgot-password", async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required." });
  }

  try {
    // Fetch admin details from the database
    const query = "SELECT * FROM admin_credentials WHERE username = ?";
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error("Error fetching admin details:", err.message);
        return res.status(500).json({ error: "Failed to process request." });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Admin not found." });
      }

      const admin = results[0];

      // ✅ Check if the email is already used by another admin
      const emailCheckQuery = `
        SELECT * FROM admin_credentials 
        WHERE email = ? AND id != ?
      `;
      db.query(emailCheckQuery, [email, admin.id], (err, emailResults) => {
        if (err) {
          console.error("Error checking duplicate email:", err.message);
          return res.status(500).json({ error: "Failed to process request." });
        }

        if (emailResults.length > 0) {
          // ✅ Send message to frontend if email already exists
          return res.status(400).json({ error: "Email already in use by another admin." });
        }

        // ✅ Update the admin's email
        const updateEmailQuery = `
          UPDATE admin_credentials 
          SET email = ? 
          WHERE id = ?
        `;
        db.query(updateEmailQuery, [email, admin.id], (err, updateResult) => {
          if (err) {
            console.error("Error updating admin email:", err.message);
            return res.status(500).json({ error: "Failed to update email." });
          }

          // Generate reset token
          const resetToken = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          // Store token in DB
          const updateTokenQuery = `
            UPDATE admin_credentials 
            SET resetToken = ?, resetTokenExpiry = DATE_ADD(NOW(), INTERVAL 1 HOUR)
            WHERE id = ?
          `;
          db.query(updateTokenQuery, [resetToken, admin.id], (err) => {
            if (err) {
              console.error("Error updating reset token:", err.message);
              return res.status(500).json({ error: "Failed to process request." });
            }

            // Send reset email
            const resetLink = `http://localhost:5173/admin-reset-password/${resetToken}`;
            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: "Password Reset Request",
              html: `
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link will expire in 1 hour.</p>
              `,
            };

            transporter.sendMail(mailOptions, (err) => {
              if (err) {
                console.error("Error sending email:", err.message);
                return res.status(500).json({ error: "Failed to send reset email." });
              }

              res.status(200).json({
                success: true,
                message: "Password reset link sent to your email.",
              });
            });
          });
        });
      });
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
});


// API Endpoint for Admin Reset Password
app.post("/api/admin/reset-password", async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Token and password are required." });
  }

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = decoded.adminId;

    // Fetch admin details from the database
    const query = "SELECT * FROM admin_credentials WHERE id = ? AND resetToken = ? AND resetTokenExpiry > NOW()";

    db.query(query, [adminId, token], async (err, results) => {
      if (err) {
        console.error("Error fetching admin details:", err.message);
        return res.status(500).json({ error: "Failed to process request." });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: "Invalid or expired token. 1" });
      }

      const admin = results[0];

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the password and clear the reset token
      const updateQuery = `
        UPDATE admin_credentials 
        SET 
          password = ?,
          resetToken = NULL,
          resetTokenExpiry = NULL
        WHERE id = ?
      `;
      db.query(updateQuery, [hashedPassword, adminId], (err) => {
        if (err) {
          console.error("Error updating password:", err.message);
          return res.status(500).json({ error: "Failed to reset password." });
        }

        res.status(200).json({ success: true, message: "Password reset successfully." });
      });
    });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
});

// Endpoint to serve profile pictures
app.get('/api/profile-picture/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    // Fetch user from the database
    const query = "SELECT profile_picture_path FROM user_registration WHERE id = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching profile picture:", err.message);
        return res.status(500).json({ error: "Failed to fetch profile picture." });
      }

      if (results.length === 0 || !results[0].profile_picture_path) {
        return res.status(404).json({ error: "Profile picture not found." });
      }

      const profilePictureUrl = results[0].profile_picture_path;

      // If the profile picture is stored in a cloud service (e.g., Vercel Blob), redirect to the URL
      if (profilePictureUrl.startsWith('http')) {
        return res.redirect(profilePictureUrl);
      }

      // If the profile picture is stored locally, serve the file
      const filePath = path.join(__dirname, 'Uploads', profilePictureUrl);
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error("Error serving profile picture:", err.message);
          res.status(500).json({ error: "Failed to serve profile picture." });
        }
      });
    });
  } catch (error) {
    console.error("Error in profile picture endpoint:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get('/api/download-birth-certificate/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId
    if (!userId || isNaN(userId)) {
      console.error('Invalid user ID:', userId);
      return res.status(400).json({ error: 'Invalid user ID.' });
    }

    // Fetch user from the database
    const query = 'SELECT birth_certificate_path FROM user_registration WHERE id = ?';
    const formattedQuery = db.format(query, [userId]);

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching birth certificate:', err.message);
        return res.status(500).json({
          error: 'Failed to fetch birth certificate.',
          details: err.message,
        });
      }

      if (results.length === 0 || !results[0].birth_certificate_path) {
        console.error('Birth certificate not found for userId:', userId);
        return res.status(404).json({ error: 'Birth certificate not found in database.' });
      }

      const certificateUrl = results[0].birth_certificate_path;

      // If the certificate is stored in a cloud service (e.g., Cloudinary), fetch and stream
      if (certificateUrl.startsWith('https')) {
        axios({
          url: certificateUrl,
          method: 'GET',
          responseType: 'stream',
        })
          .then((response) => {
            // Set headers for file download
            res.setHeader('Content-Disposition', `attachment; filename="birth_certificate_${userId}.pdf"`);
            res.setHeader('Content-Type', response.headers['content-type'] || 'application/pdf');
            response.data.pipe(res);
          })
          .catch((error) => {
            console.error('Error fetching Cloudinary file:', error.message);
            res.status(500).json({
              error: 'Failed to download birth certificate from cloud.',
              details: error.message,
            });
          });
        return;
      }

      // If the certificate is stored locally, serve the file
      const filePath = path.join(__dirname, 'Uploads', certificateUrl);

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        console.error('File does not exist at:', filePath);
        return res.status(404).json({
          error: 'Birth certificate file not found on server.',
          details: `File path: ${filePath}`,
        });
      }

      // Serve the file for download
      const fileName = `birth_certificate_${userId}_${path.basename(certificateUrl)}`;
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error('Error downloading birth certificate:', err.message);
          return res.status(500).json({
            error: 'Failed to download birth certificate.',
            details: err.message,
          });
        }
      });
    });
  } catch (error) {
    console.error('Error in birth certificate endpoint:', error);
    res.status(500).json({
      error: 'Internal server error.',
      details: error.message,
    });
  }
});

// API Endpoint to Download A/L Certificate
app.get('/api/download-al-certificate/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId
    if (!userId || isNaN(userId)) {
      console.error('Invalid user ID:', userId);
      return res.status(400).json({ error: 'Invalid user ID.' });
    }

    // Fetch user from the database
    const query = 'SELECT al_certificate_path FROM user_registration WHERE id = ?';
    const formattedQuery = db.format(query, [userId]);

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching A/L certificate:', err.message);
        return res.status(500).json({
          error: 'Failed to fetch A/L certificate.',
          details: err.message,
        });
      }

      if (results.length === 0 || !results[0].al_certificate_path) {
        console.error('A/L certificate not found for userId:', userId);
        return res.status(404).json({ error: 'A/L certificate not found in database.' });
      }

      const certificateUrl = results[0].al_certificate_path;

      // Fetch and stream the file from Cloudinary
      if (certificateUrl.startsWith('https')) {
        axios({
          url: certificateUrl,
          method: 'GET',
          responseType: 'stream',
        })
          .then((response) => {
            // Set headers for file download
            const fileName = `al_certificate_${userId}.pdf`;
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.setHeader('Content-Type', response.headers['content-type'] || 'application/pdf');
            response.data.pipe(res);
          })
          .catch((error) => {
            console.error('Error fetching Cloudinary file:', error.message);
            res.status(500).json({
              error: 'Failed to download A/L certificate from cloud.',
              details: error.message,
            });
          });
        return;
      }

      // Fallback for local files (if applicable, not used with Cloudinary)
      const filePath = path.join(__dirname, 'Uploads', certificateUrl);

      if (!fs.existsSync(filePath)) {
        console.error('File does not exist at:', filePath);
        return res.status(404).json({
          error: 'A/L certificate file not found on server.',
          details: `File path: ${filePath}`,
        });
      }

      res.download(filePath, `al_certificate_${userId}_${path.basename(certificateUrl)}`, (err) => {
        if (err) {
          console.error('Error downloading A/L certificate:', err.message);
          return res.status(500).json({
            error: 'Failed to download A/L certificate.',
            details: err.message,
          });
        }
      });
    });
  } catch (error) {
    console.error('Error in A/L certificate endpoint:', error);
    res.status(500).json({
      error: 'Internal server error.',
      details: error.message,
    });
  }
});

// API Endpoint to Download Higher Education Certificate
app.get('/api/download-higher-education-certificate/:userId/:instituteIndex', async (req, res) => {
  try {
    const { userId, instituteIndex } = req.params;

    // Validate inputs
    if (!userId || isNaN(userId) || !instituteIndex || isNaN(instituteIndex)) {
      console.error('Invalid user ID or institute index:', { userId, instituteIndex });
      return res.status(400).json({ error: 'Invalid user ID or institute index.' });
    }

    // Fetch user from the database
    const query = 'SELECT higher_education_institutes FROM user_registration WHERE id = ?';
    const formattedQuery = db.format(query, [userId]);

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching higher education institutes:', err.message);
        return res.status(500).json({
          error: 'Failed to fetch higher education institutes.',
          details: err.message,
        });
      }

      if (results.length === 0 || !results[0].higher_education_institutes) {
        console.error('Higher education institutes not found for userId:', userId);
        return res.status(404).json({ error: 'Higher education institutes not found in database.' });
      }

      // Parse JSON field
      const institutes = JSON.parse(results[0].higher_education_institutes);
      const certificateUrl = institutes[instituteIndex]?.certificatePath;

      if (!certificateUrl) {
        console.error('Certificate not found for institute index:', instituteIndex);
        return res.status(404).json({ error: 'Higher education certificate not found.' });
      }

      // Fetch and stream the file from Cloudinary
      if (certificateUrl.startsWith('https')) {
        axios({
          url: certificateUrl,
          method: 'GET',
          responseType: 'stream',
        })
          .then((response) => {
            // Set headers for file download
            const fileName = `higher_education_certificate_${userId}_${instituteIndex}.pdf`;
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.setHeader('Content-Type', response.headers['content-type'] || 'application/pdf');
            response.data.pipe(res);
          })
          .catch((error) => {
            console.error('Error fetching Cloudinary file:', error.message);
            res.status(500).json({
              error: 'Failed to download higher education certificate from cloud.',
              details: error.message,
            });
          });
        return;
      }

      // Fallback for local files (if applicable, not used with Cloudinary)
      const filePath = path.join(__dirname, 'Uploads', certificateUrl);

      if (!fs.existsSync(filePath)) {
        console.error('File does not exist at:', filePath);
        return res.status(404).json({
          error: 'Higher education certificate file not found on server.',
          details: `File path: ${filePath}`,
        });
      }

      res.download(filePath, `higher_education_certificate_${userId}_${instituteIndex}_${path.basename(certificateUrl)}`, (err) => {
        if (err) {
          console.error('Error downloading higher education certificate:', err.message);
          return res.status(500).json({
            error: 'Failed to download higher education certificate.',
            details: err.message,
          });
        }
      });
    });
  } catch (error) {
    console.error('Error in higher education certificate endpoint:', error);
    res.status(500).json({
      error: 'Internal server error.',
      details: error.message,
    });
  }
});

// API Endpoint to Upload AL Certificate
app.post("/api/upload/al-certificate", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const file = req.files.file;
    const fileUrl = await uploadToCloudinary(file, 'al-certificates');

    res.status(200).json({ filePath: fileUrl });
  } catch (error) {
    console.error("Error uploading AL certificate:", error);
    res.status(500).json({ error: "Failed to upload file." });
  }
});

// API Endpoint to Upload Higher Education Certificate
app.post("/api/upload/higher-education-certificate", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const file = req.files.file;
    const fileUrl = await uploadToCloudinary(file, 'higher-education-certificates');

    res.status(200).json({ filePath: fileUrl });
  } catch (error) {
    console.error("Error uploading higher education certificate:", error);
    res.status(500).json({ error: "Failed to upload file." });
  }
});

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { inquiryType, name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    // SQL query to insert data into the contact_submissions table
    const sql = `
      INSERT INTO contact_submissions (inquiry_type, name, email, phone, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Execute the query with parameters
    db.query(sql, [inquiryType || null, name, email, phone || null, message], (err, result) => {
      if (err) {
        console.error('Error saving contact submission to database:', err.message);
        return res.status(500).json({ success: false, message: 'Failed to save contact submission.' });
      }

      // Email options - set the from as the user's email
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: 'info@ipet.lk',
        subject: `New Contact Inquiry: ${inquiryType || 'General Inquiry'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Inquiry Type:</strong> ${inquiryType || 'Not specified'}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        `
      };

      // Send email
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error('Error sending email:', err.message);
          return res.status(500).json({ success: false, message: 'Failed to send email.' });
        }

        res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
      });
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    res.status(500).json({ success: false, message: 'Failed to process your submission. Please try again later.' });
  }
});

// API endpoint to add new event or course
app.post("/api/events-courses", async (req, res) => {
  if (!req.files || !req.files.mainImage) {
    return res.status(400).json({ error: "Main image is required." });
  }

  try {
    const { title, description, type, uploadedDate } = req.body;

    // Validate required fields
    if (!title || !description || !type || !uploadedDate) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // Upload main image to Vercel Blob
    const mainImageUrl = await uploadToCloudinary(req.files.mainImage, 'events-courses');

    // Handle sub images if they exist
    let subImagesUrls = [];
    if (req.files.subImages) {
      // If single file, convert to array
      const subImagesFiles = Array.isArray(req.files.subImages)
        ? req.files.subImages
        : [req.files.subImages];

      // Upload each sub image
      for (const file of subImagesFiles) {
        const imageUrl = await uploadToCloudinary(file, 'events-courses');
        subImagesUrls.push(imageUrl);
      }
    }

    // Insert data into database
    const query = `
      INSERT INTO events_courses 
      (title, description, type, main_image_url, sub_images, uploaded_date) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        title,
        description,
        type,
        mainImageUrl,
        JSON.stringify(subImagesUrls),
        uploadedDate
      ],
      (err, result) => {
        if (err) {
          console.error("Error saving event/course:", err.message);
          return res.status(500).json({ error: "Failed to save event/course details." });
        }

        res.status(201).json({
          message: `${type === 'event' ? 'Event' : 'Course'} added successfully!`,
          id: result.insertId,
          mainImageUrl,
          subImagesUrls
        });
      }
    );
  } catch (error) {
    console.error("Error processing event/course submission:", error);
    res.status(500).json({ error: "Failed to process submission." });
  }
});

// API endpoint to get all events and courses
app.get("/api/events-courses", (req, res) => {
  const query = "SELECT * FROM events_courses ORDER BY uploaded_date DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching events/courses:", err.message);
      return res.status(500).json({ error: "Failed to fetch events/courses." });
    }

    // Parse JSON fields
    const formattedResults = results.map(item => ({
      ...item,
      sub_images: JSON.parse(item.sub_images || '[]')
    }));

    res.status(200).json(formattedResults);
  });
});

// API endpoint to get events and courses by type
app.get("/api/events-courses/:type", (req, res) => {
  const { type } = req.params;

  if (type !== 'event' && type !== 'course') {
    return res.status(400).json({ error: "Invalid type. Type must be 'event' or 'course'." });
  }

  const query = "SELECT * FROM events_courses WHERE type = ? ORDER BY uploaded_date DESC";

  db.query(query, [type], (err, results) => {
    if (err) {
      console.error(`Error fetching ${type}s:`, err.message);
      return res.status(500).json({ error: `Failed to fetch ${type}s.` });
    }

    // Parse JSON fields
    const formattedResults = results.map(item => ({
      ...item,
      sub_images: JSON.parse(item.sub_images || '[]')
    }));

    res.status(200).json(formattedResults);
  });
});

app.put("/api/events-courses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, type, uploadedDate } = req.body;

  try {
    // Validate required fields
    if (!title || !description || !type || !uploadedDate) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // Initialize variables for image URLs
    let mainImageUrl = null;
    let subImagesUrls = [];
    let updateQuery = "";
    let queryParams = [];

    // Check if main image is being updated
    if (req.files && req.files.mainImage) {
      // Upload new main image to Vercel Blob
      mainImageUrl = await uploadToCloudinary(req.files.mainImage, 'events-courses');
    }

    // Process existing and removed sub-images
    let finalSubImages = [];

    // Check if we have existing sub-images from the request
    if (req.body.existingSubImages) {
      try {
        const existingSubImages = JSON.parse(req.body.existingSubImages);
        if (Array.isArray(existingSubImages)) {
          finalSubImages = [...existingSubImages];
        }
      } catch (error) {
        console.error("Error parsing existingSubImages:", error);
      }
    }

    // Check if all sub-images were removed
    const allSubImagesRemoved = req.body.allSubImagesRemoved === 'true';

    // If we have new sub-images, add them to our final list
    if (req.files && req.files.subImages) {
      // If single file, convert to array
      const subImagesFiles = Array.isArray(req.files.subImages)
        ? req.files.subImages
        : [req.files.subImages];

      // Upload each sub image
      for (const file of subImagesFiles) {
        const imageUrl = await uploadToCloudinary(file, 'events-courses');
        finalSubImages.push(imageUrl);
      }
    }

    // If all images were removed and no new ones were added, use an empty array
    if (allSubImagesRemoved && finalSubImages.length === 0) {
      finalSubImages = [];
    }

    // Create the update query based on which fields are being updated
    if (mainImageUrl) {
      // If we're updating the main image
      updateQuery = `
        UPDATE events_courses 
        SET title = ?, description = ?, type = ?, main_image_url = ?, sub_images = ?, uploaded_date = ?
        WHERE id = ?
      `;
      queryParams = [title, description, type, mainImageUrl, JSON.stringify(finalSubImages), uploadedDate, id];
    } else {
      // If we're NOT updating the main image
      updateQuery = `
        UPDATE events_courses 
        SET title = ?, description = ?, type = ?, sub_images = ?, uploaded_date = ?
        WHERE id = ?
      `;
      queryParams = [title, description, type, JSON.stringify(finalSubImages), uploadedDate, id];
    }

    // Execute the update query
    db.query(updateQuery, queryParams, (err, result) => {
      if (err) {
        console.error("Error updating event/course:", err.message);
        return res.status(500).json({ error: "Failed to update event/course details." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Event/course not found." });
      }

      res.status(200).json({
        message: `${type === 'event' ? 'Event' : 'Course'} updated successfully!`,
        id: id,
        mainImageUrl: mainImageUrl || "unchanged",
        subImagesUrls: finalSubImages
      });
    });
  } catch (error) {
    console.error("Error processing event/course update:", error);
    res.status(500).json({ error: "Failed to process update." });
  }
});

// API endpoint to get a single event or course by ID
app.get("/api/events-courses/:type/:id", (req, res) => {
  const { type, id } = req.params;

  if (type !== 'event' && type !== 'course') {
    return res.status(400).json({ error: "Invalid type. Type must be 'event' or 'course'." });
  }

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid ID. ID must be a number." });
  }

  const query = "SELECT * FROM events_courses WHERE type = ? AND id = ?";

  db.query(query, [type, id], (err, results) => {
    if (err) {
      console.error(`Error fetching ${type}:`, err.message);
      return res.status(500).json({ error: `Failed to fetch ${type}.` });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: `${type} not found.` });
    }

    // Parse JSON fields
    const item = results[0];
    const formattedItem = {
      ...item,
      sub_images: JSON.parse(item.sub_images || '[]')
    };

    res.status(200).json(formattedItem);
  });
});

// API Endpoint to Assign Membership Number
app.post("/api/assign-membership-number", async (req, res) => {
  const { userId, membershipNumber } = req.body;

  if (!userId || !membershipNumber) {
    return res.status(400).json({ error: "User ID and membership number are required." });
  }

  try {
    // Update the user's membership number in the database
    const updateQuery = `
      UPDATE user_registration 
      SET membership_number = ?
      WHERE id = ?
    `;

    db.query(updateQuery, [membershipNumber, userId], async (err, result) => {
      if (err) {
        console.error("Error updating membership number:", err.message);
        return res.status(500).json({ error: "Failed to update membership number." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      // Fetch the user's email and name
      const fetchUserQuery = `
        SELECT email, nameWithInitials 
        FROM user_registration 
        WHERE id = ?
      `;

      db.query(fetchUserQuery, [userId], async (err, results) => {
        if (err) {
          console.error("Error fetching user details:", err.message);
          return res.status(500).json({ error: "Failed to fetch user details." });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "User not found." });
        }

        const user = results[0];

        // Send an email to the user
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Your Membership Has Been Approved",
          html: `
            <p>Dear ${user.nameWithInitials},</p>
            <p>Your membership has been successfully approved. Below are your login details:</p>
            <p><strong>Membership Number:</strong> ${membershipNumber}</p>
            <p><strong>Password:</strong> Use the password you created during registration.</p>
            <p>You can now log in to the system using your membership number and password.</p>
            <p>Thank you for joining us!</p>
          `,
        };

        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            console.error("Error sending email:", err.message);
            return res.status(500).json({ error: "Failed to send email." });
          }

          res.status(200).json({ success: true, message: "Membership number assigned and email sent successfully!" });
        });
      });
    });
  } catch (error) {
    console.error("Error in assign membership number:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
});

// API Endpoint to Search User by NIC and Check Membership Number
app.post("/api/search-user-by-nic", (req, res) => {
  const { nic } = req.body;

  if (!nic) {
    return res.status(400).json({ error: "NIC is required." });
  }

  // Query to fetch user details by NIC
  const query = `
    SELECT * 
    FROM user_registration
    WHERE nic = ?
  `;

  db.query(query, [nic], (err, results) => {
    if (err) {
      console.error("Error fetching user details:", err.message);
      return res.status(500).json({ error: "Failed to fetch user details." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = results[0];

    // Check if the user has a membership number
    if (!user.membership_number) {
      return res.status(403).json({ error: "User does not have a membership number." });
    }

    // Parse JSON fields if they exist
    if (user.professional_memberships) {
      user.professional_memberships = JSON.parse(user.professional_memberships);
    }

    if (user.training_experience) {
      user.training_experience = JSON.parse(user.training_experience);
    }

    // Return the user details
    res.status(200).json(user);
  });
});

// API endpoint to delete a course or event by ID
app.delete("/api/events-courses/:id", (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid ID. ID must be a number." });
  }

  // Query to delete the event/course
  const query = "DELETE FROM events_courses WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting event/course:", err.message);
      return res.status(500).json({ error: "Failed to delete event/course." });
    }

    // Check if any row was affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Event/course not found." });
    }

    // Return success response
    res.status(200).json({ message: "Event/course deleted successfully!" });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});