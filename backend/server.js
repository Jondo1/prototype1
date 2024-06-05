const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const snsRoutes = require('./routes/snsRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS設定を追加
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));

// ミドルウェア
app.use(express.json());
app.use(cookieParser());

// ルート
app.use('/auth', authRoutes);
app.use('/sns', snsRoutes); // SNSルートを追加

// MongoDB接続
mongoose.connect('mongodb://localhost:27017/auto_posting_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.error(err));
