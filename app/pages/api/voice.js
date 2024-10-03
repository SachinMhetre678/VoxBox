export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { text } = req.body;
      // Process the text received (e.g., converting it to speech or sending back a response)
      res.status(200).json({ message: `You said: ${text}` });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  