<template>
  <div class="leaderboard">
    <header class="leaderboard__header">
      <h2 class="leaderboard__level">Level {{ answerRange }}</h2>
      <h3 class="leaderboard__sub-head">Leaderboard</h3>
    </header>
    <div class="leaderboard__header-divider"></div>
    <table class="leaderboard__table">
      <tr class="leaderboard__table-header">
        <th class="leaderboard__table-header-name">Name</th>
        <th class="leaderboard__table-header-seconds">Seconds</th>
        <th class="leaderboard__table-header-correct">Correct</th>
      </tr>
      <div class="leaderboard__header-divider"></div>
      <tr
        v-for="(score, i) in scores"
        class="leaderboard__score"
        :key="i">
        <td class="leaderboard__score-name">{{ score.username }}</td>
        <td class="leaderboard__score-time">{{ score.numseconds}}</td>
        <td class="leaderboard__score-correct">{{ score.numcorrect}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: '',

    props: {
      scores: {
        type: Array,
        required: true,
      },
      answerRange: {
        type: Number,
        required: true,
      },
    },
  };
</script>

<style lang="scss">
  .leaderboard {
    font-family: 'Roboto Mono', monospace;
    width: 100%;

    &__header {
      text-align: right;
    }

    &__header-divider {
      border-radius: 20px;
      height: 4px;
      width: 100%;
      margin: 6px 0 6px 0;
      background: #333
    }

    &__level {
      font-size: 2vh;
      margin: 0;
    }

    &__sub-head {
      font-size: 1.9vh;
      margin: 0;
    }

    &__table {
      width: 100%;
    }

    &__table-header, &__score {
      display: flex;
    }

    &__table-header-name, &__score-name {
      flex: 1;
    }

    &__table-header-seconds, &__table-header-correct, &__score-time, &__score-correct {
      flex: 1;
    }

    &__table-header-name, &__score-time, &__score-correct {
      text-align: center;
    }

    &__score-name {
      text-align: left;
    }
  }
</style>
