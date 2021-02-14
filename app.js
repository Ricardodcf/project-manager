const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const projectRouter = require("./routes/project.routes");
const taskRouter = require("./routes/task.routes");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", taskRouter);

module.exports = app;
