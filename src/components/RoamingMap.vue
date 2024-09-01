<script setup lang="ts">
import Tile from '../models/Tile'
import Tilemap from '../models/Tilemap'
import { TileType } from '../models/TileType'
import { ref } from 'vue'
import CharacterDetail from '../components/CharacterDetail.vue'

const props =defineProps(['startBattleEvent', 'stopBattleEvent'])
let canvas = document.getElementById('tilemap') as HTMLCanvasElement
let ctx: CanvasRenderingContext2D
const gridRows = 20
const gridCols = 66
let colSize = 0
let rowSize = 0
let tilemap = new Tilemap(gridCols, gridRows)
let roamingInterval: number
let isRoaming = ref(false)
let isBattle = ref(false)
let isRoomClear = ref(false)

isBattle = ref(false)
const startBattle = () => {
  stopRoaming()
  isBattle.value = true
  props.startBattleEvent()
}
const endBattle = () => {
  tilemap.removeEnnemyTile(tilemap.teamTile.posX, tilemap.teamTile.posY)
  startRoaming()
  props.stopBattleEvent()
  isBattle.value = false
}
window.onload = function () {
  init()
}
const init = async () => {
  canvas = document.getElementById('tilemap') as HTMLCanvasElement
  ctx = canvas.getContext('2d')!
  colSize = Math.round((canvas.getAttribute('width') as unknown as number) / gridCols)
  rowSize = Math.round((canvas.getAttribute('height') as unknown as number) / gridRows)
  drawmap(tilemap)

  updateAll()
}
const updateAll = () => {
  window.requestAnimationFrame(updateAll)
}

function moveAction(): void {
  var nextTile = tilemap.getNextTileToTravel()

  if (nextTile && tilemap.teamTile) {
    drawTile(tilemap.getTileFromPos(tilemap.teamTile.posX, tilemap.teamTile.posY)!)
    tilemap.setTeamPosition(nextTile)
    drawTeamTile()
    if (nextTile.tileType == TileType.ENNEMY) {
      tilemap.removeEnnemyTile(tilemap.teamTile.posX, tilemap.teamTile.posY)
      startBattle()
    }
  } else {
    clearRoom()
  }
}

function clearRoom() {
  isRoomClear.value = true
  stopRoaming()
  transitionRoomDraw()
  setTimeout(() => {
    generateNextTileMap().then(() => startRoaming())
  }, 2000)
}

// Draw empty room (TODO : Make a nice effect, something dynamic to represent the transition.)
async function transitionRoomDraw() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, colSize * gridCols, rowSize * gridRows)
}

async function generateNextTileMap() {
  tilemap.generateMap().then(() => {
    drawmap(tilemap), (isRoomClear.value = false)
  })
}

function drawTeamTile() {
  ctx.fillStyle = 'purple'
  ctx.fillRect(colSize * tilemap.teamTile.posX, rowSize * tilemap.teamTile.posY, colSize, rowSize)
}

async function drawmap(tilemap: Tilemap) {
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      drawTile(tilemap.getTileFromPos(col, row)!)
    }
  }
}

function drawTile(tile: Tile) {
  ctx.font = '25px serif'
  switch (tile?.tileType) {
    case TileType.SPAWN: // spawn tile
      ctx.fillStyle = 'green'
      ctx.fillRect(colSize * tile.posX, rowSize * tile.posY, colSize, rowSize)
      break
    case TileType.UNREACHABLE: // unreachable tile
    case TileType.UNDEFINED: // unreachable tile
      ctx.fillStyle = 'black'
      ctx.fillRect(colSize * tile.posX, rowSize * tile.posY, colSize, rowSize)
      break
    case TileType.WALL: // wall tile
      ctx.fillStyle = 'grey'
      ctx.fillRect(colSize * tile.posX, rowSize * tile.posY, colSize, rowSize)
      break
    case TileType.MOVEMENT: // movement tile
      ctx.fillStyle = 'brown'
      ctx.fillRect(colSize * tile.posX, rowSize * tile.posY, colSize, rowSize)
      ctx.fillStyle = '#ff0000' //<======= here
      break
    case TileType.ENNEMY: // ennemy tile
      ctx.fillStyle = 'red'
      ctx.fillRect(colSize * tile.posX, rowSize * tile.posY, colSize, rowSize)
      ctx.fillStyle = '#ff0000' //<======= here
      break
    case TileType.EXIT: // end tile
      ctx.fillStyle = 'darkblue'
      ctx.fillRect(colSize * tile.posX, rowSize * tile.posY, colSize, rowSize)
      break
  }
}

const startRoaming = () => {
  isRoaming.value = true
  isBattle.value = false
  roamingInterval = setInterval(() => {
    moveAction()
  }, 200)
}
const stopRoaming = () => {
  clearInterval(roamingInterval)
  isRoaming.value = !isRoaming.value
}
</script>

<template>
  <div class="pageContainer">
    <h1>LootGrinder</h1>
    <div class="mapContainer">
      <canvas class="map" width="1050" height="350" id="tilemap"></canvas>
      <h3 class="mapTitle" v-if="isRoaming">Roaming ...</h3>
      <h3 class="mapTitle" v-if="isBattle">In battle ...</h3>
      <h3 class="mapTitle" v-if="isRoomClear">Room clear, travelling to the next one...</h3>
    </div>
    <div>
      <button @click="startRoaming" v-if="!isRoaming">Start grind</button>
      <button @click="stopRoaming" v-else>Stop grind</button>
      <button @click="endBattle" v-if="isBattle">End Battle</button>
    </div>
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
