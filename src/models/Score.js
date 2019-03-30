import axios from 'axios';

class Score {
  static async createOne(scoreData) {
    try {
      await axios.post('http://localhost:4000/scores', scoreData);
    } catch (err) {
      console.log(err);
    }
  }

  static async getLeaderBoard(answerRange) {
    try {
      const scores = axios.get(`http://localhost:4000/leaderboards/${answerRange}`);
      return scores.data;
    } catch (err) {
      console.log(err);
    }
  }
}

// app.get('/leaderboards/:answerRange', async (req, res) => {
//   console.log('getting leaderbaord');
//   const scores = await Score.getLeaderboard(req.params.answerRange);
//   res.json(scores);
// });
//
// app.get('/topPlayed', async (req, res) => {
//   const scores = await Score.getTopPlayedModes();
//   res.json(scores);
// })
export default Score;
