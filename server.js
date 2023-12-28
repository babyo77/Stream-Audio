const express = require("express");
const StreamAudio = require("youtube-dl-exec");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

app.use(cors());

app.get("/", async (req, res) => {
  const link = req.query.url;
  if (link) {
    StreamAudio(link, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      format:"best",
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    })
      .then((output) => {
        return output;
      })
      .then((data) => {
        res.send(data.requested_downloads[0].url);
      }).catch(err=>{
        console.log(err);
      })
  } else {
    res.json({ message: "url not provided" });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
