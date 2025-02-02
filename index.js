import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import SendEmail from "./Utils/mailer.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ extended: true, limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));


// Email route
app.post("/send-email", async (req, res) => {
  const { email, subject, content } = req.body;

  try {
    await SendEmail(email, subject, content);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


