import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // Add your local frontend origin
  'https://project-manager-frontend-psi.vercel.app' // Add your deployed frontend origin if applicable
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Enable credentials if you're using cookies or HTTP authentication
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

export { app };
