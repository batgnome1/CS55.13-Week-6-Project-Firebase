// Import Node.js file system module for reading files
import fs from 'fs';
// Import Node.js path module for handling file paths
import path from 'path';

// Define the directory where the posts.json data file is located
const dataDir = path.join(process.cwd(), 'data');

// Helper function to read and parse the posts.json file
// Returns the parsed JSON object containing all post data
function makeJsonObj () {
    // Create the full path to the posts.json file
    const filePath = path.join(dataDir, 'posts.json');
    // Read the file contents as a string
    const jsonString = fs.readFileSync(filePath, 'utf8');
    // Parse the JSON string into a JavaScript object
    const jsonObj = JSON.parse(jsonString);
    return jsonObj;
}
// Function to get all blog posts sorted alphabetically by title
// Returns an array of post objects with id, title, date, and tags
export function getSortedPostsData() {
    // Get the JSON data from the posts.json file
    const jsonObj = makeJsonObj();
    
    // Sort posts alphabetically by title using localeCompare for proper string comparison
    jsonObj.sort(function (a, b) 
        {
            return a.title.localeCompare(b.title);
        }
    );

    // Transform the data to ensure id is a string and return only needed fields
    return jsonObj.map(item => {
            return {
                id: item.id.toString(),  // Convert id to string for consistency
                title: item.title,
                date: item.date,
                tags: item.tags
            }
        }
    )
}

// Function to get all post IDs for Next.js dynamic routing
// Returns an array of objects with params.id for use with getStaticPaths
export function getAllPostIds() {
    // Get the JSON data from the posts.json file
    const jsonObj = makeJsonObj();
    
    // Transform each post into the format required by Next.js getStaticPaths
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

// Function to get data for a specific blog post by ID
// id: The post ID to search for
// Returns the post data object or an error object if post not found
export function getPostData(id) {
    // Get the JSON data from the posts.json file
    const jsonObj = makeJsonObj();
    
    // Filter posts to find the one with matching ID
    const objReturned = jsonObj.filter(obj => 
        {
            return obj.id.toString() === id;
        }
    );
    
    // If no post found with the given ID, return an error object
    if (objReturned.length === 0)  
            {
                return {
                    id: 'id',
                    title: 'error',
                    date: 'error',
                    contenHtml: "<p><strong>>:(</strong></p>",
                    tags: 'loser'
                };
            }
    else {
        // Return the first (and should be only) matching post
        return objReturned[0];
    }
}