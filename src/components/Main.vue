<template>
  <div class="main">
    <Navigator @routeChanged="handleRouteChanged"/>
    <Quiz
      v-if="!isPromptingUser"
      ref="quiz"
      @questionAnswered="handleQuestionAnswered" />
    <Timer
      v-if="!isPromptingUser"
      :numSeconds="numSeconds"
      :intervalID="intervalID"
      @timerStarted="handleTimerStart" />
    <UserPrompt
      v-if="isPromptingUser"
      @nameEntered="handleNameEntered" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import Score from '@/models/Score';
  import Quiz from './Quiz.vue';
  import Timer from './Timer.vue';
  import UserPrompt from './UserPrompt.vue';
  import Navigator from './Navigator.vue';

  export default {
    name: 'Main',

    components: {
      Quiz,
      Timer,
      UserPrompt,
      Navigator,
    },

    data() {
      return {
        intervalID: null,
        numSeconds: 0,
        numQuestions: 0,
        numCorrect: 0,
        isPromptingUser: false,
        numTotalQuestions: 1,
        leaderBoardScores: [],
        topPlayed: [],
      };
    },

    computed: {
      ...mapState({
        answerRange: state => parseInt(state.currentRoute.to.params.answerRange), // eslint-disable-line
      }),
      gameFinished() {
        return this.numQuestions === this.numTotalQuestions;
      },
    },

    methods: {
      handleQuestionAnswered(value) {
        if (this.intervalID) {
          this.numQuestions += 1;
          if (value) {
            this.numCorrect += 1;
          }
        }
        if (this.gameFinished) {
          this.isPromptingUser = true;
          this.clearTimer();
        }
      },
      handleTimerStart() {
        console.log(this.$refs);
        this.$refs.quiz.generateRandomNumbers();
        if (!this.intervalID) {
          this.intervalID = setInterval(() => {
            this.numSeconds += 1;
          }, 1000);
        }
      },
      clearTimer() {
        clearInterval(this.intervalID);
        this.intervalID = null;
      },
      async handleNameEntered(userName) {
        const data = {
          userName,
          numSeconds: this.numSeconds,
          numCorrect: this.numCorrect,
          numQuestions: this.numTotalQuestions,
          answerRange: this.answerRange,
        };
        await Score.createOne(data);
        this.resetGame();
      },
      handleRouteChanged() {
        this.resetGame();
        this.$refs.quiz.generateRandomNumbers();
      },
      resetGame() {
        this.isPromptingUser = false;
        this.numSeconds = 0;
        this.numQuestions = 0;
        this.numCorrect = 0;
        this.fetchLeaderBoardScores();
      },

      async fetchMeta() {
        await this.fetchLeaderBoardScores();
        const topPlayed = await Score.getTopPlayed();
        this.topPlayed = topPlayed;
      },

      async fetchLeaderBoardScores() {
        const leaderboardScores = await Score.getLeaderBoard(this.answerRange);
        this.leaderBoardScores = leaderboardScores;
      },
    },

    mounted() {
      this.fetchMeta();
    },
  };
</script>

<style lang="scss">
  body {
    margin: 0;
  }

  .main {
  }
</style>
