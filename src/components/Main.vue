<template>
  <main class="main">
    <header class="main__header">
      <Navigator @routeChanged="handleRouteChanged"/>
      <h1 class="main__h1">
        Addition King
      </h1>
      <Timer
        v-if="!isPromptingUser"
        :numSeconds="numSeconds"
        :intervalID="intervalID"
        @timerStarted="handleTimerStart" />
    </header>
    <section class="main__section">
      <Quiz
        v-if="!isPromptingUser"
        class="main__quiz"
        ref="quiz"
        @questionAnswered="handleQuestionAnswered" />
      <UserPrompt
        v-if="isPromptingUser"
        class="main__user-prompt"
        ref="userPrompt"
        @nameEntered="handleNameEntered" />
      <Leaderboard
        v-if="leaderBoardScores"
        class="main__leaderboard"
        :scores="leaderBoardScores"
        :answerRange="answerRange"/>
    </section>

  </main>
</template>

<script>
  import { mapState } from 'vuex';

  import Score from '@/models/Score';
  import Quiz from './Quiz.vue';
  import Timer from './Timer.vue';
  import UserPrompt from './UserPrompt.vue';
  import Navigator from './Navigator.vue';
  import Leaderboard from './Leaderboard.vue';

  export default {
    name: 'Main',

    components: {
      Quiz,
      Timer,
      UserPrompt,
      Navigator,
      Leaderboard,
    },

    data() {
      return {
        intervalID: null,
        numSeconds: 0,
        numQuestions: 0,
        numCorrect: 0,
        isPromptingUser: false,
        numTotalQuestions: 5,
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
        this.$refs.quiz.$el.querySelector('input').focus();
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
        this.topPlayed = await Score.getTopPlayed();
      },

      async fetchLeaderBoardScores() {
        this.leaderBoardScores = await Score.getLeaderBoard(this.answerRange);
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
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .main {

    &__section {
      display: flex;
    }

    &__quiz, &__user-prompt {
      flex: 4;
      padding: 50px;
    }

    &__leaderboard {
      flex: 3;
      padding: 50px;
    }

  }
</style>
