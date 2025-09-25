// API route handler for the /api/hello endpoint
// req: The incoming request object
// res: The response object for sending data back to the client
export default function handler(req, res) {
  // Send a 200 OK status with a JSON response containing a greeting message
  res.status(200).json({ text: 'Hello' });
}