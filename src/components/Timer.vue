<template>
  <div class="timer">
    <div
      v-if="intervalID"
      class="timer__seconds">{{ numSeconds }}</div>
    <button
      v-if="!intervalID"
      class="timer__button"
      @click="handleClick">Go!
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Timer',
    props: {
      numSeconds: {
        type: Number,
        required: true,
      },
      intervalID: {},
    },

    methods: {
      handleClick() {
        this.$emit('timerStarted');
      },
    },
  };
</script>

<style lang="scss">
  .timer {

  }
</style>
