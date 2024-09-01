import Tile from './Tile'
import { TileType } from './TileType'

export default class Tilemap {
  nbCol: number
  nbRow: number

  tiles: Tile[][] = new Array<Array<Tile>>() // the map
  teamTile: Tile = new Tile()
  spawnTile: Tile = new Tile()
  exitTile: Tile = new Tile()
  ennemyTiles: Tile[] = []
  nbEnnemy: number = 10
  pathToNextDirection: Tile[] = []

  constructor(nbCol: number, nbRow: number) {
    this.nbCol = nbCol
    this.nbRow = nbRow
    this.generateMap().then((value)=> this.tiles = value)
  }

  public async generateMap(): Promise<Tile[][]> {
    this.initMap().then(() => {
      this.setSpecificTile(this.nbEnnemy, TileType.ENNEMY)
      this.setSpecificTile(1, TileType.SPAWN)
      this.setSpecificTile(1, TileType.EXIT)
    })
    return Promise.resolve(this.tiles)
  }

  // Generate a map : 2 dimentional array of Tile ( pos x, pos y and tile type)
  private async initMap(): Promise<Tile[][]> {
    this.tiles = new Array<Array<Tile>>()
    for (let y: number = 0; y < this.nbRow; y++) {
      const row = new Array<Tile>()
      for (let x: number = 0; x < this.nbCol; x++) {
        if (x == this.nbCol - 1 || x == 0 || y == this.nbRow - 1 || y == 0) {
          row.push(new Tile(x, y, TileType.WALL))
        } else {
          row.push(new Tile(x, y, TileType.MOVEMENT))
        }
      }
      this.tiles.push(row)
    }
    return Promise.resolve(this.tiles)
  }

  // Set the specific tiletype on the map (ennemy, spawn, exit)
  private setSpecificTile(numberOfTile: number, typeOfTile: TileType) {
    let nbTileSet: number = 0
    while (nbTileSet < numberOfTile) {
      const x = this.randomIntFromInterval(1, this.nbCol - 2)
      const y = this.randomIntFromInterval(1, this.nbRow - 2)
      if (TileType.MOVEMENT == this.getTileFromPos(x, y)?.tileType) {
        this.tiles[y][x].tileType = typeOfTile
        switch (typeOfTile) {
          case TileType.ENNEMY:
            this.ennemyTiles.push(new Tile(x, y, typeOfTile))
            nbTileSet++
            break
          case TileType.SPAWN:
            this.spawnTile = Object.assign(new Tile(), this.tiles[y][x])
            this.teamTile = new Tile(x, y, TileType.TEAM)
            nbTileSet++
            break
          case TileType.EXIT:
            this.exitTile = Object.assign(new Tile(), this.tiles[y][x])
            nbTileSet++
            break
        }
      }
    }
  }

  // Retrieve a tile by it's position
  public getTileFromPos(x: number, y: number): Tile | undefined {
    return this.tiles[y][x]
  }

  // generate a random number from an interval, including max and min value
  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // Get the next path (list of tile) from a tile posiitonning
  // Will look for closest ennemy target first, if none will return the full tile path for the exit
  public getNextTargetPath(startX: number = this.teamTile.posX, startY: number =this.teamTile.posY): Tile[] {
    const nextTargetTile = this.getNextTarget(startX, startY)
    return this.getTargetPath(startX, startY, nextTargetTile)
  }

  public getNextTileToTravel(){
    console.log('set pathtonextdirection',this.pathToNextDirection)
    if (this.pathToNextDirection && this.pathToNextDirection.length <= 0){
      console.log('set pathtonextdirection',this.pathToNextDirection)
      this.getNextTargetPath(this.teamTile.posX, this.teamTile.posY)
      return this.pathToNextDirection.shift()!
    }
    return this.pathToNextDirection.shift()!
  }

  public isBiggerThan(value1: number, value2: number): boolean {
    return value1 > value2
  }

  // Resolve the path to the tile position of param
  // Simply go right or left or up or down till the target is reached
  public getTargetPath(startX: number, startY: number, target: Tile): Tile[] {
    const calculatedPos = Object.assign(new Tile(), this.getTileFromPos(startX, startY))
    let isSameX: boolean = false
    let isSameY: boolean = false
    while (!isSameX || !isSameY) {
      if (calculatedPos.posX != target.posX) {
        calculatedPos.posX = this.isBiggerThan(calculatedPos.posX, target.posX)
          ? calculatedPos.posX - 1
          : calculatedPos.posX + 1
        this.pathToNextDirection.push(
          Object.assign(new Tile(), this.getTileFromPos(calculatedPos.posX, calculatedPos.posY))
        )
      } else {
        isSameX = true
      }
      if (calculatedPos.posY != target.posY) {
        calculatedPos.posY = this.isBiggerThan(calculatedPos.posY, target.posY)
          ? calculatedPos.posY - 1
          : calculatedPos.posY + 1
        this.pathToNextDirection.push(
          Object.assign(new Tile(), this.getTileFromPos(calculatedPos.posX, calculatedPos.posY))
        )
      } else {
        isSameY = true
      }
    }
    return this.pathToNextDirection
  }

  // Return the next tile to target (ennemy or exit if none)
  // Look for the closest ennemy first, by counting the distance for the position in param
  public getNextTarget(x: number, y: number): Tile {
    let nextTargetTile = Object.assign(new Tile(), this.exitTile)
    let distance: number = Number.MAX_SAFE_INTEGER
    if (this.ennemyTiles.length > 0) {
      this.ennemyTiles.forEach((tile) => {
        const newDist = Math.abs(x - tile.posX) + Math.abs(y - tile.posY)
        if (newDist < distance) {
          distance = newDist
          nextTargetTile = Object.assign(new Tile(), tile)
        }
      })
    }
    return nextTargetTile
  }

  // Remove ennemy for the ennemy tiles list and turn it's type on the map as MOVEMENT
  public removeEnnemyTile(posX: number, posY: number) {
    this.tiles[posY][posX] = Object.assign({}, new Tile(posX, posY, TileType.MOVEMENT))
    let index = 0
    for (let i: number = 0; i < this.ennemyTiles.length; i++) {
      if (this.ennemyTiles[i].isEqual(posX, posY)) {
        index = i
        this.ennemyTiles.splice(index, 1)
      }
    }
  }

  setTeamPosition(tile: Tile): void {
    this.teamTile = Object.assign(new Tile(), tile)
    this.teamTile.tileType == TileType.TEAM
  }

  /* TODO

  Create a room generator by givng a max nbRow and max nbCol
  Then generate a new room separated by 3 tiles to create a corridor
  link the exit - entry
   
  check if still have enough space to create a room in the same direction (north/ south/ west / east)
   if not change the direction
   Start top left
   end bottom right

  numerate the room to keep track on which room the team is. This way for the dungeon boss we'll know if we are a the last room to spawn the boss

*/
}
