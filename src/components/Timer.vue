<template>
  <div class="timer">
    <div
      v-if="intervalID"
      class="timer__seconds">
      <div>
        {{ numSeconds }}
      </div>
      <div class="timer__rotator"></div>
    </div>
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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100px;
    margin: auto;

    &__button {
      font-family: 'Roboto Mono', monospace;
      font-size: 16px;
      height: 40px;
      width: 60px;
      border-radius: 20px;
      outline: none;
      position: relative;
      cursor: pointer;
      background: #7afdd6;
      border: none;
      box-shadow: 0px 5px #777;
      transition: all 0.2s ease;

      &:active {
        top: 4px;
        box-shadow: 0px 0px #d3545d;
      }

      &:hover {
        background: #7afdd6;
      }
    }

    &__seconds {
      font-family: 'Roboto Mono', monospace;
      font-size: 24px;
      position: relative;
    }

    &__rotator {
      top: -18px;
      left: 0px;
      -webkit-animation: rotation 5s infinite linear;
      background: black;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 30px;
        left: 0;
        height: 10px;
        width: 10px;
        background: black;
        border-radius: 50%;
      }
    }
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
