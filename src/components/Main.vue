<template>
  <div class="main">
    <Quiz @questionAnswered="handleQuestionAnswered" />
    <Timer
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
        numQuestion: 0,
        numCorrect: 0,
        isPromptingUser: false,
      };
    },

    computed: {
      ...mapState({
        maxNum: state => parseInt(state.currentRoute.to.params.maxNum), // eslint-disable-line
      }),
    },

    methods: {
      handleQuestionAnswered(value) {
        if (this.intervalID) {
          this.numQuestion += 1;
          if (value) {
            this.numCorrect += 1;
          }
        }
        if (this.numQuestion === 2) {
          this.isPromptingUser = true;
          this.clearTimer();
        }
        console.log(this.numQuestion);
        console.log(this.numCorrect);
      },
      handleTimerStart() {
        if (!this.intervalID) {
          this.intervalID = setInterval(() => {
            this.numSeconds += 1;
          }, 1000);
        }
      },
      clearTimer() {
        clearInterval(this.intervalID);
        this.intervalID = 0;
      },

      handleNameEntered(userName) {
        const data = {
          userName,
          numSeconds: this.numSeconds,
          numCorrect: this.numCorrect,
          maxNum: this.maxNum,
        };
        console.log('name entered!');
        console.log(data);
      },
    },
  };
</script>

<style lang="scss">
  .main {
  }
</style>
