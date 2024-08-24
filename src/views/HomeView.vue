<script setup lang="ts">
import Tile from '@/models/Tile'
import Tilemap from '../models/Tilemap'
import { TileType } from '../models/TileType'
import { ref } from 'vue'
import CharacterDetail from '@/components/CharacterDetail.vue'

let canvas = document.getElementById('tilemap') as HTMLCanvasElement
let ctx: CanvasRenderingContext2D
const gridRows = 20
const gridCols = 66
let colSize = 0
let rowSize = 0
let tilemap = new Tilemap(gridCols, gridRows)
let roamingInterval: number
let currentPosition: Tile = new Tile()
let isRoaming = ref(false)
let isBattle = ref(false)

isBattle = ref(false)
const startBattle = () => {
  stopRoaming()
  isBattle.value = true
  console.log('start battle', isBattle)
}
const endBattle = () => {
  startRoaming()
  isBattle.value = false
  console.log('End battle', isBattle)
}
window.onload = function () {
  init()
}
const init = async () => {
  canvas = document.getElementById('tilemap') as HTMLCanvasElement
  ctx = canvas.getContext('2d')!
  colSize = Math.round((canvas.getAttribute('width') as unknown as number) / gridCols)
  rowSize = Math.round((canvas.getAttribute('height') as unknown as number) / gridRows)
  drawmap(tilemap).then(() => {
    currentPosition = tilemap.getTileFromPos(tilemap.spawnTile.posX, tilemap.spawnTile.posY)!
  })

  updateAll()
}
const updateAll = () => {
  window.requestAnimationFrame(updateAll)
}

function moveAction(path: Tile[]) {
  // TO DO : Rework
  if (currentPosition && currentPosition.tileType == TileType.ENNEMY) {
    // Case current tile is an ennemyTile
    // setting team position
    // removing the ennemy
    // drawing the tile
    tilemap.teamTile = currentPosition
    tilemap.removeEnnemyTile(currentPosition.posX, currentPosition.posY)
    drawTile(tilemap.getTileFromPos(currentPosition.posX, currentPosition.posY)!)
  } else {
    // case MOVEMENT tile, redraw it's color
    drawTile(currentPosition)
  }

  // Moving the team
  if (path.length > 0) {
    // Case target not reached, moving to the next tile and drawing the tile with TEAM color
    tilemap.teamTile = currentPosition
    currentPosition = path.shift()!
    ctx.fillStyle = 'purple'
    ctx.fillRect(colSize * currentPosition.posX, rowSize * currentPosition.posY, colSize, rowSize)
  } else {
    // Target reached, stopping the roaming
    currentPosition = tilemap.getTileFromPos(currentPosition.posX, currentPosition.posY)!
    startBattle()
  }
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
  var path = tilemap.getNextTargetPath(currentPosition.posX, currentPosition.posY)

  roamingInterval = setInterval(() => {
    moveAction(path)
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
    </div>
    <div>
      <button @click="startRoaming" v-if="!isRoaming">Start grind</button>
      <button @click="stopRoaming" v-else>Stop grind</button>
      <button @click="endBattle" v-if="isBattle">End Battle</button>
    </div>

    <CharacterDetail></CharacterDetail>
    <div class="battleContainer" v-if="isBattle">Display monster information</div>
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
