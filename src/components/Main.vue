<template>
  <main class="main">
    <header class="main__header">
      <section class="main__header-content">
        <Navigator
          class="main__nav"
          @routeChanged="handleRouteChanged"/>
        <h1 class="main__h1">
          Addition King
        </h1>
        <Timer
          class="main__timer"
          v-if="!isPromptingUser"
          :numSeconds="numSeconds"
          :intervalID="intervalID"
          @timerStarted="handleTimerStart" />
      </section>
      <section class="main__header-filler"></section>
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
            const nextNum = this.numSeconds + 1;
            this.numSeconds = 0;
            this.numSeconds = nextNum;
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
    max-width: 1200px;
    margin: auto;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .main {

    &__header {
      display: flex;
    }

    &__h1 {
      margin: 8vh 0 1vh 0;
      font-family: 'Roboto Mono', monospace;
      font-size: 5vh;
      text-align: center;
    }

    &__nav {
      position: fixed;
      top: 0;
    }

    &__timer {
      text-align: center;
      height: 4vh;
    }

    &__section {
      display: flex;
    }

    &__quiz, &__user-prompt {
      flex: 4;
      padding: 50px;
    }

    &__header-content {
      flex: 4;
    }

    &__header-filler {
      flex: 2.5;
    }

    &__leaderboard {
      flex: 2.5;
      padding: 50px;
      transform: translateY(-20px);
    }

  }
</style>
