<template>
  <div class="quiz">
    <div class="quiz__num1">{{ int1 }}</div>
    <div class="quiz__operator">+</div>
    <div class="quiz__num2">{{ int2 }}</div>
    <div class="quiz__equal">=</div>
    <div>{{ answer }}</div>
    <div>{{ userAnswer }}</div>
    <input
      type="text"
      class="quiz-input"
      @keypress="handleKeypress"
      v-model="userAnswer">
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Quiz',

    data() {
      return {
        int1: 0,
        int2: 0,
        userAnswer: '',
      };
    },

    computed: {
      ...mapState({
        answerRange: state => parseInt(state.currentRoute.to.params.answerRange), // eslint-disable-line
      }),
      answer() {
        return this.int1 + this.int2;
      },
      parsedUserAnswer() {
        return parseInt(this.userAnswer);
      },
    },

    methods: {
      handleKeypress(e) {
        const allowedKeyCodes = [8, 9, 27, 13, 37, 38, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        if (allowedKeyCodes.includes(e.keyCode)) {
          if (e.keyCode === 13) {
            this.handleAnswer();
          }
          return true;
        }
        e.preventDefault();
        return null;
      },
      handleAnswer() {
        if (this.answer === this.parsedUserAnswer) {
          this.$emit('questionAnswered', true);
        } else {
          this.$emit('questionAnswered', false);
        }
        this.generateRandomNumbers();
        this.userAnswer = '';
        console.log('user answer ""');
      },
      // https://math.stackexchange.com/questions/3166572/getting-2-random-numbers-to-add-up-to-less-then-number-n?noredirect=1#comment6520438_3166572
      generateRandomNumbers() {
        const intX = parseInt((Math.random() * (this.answerRange + 1))); // eslint-disable-line
        let intY = parseInt(Math.random() * (this.answerRange + 1 - 1)); // eslint-disable-line
        if (intY >= intX) { intY += 1; }
        this.int1 = Math.min(intX, intY);
        this.int2 = Math.max(intX, intY) - Math.min(intX, intY) - 1;
      },
    },

    mounted() {
      this.generateRandomNumbers();
    },
  };
</script>

<style scoped lang="scss">
  .quiz {
    color: $color-red;
    background: red;
    font-size: 80px;

    &__num1 {
      color: blue;
    }
  }
</style>
