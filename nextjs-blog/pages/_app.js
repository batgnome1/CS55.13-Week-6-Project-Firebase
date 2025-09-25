// Import global CSS styles that will be applied to all pages
import '../styles/global.css';

// This is the root App component that wraps all pages in Next.js
// Component: The current page component being rendered
// pageProps: Props passed to the page component (from getStaticProps, getServerSideProps, etc.)
export default function App({ Component, pageProps }) {
  // Render the current page component with its props
  // This is the main wrapper that all pages go through
  return <Component {...pageProps} />;
}