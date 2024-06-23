const express = require('express');
const app = express();
const axios = require("axios").default;

app.use(express.static('public'));
app.use(require('cors')());

app.get('/', (_, res) => {
  res.redirect('/index.html');
});

app.get('/api/video/:id', async (req, res) => {
  try {
    const { data } = await axios.get(`https://mixerno.space/api/youtube-video-counter/user/${req.params.id}`);

    if (data && data.counts) {
      res.json({
        counts: [data.counts[0].count,  data.counts[2].count, data.counts[3].count, data.counts[5].count],
        thumbnailURL: `https://img.youtube.com/vi/${req.params.id}/maxresdefault.jpg`
      });
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API request failed' });
  }
});

app.get('/api/user/:user', async (req, res) => {
  try {
    const { data } = await axios.get(`https://mixerno.space/api/youtube-channel-counter/user/${req.params.user}`);

    if (data && data.user) {
      res.json({
        username: data.user[0].count,
        pfp: data.user[1].count,
        banner: data.user[2].count
      });
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API request failed' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
