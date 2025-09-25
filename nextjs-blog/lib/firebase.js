/**
 * Firebase Configuration and Initialization
 * 
 * This module handles the setup and configuration of Firebase services
 * for the Next.js blog application. It initializes the Firebase app
 * and exports the Firestore database instance for use throughout the app.
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/**
 * Firebase Configuration Object
 * 
 * Contains all the necessary configuration parameters to connect to Firebase.
 * These values are loaded from environment variables for security purposes.
 * Each environment variable should be set in your .env.local file.
 */
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,           // Firebase API key for authentication
  authDomain: process.env.FIREBASE_AUTHDOMAIN,   // Domain for Firebase Authentication
  projectId: process.env.FIREBASE_PROJECTID,     // Your Firebase project ID
  storageBucket: process.env.FIREBASE_STORAGEBUCKET, // Firebase Storage bucket name
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID, // Firebase Cloud Messaging sender ID
  appId: process.env.FIREBASE_APPID              // Firebase app ID
};

/**
 * Initialize Firebase Application
 * 
 * Creates a Firebase app instance using the configuration object.
 * This is the first step in setting up Firebase services.
 */
const firebaseApp = initializeApp(firebaseConfig);

/**
 * Initialize Firestore Database
 * 
 * Gets a Firestore database instance from the initialized Firebase app.
 * This database instance will be used for all database operations
 * throughout the application.
 */
const db = getFirestore(firebaseApp);

// Export the database instance for use in other modules
export { db };