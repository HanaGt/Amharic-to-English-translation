import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fromLanguage, toLanguage, text } = req.body;

    // // Map languages to model-specific codes
    // const langCodes = {
    //   English: "en",
    //   Amharic: "am",
    // };

    // Validate input
    if (!text || !fromLanguage || !toLanguage) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Call Hugging Face API
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-am-en",
        {
          inputs: text,
        },
        {
          headers: {
            Authorization: `Bearer Yhf_RKZuVfDUFpLhhdRyjmAhGJZHGHOTqzLlYI`, // Replace with your Hugging Face token
          },
        }
      );

      const translatedText = response.data[0]?.translation_text || "Translation failed.";
      res.status(200).json({ translatedText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch translation" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
