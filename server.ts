import express from 'express';
import ytdl from 'ytdl-core';
import fbDownloader from 'fb-downloader';
import instagramGetUrl from 'instagram-url-direct';

const app = express();
app.use(express.json());

app.post('/api/download', async (req, res) => {
  const { url, platform } = req.body;

  try {
    let videoInfo;

    switch (platform) {
      case 'youtube':
        videoInfo = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });
        return res.json({ downloadUrl: format.url, title: videoInfo.videoDetails.title });

      case 'facebook':
        videoInfo = await fbDownloader(url);
        return res.json({ downloadUrl: videoInfo.hd, title: 'Facebook Video' });

      case 'instagram':
        videoInfo = await instagramGetUrl(url);
        return res.json({ downloadUrl: videoInfo.url_list[0], title: 'Instagram Video' });

      default:
        return res.status(400).json({ error: 'Unsupported platform' });
    }
  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({ error: 'Failed to process video' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});