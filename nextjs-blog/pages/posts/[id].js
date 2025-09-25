// Import Layout component for consistent page structure
import Layout from '../../components/layout';
// Import functions to get post IDs and individual post data
import { getAllPostIds, getPostData } from '../../lib/posts-json';
// Import Head component for page metadata
import Head from 'next/head';
// Import Date component for formatting dates
import Date from '../../components/date';
// Import CSS styles for post-specific styling
import utilStyles from '../../styles/post.module.css';
 
// Next.js function that runs at build time to fetch data for a specific post
// params.id contains the post ID from the URL (e.g., /posts/hello-world -> id = "hello-world")
export async function getStaticProps({ params }) {
  // Fetch the specific post data using the ID from the URL
  const postData = await getPostData(params.id);
  // Return the post data as props to the component
  return {
    props: {
      postData,
    },
  };
}
 
// Next.js function that tells Next.js which dynamic routes to pre-render at build time
// This is required for dynamic routes like [id].js
export async function getStaticPaths() {
  // Get all possible post IDs
  const paths = getAllPostIds();
  return {
    paths,
    // fallback: false means any paths not returned by getStaticPaths will result in a 404
    fallback: false,
  };
}

// Individual blog post page component
export default function Post({ postData }) {
  // Debug log to check the HTML content (can be removed in production)
  console.log(postData.contentHtml);
  return (
    // Use Layout component (without 'home' prop for different styling)
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={utilStyles.post}>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <br />
        <small>tags: {postData.tags}</small>
      </article>
    </Layout>
  );
}