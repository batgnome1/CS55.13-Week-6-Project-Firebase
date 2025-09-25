/**
 * Firebase Posts Data Access Layer
 * 
 * This module provides functions to interact with the Firestore database
 * for blog post operations. It handles fetching, sorting, and formatting
 * of blog post data from the Firebase Firestore database.
 */

// Import the database instance from the Firebase configuration
import { db } from './firebase';
// Import Firestore functions for database operations
import { collection, getDocs, where, query, documentId } from 'firebase/firestore';

/**
 * Get All Posts Data Sorted by Title
 * 
 * Fetches all blog posts from the Firestore "posts" collection,
 * sorts them alphabetically by title, and returns a formatted array
 * containing only the necessary fields for the blog listing.
 * 
 * @returns {Promise<Array>} Array of post objects with id, title, date, and tags
 */
export async function getSortedPostsData() {

    // Get a reference to the "posts" collection in Firestore
    const myCollectionRef = collection(db, "posts");
    
    // Fetch all documents from the posts collection
    const querySnapshot = await getDocs(myCollectionRef);
    
    // Transform Firestore documents into a JavaScript array of objects
    // Each document becomes an object with its ID and all its data fields
    const jsonObj = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));

    // Sort the posts alphabetically by title using locale-aware comparison
    // This ensures proper sorting for different languages and special characters
    jsonObj.sort(function (a, b) 
        {
            return a.title.localeCompare(b.title);
        }
    );

    // Transform the data to ensure id is a string and return only needed fields
    // This creates a clean, consistent data structure for the frontend
    return jsonObj.map(item => {
            return {
                id: item.id.toString(),  // Convert id to string for consistency
                title: item.title,       // Post title
                date: item.date,         // Publication date
                tags: item.tags          // Associated tags
            }
        }
    );

}

/**
 * Get All Post IDs for Static Generation
 * 
 * Fetches all post IDs from the Firestore "posts" collection and formats them
 * for Next.js static generation. This function is used by Next.js to pre-generate
 * static pages for all blog posts at build time.
 * 
 * @returns {Promise<Array>} Array of objects with params.id for Next.js routing
 */
export async function getAllPostIds() {

    // Get a reference to the "posts" collection in Firestore
    const myCollectionRef = collection(db, "posts");
    
    // Fetch all documents from the posts collection
    const querySnapshot = await getDocs(myCollectionRef);
    
    // Extract only the document IDs from each post document
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id }));

    // Format the data for Next.js static generation
    // Each item becomes an object with a params property containing the post ID
    return jsonObj.map(item => 
        {
            return {
                params: {
                    id: item.id.toString()  // Convert id to string for URL parameter
                }
            }
        }
    );

}

/**
 * Get Individual Post Data by ID
 * 
 * Fetches a specific blog post from Firestore using its document ID.
 * This function is used to retrieve the full content of a single blog post
 * for display on individual post pages.
 * 
 * @param {string} id - The document ID of the post to retrieve
 * @returns {Promise<Object>} Post object with all data fields, or error object if not found
 */
export async function getPostData(id) {

    // Get a reference to the "posts" collection in Firestore
    const myCollectionRef = collection(db, "posts");
    
    // Create a query to find the document with the specific ID
    // Using documentId() function to query by the document's ID field
    const searchQuery = query(
        myCollectionRef,
        where(
            documentId(),  // Firestore function to reference the document ID
            "==",          // Equality operator
            id             // The ID we're searching for
        )
    );

    // Execute the query to get matching documents
    const querySnapshot = await getDocs(searchQuery);
    
    // Transform the query results into a JavaScript array of objects
    const jsonObj = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));

    // Handle case where no post is found with the given ID
    if (jsonObj.length === 0)  
        {
            // Return an error object with placeholder data
            return {
                id: 'id',
                title: 'error',
                date: 'error',
                contentHtml: "<p><strong>>:(</strong></p>",
                tags: 'loser'
            };
        }
    else {
        // Return the first (and should be only) matching post
        // Since document IDs are unique, there should only be one result
        return jsonObj[0];
    }
}