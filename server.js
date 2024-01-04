const express = require("express");
const StreamAudio = require("ytdl-core");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");
app.use(cors());
app.use(express.static("./"));

app.get("/", async (req, res) => {
  try {
    const link = req.query.url;
    if (link) {
      const video_id = StreamAudio.getVideoID(link);
      if (fs.existsSync(`./music/${video_id}.mp3`)) {
        res.send(`/music/${video_id}.mp3`)
        return;
      }
      exec(`python download.py "${video_id}"`, (error, stdout, stderr) => {
        if (stdout.includes("Downloaded")) {
         res.send(`/music/${video_id}.mp3`)
        } else {
          res.status(500).json({ Error: error, stderr: stderr });
        }
      });
    } else {
      res.json({ message: "url not provided" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
