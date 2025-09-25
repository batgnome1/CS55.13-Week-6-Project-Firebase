// Import Node.js file system module for reading files
import fs from 'fs';
// Import Node.js path module for handling file paths
import path from 'path';
// Import gray-matter library for parsing Markdown frontmatter
import matter from 'gray-matter';
// Import remark library for processing Markdown
import { remark } from 'remark';
// Import remark-html plugin to convert Markdown to HTML
import html from 'remark-html';
 
// Define the directory where blog post Markdown files are stored
const postsDirectory = path.join(process.cwd(), 'posts');
 
// Function to get all blog posts sorted by date (newest first)
export function getSortedPostsData() {
  // Get all file names in the posts directory
  const fileNames = fs.readdirSync(postsDirectory);
  // Process each Markdown file to extract post data
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" extension from file name to get the post ID
    const id = fileName.replace(/\.md$/, '');

    // Create full path to the Markdown file
    const fullPath = path.join(postsDirectory, fileName);
    // Read the file contents as a string
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the frontmatter (metadata at top of file)
    // This extracts title, date, and other metadata from the Markdown file
    const matterResult = matter(fileContents);

    // Return an object combining the post ID with the frontmatter data
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date in descending order (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Function to get all post IDs for Next.js dynamic routing
// This is used by getStaticPaths to pre-generate all possible post pages
export function getAllPostIds() {
  // Get all file names in the posts directory
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        // Remove ".md" extension to get the post ID
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// Function to get data for a specific blog post by ID
export async function getPostData(id) {
  // Create full path to the specific Markdown file
  const fullPath = path.join(postsDirectory, `${id}.md`);
  // Read the file contents as a string
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the frontmatter (metadata section)
  const matterResult = matter(fileContents);

  // Use remark to convert the Markdown content to HTML
  const processedContent = await remark()
    .use(html)  // Add HTML plugin to convert Markdown to HTML
    .process(matterResult.content);  // Process the content part (after frontmatter)
  const contentHtml = processedContent.toString();

  // Return an object combining the post ID, HTML content, and frontmatter data
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}