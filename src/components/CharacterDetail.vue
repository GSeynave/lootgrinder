<script setup lang="ts">
import Character from '@/models/Character'

const player: Character = new Character('Player 1', 20)
</script>
<template>
  <div class="characterContainer">
    <h2 class="playerName">{{ player.name }} Lv. {{ player.caracteristic.level }}</h2>
    <div class="playerCaracteristicContainer">
      <div class="playerCaracteristicItem">
        Life: {{ player.currentLife }} / {{ player.caracteristic.maxLife }}
      </div>
      <div class="playerCaracteristicItem">Atk: {{ player.caracteristic.attack }}</div>
      <div class="playerCaracteristicItem">Def: {{ player.caracteristic.defense }}</div>
    </div>
  </div>
</template>

<style scoped></style>
