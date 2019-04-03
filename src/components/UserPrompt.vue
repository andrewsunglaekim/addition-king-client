<template>
  <div class="user-prompt">
    <label class="user-prompt__label">
      Enter name
    </label>
    <input
      class="user-prompt__input"
      v-model="userName"
      type="text"
      :maxLength="10"
      @keypress="handleKeypress">
  </div>
</template>

<script>
  export default {
    name: 'UserPrompt',

    data() {
      return {
        userName: '',
      };
    },

    methods: {
      handleKeypress(e) {
        if (e.key === 'Enter') {
          this.$emit('nameEntered', this.userName);
          this.userName = '';
        }
      },
    },

    mounted() {
      this.$el.querySelector('input').focus();
    },
  };
</script>

<style lang="scss">
  .user-prompt {
    margin-top: 8vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__label {
      font-family: 'Roboto Mono', monospace;
      font-size: 4vh;
    }

    &__input {
      margin-top: 8px;
      width: 160px;
      text-align: center;
      font-family: 'Roboto Mono', monospace;
      font-size: 20px;
      outline: none;
      border: 2px solid #ccc;
      border-radius: 20px;
    }
  }
</style>
