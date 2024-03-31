const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jokes = require('./data');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());

const votes = {};

app.get('/joke', (req, res) => {
  let viewedJokes = req.cookies.viewedJokes ? JSON.parse(req.cookies.viewedJokes) : [];
  const availableJokes = jokes.filter(joke => !viewedJokes.includes(joke.id));

  if (availableJokes.length === 0) {
    res.json({ message: "That's all the jokes for today! Come back another day!" });
  } else {
    const randomJoke = availableJokes[Math.floor(Math.random() * availableJokes.length)];
    viewedJokes.push(randomJoke.id);

    res.cookie('viewedJokes', JSON.stringify(viewedJokes), { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(randomJoke);
  }
});

app.post('/vote', (req, res) => {
  const { id, vote } = req.body;

  if (typeof id !== 'number' || (vote !== 'like' && vote !== 'dislike')) {
    return res.status(400).json({ message: "Invalid request" });
  }

  if (!votes[id]) votes[id] = { likes: 0, dislikes: 0 };

  // Sửa ở đây: đảm bảo rằng bạn đang tăng đúng thuộc tính
  if (vote === 'like') {
    votes[id].likes += 1;
  } else if (vote === 'dislike') {
    votes[id].dislikes += 1; // Sử dụng 'dislikes' thay vì 'dislike'
  }
  
  console.log(`Vote for joke ${id}: ${vote}. Current votes: `, votes[id]);

  res.json({ message: "Vote recorded. Thank you!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
