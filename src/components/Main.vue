<template>
  <div class="main">
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

  export default {
    name: 'Main',

    components: {
      Quiz,
      Timer,
      UserPrompt,
    },

    data() {
      return {
        intervalID: null,
        numSeconds: 0,
        numQuestions: 0,
        numCorrect: 0,
        isPromptingUser: false,
        numTotalQuestions: 4,
      };
    },

    computed: {
      ...mapState({
        answerRange: state => parseInt(state.currentRoute.to.params.answerRange), // eslint-disable-line
      }),
    },

    methods: {
      handleQuestionAnswered(value) {
        if (this.intervalID) {
          this.numQuestions += 1;
          if (value) {
            this.numCorrect += 1;
          }
        }
        if (this.numQuestions === this.numTotalQuestions) {
          this.isPromptingUser = true;
          this.clearTimer();
        }
      },
      handleTimerStart() {
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
        console.log(data);
        // TODO: send data then on success do the following
        this.resetGame();
      },

      resetGame() {
        this.numSeconds = 0;
        this.numQuestions = 0;
        this.numCorrect = 0;
        this.isPromptingUser = false;
      },
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
