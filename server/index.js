console.log("hayo");
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 3001;

// listening on port 3001
app.listen(PORT, () => {
  console.log(`port is listening on ${PORT}`);
});

// Get request...
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  let i = 1;

  // Sending data periodically
  const intervalId = setInterval((e) => {
    i++;
    const eventData = {
      message: "This is a server-sent event!",
      timestamp: new Date().toISOString(),
      loading: i,
    };
    if (i > 100) {
      return res.end();
    }

    res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  }, 1000);

  // Clean up on client disconnect
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});
