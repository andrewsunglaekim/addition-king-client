<template>
  <div class="navigator">
    <button
      v-if="!isNavigating"
      class="navigator__button"
      @click="initiateNav">Change level
    </button>
    <div
      v-else
      class="navigator__nav">
      <label class="navigator__label">Enter level</label>
      <input
        class="navigator__input"
        type="text"
        ref="input"
        v-model="answerRange"
        @keypress="handleKeypress">
    </div>
  </div>
</template>

<script>
  export default {
    name: '',

    data() {
      return {
        answerRange: this.$store.state.currentRoute.to.params.answerRange,
        isNavigating: false,
      };
    },

    methods: {
      initiateNav() {
        this.isNavigating = true;
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
        console.log('initiated switchgign snav');
      },
      handleKeypress(e) {
        const allowedKeyCodes = [8, 9, 27, 13, 37, 38, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        if (allowedKeyCodes.includes(e.keyCode)) {
          if (e.keyCode === 13) {
            this.handleEnter();
          }
          return true;
        }
        e.preventDefault();
        return null;
      },
      handleEnter() {
        this.$router.push({
          name: 'Main',
          params: {
            answerRange: this.answerRange,
          },
        });
        this.$emit('routeChanged');
        this.isNavigating = false;
      },
    },
  };
</script>

<style lang="scss">
  .navigator {

    &__button {
      padding: 0 16px 0 16px;
      font-family: 'Roboto Mono', monospace;
      font-size: 16px;
      height: 40px;
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
        box-shadow: 0px 0px #ccc;
      }
    }

    &__label {
      display: block;
      font-family: 'Roboto Mono', monospace;
      font-size: 16px;
      margin-left: 14px;
      padding-top: 10px;
    }

    &__input {
      margin-top: 8px;
      width: 120px;
      text-align: center;
      font-family: 'Roboto Mono', monospace;
      font-size: 14px;
      outline: none;
      border: 2px solid #ccc;
      border-radius: 20px;
    }
  }
</style>
