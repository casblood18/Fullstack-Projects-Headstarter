const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openaiRoute = require('./routes/openai');
app.use('/api/openai', openaiRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});