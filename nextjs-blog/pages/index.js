// Import Next.js Head component for managing page metadata
import Head from 'next/head';
// Import the Layout component and site title constant
import Layout, { siteTitle } from '../components/layout';
// Import Next.js Link component for client-side navigation
import Link from 'next/link';
// Import utility CSS styles
import utilStyles from '../styles/utils.module.css';
// Import function to get all blog post data
import { getSortedPostsData } from '../lib/posts-json';
// Import Date component for formatting dates
import Date from '../components/date';
 
// Next.js function that runs at build time to fetch data for this page
// This enables Static Site Generation (SSG)
export async function getStaticProps() {
  // Get all blog post data sorted by date
  const allPostsData = getSortedPostsData();
  // Return the data as props to the component
  return {
    props: {
      allPostsData,
    },
  };
}

// Main Home page component that displays the blog homepage
export default function Home({ allPostsData }) {
  return (
    // Use Layout component with 'home' prop to show different header styling
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I am Andrew. I like coffee, cats, and spooky things</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, tags }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
              </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
