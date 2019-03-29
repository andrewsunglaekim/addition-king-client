<template>
  <div class="main">
    <Quiz />
    <Timer
      :numSeconds="numSeconds"
      :intervalID="intervalID"
      @timerStarted="handleTimerStart"/>
  </div>
</template>

<script>
  import Quiz from './Quiz.vue';
  import Timer from './Timer.vue';

  export default {
    name: 'Main',

    components: {
      Quiz,
      Timer,
    },

    data() {
      return {
        intervalID: null,
        numSeconds: 0,
      };
    },

    methods: {
      handleTimerStart() {
        if (this.intervalID) {
          clearInterval(this.intervalID);
          this.numSeconds = 0;
        }
        console.log(this.intervalID);
        this.intervalID = setInterval(() => {
          this.numSeconds += 1;
        }, 1000);
      },
    },
  };
</script>

<style lang="scss">
  .main {
  }
</style>
