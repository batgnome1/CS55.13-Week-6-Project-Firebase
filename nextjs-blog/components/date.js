// Import date-fns functions for parsing and formatting dates
import { parseISO, format } from 'date-fns';
 
// Date component for formatting and displaying dates consistently
// dateString: ISO date string (e.g., "2020-01-01") to be formatted
export default function Date({ dateString }) {
  // Parse the ISO date string into a JavaScript Date object
  const date = parseISO(dateString);
  // Return a time element with both machine-readable and human-readable date formats
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}