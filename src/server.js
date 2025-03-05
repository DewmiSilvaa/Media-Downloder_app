const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/download", async (req, res) => {
    const { url, platform } = req.body;

    try {
        if (platform === "youtube") {
            const info = await ytdl.getInfo(url);
            const format = ytdl.chooseFormat(info.formats, { quality: "highest" });
            return res.json({ downloadUrl: format.url, title: info.videoDetails.title });
        }

        if (platform === "facebook" || platform === "instagram") {
            const response = await axios.get(`https://api.example.com/download?url=${url}`); // Replace with a valid API
            return res.json({ downloadUrl: response.data.url, title: "Video" });
        }

        return res.status(400).json({ error: "Invalid platform" });
    } catch (error) {
        console.error("Download Error:", error);
        return res.status(500).json({ error: "Failed to fetch video" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
