<script setup lang="ts">
import RoamingMap from '../components/RoamingMap.vue'
import BattleScreen from '../components/BattleScreen.vue'
import { ref } from 'vue'

let isBattle = ref(false)
function startBattle(){
  console.log('starting battle !!!')
  isBattle.value = true
}

function stopBattle(){
  console.log('starting battle !!!')
  isBattle.value = false
}
</script>



<template>
  <div class="homeContainer">
    <h1>LootGrinder</h1>
    <RoamingMap :start-battle-event="startBattle" :stop-battle-event="stopBattle"/>
    <BattleScreen v-if="isBattle"/>
  </div>
</template>

<style lang="css">
.pqgeContainer {
  display: flex;
  flex-direction: column;
}
.mapContainer {
  display: flex;
  flex-direction: column;
}

.mapTitle {
  text-align: center;
  font-style: italic;
}
</style>
