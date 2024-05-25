const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors') 

connectToMongo();
const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_SERVICE_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/notes'))

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("<h1>Notekarlo Backend</h1>");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));