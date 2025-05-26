const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing url');

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Failed to fetch: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Proxyserver kör på port ${port}`);
});
