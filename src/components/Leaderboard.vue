<template>
  <div class="leaderboard">
    <header class="leaderboard__header">
      <h2 class="leaderboard__level">Level {{ answerRange }}</h2>
      <h3 class="leaderboard__sub-head">Leaderboard</h3>
    </header>
    <table class="leaderboard__table">
      <tr class="leaderboard__table-header">
        <th class="leaderboard__table-header-name">Name</th>
        <th class="leaderboard__table-header-seconds">Seconds</th>
        <th class="leaderboard__table-header-correct">Correct</th>
      </tr>
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
      padding-bottom: 14px;
      border-bottom: 4px solid #333;
      margin-bottom: 14px;
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

    &__table-header {
      border-bottom: 4px solid #333;
      padding-bottom: 14px;
      margin-bottom: 14px;
    }

    &__score {
      margin-bottom: 6px;
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

    &__score-time, &__score-correct {
      text-align: center;
    }

    &__score-name, &__table-header-name {
      text-align: left;
      transform: translateX(20px);
    }
  }
</style>
