<script setup lang="ts">
import PlayerService from '../services/PlayerService'
import MonsterService from '../services/MonsterService'
import { ref } from 'vue'
const playerService = new PlayerService()
const mosnterService = new MonsterService()
const team = ref(playerService.getTeam())
const monster = ref(mosnterService.getMonster())
</script>
<template>

<p> Your team </p>
<p v-for="character of team" :key="character.currentLife">
  {{ character.name }}
</p>

<p> Ennemy </p>
<p >{{ monster.name }}</p>

</template>

<style scoped></style>
