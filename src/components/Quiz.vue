<template>
  <div class="quiz">
    <div
      class="quiz__num1"
      :class="transitionClassFirst"
      :style="{ color: fontColor, transition: transProp }">{{ int1 }}
    </div>
    <div
      class="quiz__num2"
      :class="transitionClassSecond"
      :style="{ color: fontColor, transition: transProp }">+ {{ int2 }}
    </div>
    <div class="quiz__equality-line"></div>
    <input
      type="text"
      class="quiz__input"
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
        fontColor: '#333',
        transitionClassFirst: '',
        transitionClassSecond: '',
        transProp: 'transform 300ms linear',
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
      isCorrectAnswer() {
        return this.answer === this.parsedUserAnswer;
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
        if (this.isCorrectAnswer) {
          this.$emit('questionAnswered', true);
        } else {
          this.$emit('questionAnswered', false);
        }
        this.animateNumbers(this.isCorrectAnswer);
        this.userAnswer = '';
      },
      // https://math.stackexchange.com/questions/3166572/getting-2-random-numbers-to-add-up-to-less-then-number-n?noredirect=1#comment6520438_3166572
      generateRandomNumbers() {
        const intX = parseInt((Math.random() * (this.answerRange + 1))); // eslint-disable-line
        let intY = parseInt(Math.random() * (this.answerRange + 1 - 1)); // eslint-disable-line
        if (intY >= intX) {
          intY += 1;
        }
        this.int1 = Math.min(intX, intY);
        this.int2 = Math.max(intX, intY) - Math.min(intX, intY) - 1;
      },
      animateNumbers(isCorrect) {
        this.fontColor = isCorrect ? 'green' : 'red';
        this.setRandomTransDirection();
        setTimeout(() => {
          this.transProp = 'none';
          this.setRandomTransDirection();
          setTimeout(() => {
            this.generateRandomNumbers();
            this.fontColor = '#555';
            this.transProp = 'transform 300ms linear';
            this.transitionClassFirst = 'transition--neutral';
            this.transitionClassSecond = 'transition--neutral';
          }, 10);
        }, 300);
      },
      setRandomTransDirection() {
        const directions = ['up', 'down', 'left', 'right'];
        this.transitionClassFirst = `transition--${directions[Math.floor(Math.random() * directions.length)]}`;
        this.transitionClassSecond = `transition--${directions[Math.floor(Math.random() * directions.length)]}`;
      },
    },

    mounted() {
      this.$el.querySelector('input').focus();
      this.generateRandomNumbers();
    },
  };
</script>

<style
  scoped
  lang="scss">
  .quiz {
    padding: 3vw;
    width: 100%;
    font-size: 7vh;
    text-align: right;

    &__num1, &__num2 {
      font-family: 'Roboto Mono', monospace;

      &.transition--up {
        transform: translateY(-100vh);
      }
      &.transition--down {
        transform: translateY(100vh);
      }
      &.transition--right {
        transform: translateX(100vw);
      }
      &.transition--left {
        transform: translateX(-100vw);
      }
      &.transition--neutral {
        transform: translateX(0);
      }
    }

    &__equality-line {
      border-radius: 8px;
      height: 1vh;
      background: #555;
      width: 100%;
    }

    &__input {
      font-family: 'Roboto Mono', monospace;
      outline: none;
      border: 2px solid #ccc;
      border-radius: 20px;
      margin-top: 14px;
      padding: 8px 16px 8px 0;
      width: 100%;
      font-size: 7vh;
      text-align: right;
    }
  }
</style>
