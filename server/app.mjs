import express from "express";

const app = express();
const port = 4001;

app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});
// Validation middleware function
const validateAssignment = (req, res, next) => {
  const { title, content, category, email } = req.body;
  const errors = [];

  // Validate Title (required)
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    errors.push({
      field: "title",
      message: "Title is required and must be a non-empty string"
    });
  }

  // Validate Email (required and valid format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string") {
    errors.push({
      field: "email",
      message: "Email is required and must be a string"
    });
  } else if (!emailRegex.test(email)) {
    errors.push({
      field: "email",
      message: "Email must be in a valid email format"
    });
  }

  // Validate Category (must be "Math", "English", or "Biology")
  const validCategories = ["Math", "English", "Biology"];
  if (!category || typeof category !== "string") {
    errors.push({
      field: "category",
      message: "Category is required and must be a string"
    });
  } else if (!validCategories.includes(category)) {
    errors.push({
      field: "category",
      message: `Category must be one of: ${validCategories.join(", ")}`
    });
  }

  // Validate Content (must be between 500-1000 characters)
  if (!content || typeof content !== "string") {
    errors.push({
      field: "content",
      message: "Content is required and must be a string"
    });
  } else {
    const contentLength = content.length;
    if (contentLength < 500) {
      errors.push({
        field: "content",
        message: `Content must be at least 500 characters long (current: ${contentLength} characters)`
      });
    } else if (contentLength > 1000) {
      errors.push({
        field: "content",
        message: `Content must not exceed 1000 characters (current: ${contentLength} characters)`
      });
    }
  }

  // If there are validation errors, return 400 Bad Request
  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors
    });
  }

  // If validation passes, proceed to next middleware/route handler
  next();
};

app.post("/assignments", validateAssignment, (req, res) => {
  // สมมุติว่าตรงนี้มีโค้ดที่เขียน Query เชื่อมต่อกับฐานข้อมูล
  // เพื่อสร้าง Assignment เขียนเอาไว้แล้ว
  return res.status(201).json({ message: "Create assignment successfully" });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
