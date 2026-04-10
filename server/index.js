const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const MONGO_URI = 'mongodb+srv://ssudharsan984_db_user:Dgcsx2PQV3dsTP6F@cluster0.zkjpzjv.mongodb.net/alumni_db?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.log('❌ MongoDB Error:', err));

const path = require('path');

app.use(cors());
app.use(express.json());

app.use('/api/auth',      require('./routes/auth'));
app.use('/api/alumni',    require('./routes/alumni'));
app.use('/api/events',    require('./routes/events'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
