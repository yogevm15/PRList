const cors = require('cors');
const express = require('express');

const app = express();

// Allow cross origin requests.
app.use(cors());

app.get('/api/vcs/prs', (req, res) => {
  res.redirect('https://api.github.com/repos/nodejs/node/pulls?state=all');
});


app.listen(3000, () => {
  console.log('Listening on 3000...');
});
