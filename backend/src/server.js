import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const API_URL = "https://api.jsonserve.com/Uw5CrX";

// Routes
app.get("/api/questions", async (req, res) => {
  try {
    console.log("Fetching questions from:", API_URL);
    const response = await fetch(API_URL);

    if (!response.ok) {
      console.error("API Response not OK:", {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`API responded with status: ${response.status}`);
    }

    const rawData = await response.json();
    console.log("Raw data received:", rawData);

    // Extract questions array from the response
    if (!Array.isArray(rawData.questions)) {
      console.error(
        "Invalid data format - questions array not found:",
        rawData
      );
      throw new Error("API returned invalid data format");
    }

    // Format questions to match our frontend Question type
    const formattedQuestions = rawData.questions.map((q, index) => {
      if (!q || typeof q !== "object") {
        console.error(`Invalid question at index ${index}:`, q);
        throw new Error(`Invalid question format at index ${index}`);
      }

      // Extract options from the options array
      const options = q.options?.map((opt) => opt.description) || [];

      // Find the correct answer index
      const correctAnswer = q.options?.findIndex((opt) => opt.is_correct) || 0;

      return {
        id: q.id,
        question: q.description,
        options: options,
        correctAnswer: correctAnswer,
        points: 100, // Default points value
        topic: q.topic || "",
        solution: q.detailed_solution || "",
      };
    });

    console.log(
      "Formatted questions:",
      JSON.stringify(formattedQuestions, null, 2)
    );

    // Validate the formatted questions
    if (
      formattedQuestions.some(
        (q) =>
          !q.question || !Array.isArray(q.options) || q.options.length === 0
      )
    ) {
      throw new Error(
        "Some questions are missing required fields after formatting"
      );
    }

    res.json(formattedQuestions);
  } catch (error) {
    console.error("Error in /api/questions:", error);
    res.status(500).json({
      error: "Failed to fetch quiz questions. Please try again later.",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
