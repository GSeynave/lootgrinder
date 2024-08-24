import Tile from './Tile'
import { TileType } from './TileType'

export default class Room {
  tiles: Tile[][] = new Array<Array<Tile>>()
  maxWidth: number = 0
  maxHeight: number = 0
  widthSize: number = 0
  heightSize: number = 0
  isClear: boolean = false
  ennemyTiles: Tile[] = []
  nbEnnemy: number = 4

  constructor(width: number, height: number) {
    this.maxWidth = width
    this.maxHeight = height
    this.generateRoom(width, height).then(() => this.setEnnemyTile())
  }

  private async generateRoom(width: number, height: number): Promise<void> {
    // get size room, fro; 40 to 90 % of the available size
    this.widthSize = this.resolveSize(width)
    this.heightSize = this.resolveSize(height)
    for (let y: number = 0; y < this.maxWidth; y++) {
      console.log('y', y)
      const row = new Array<Tile>()
      for (let x: number = 0; x < this.maxHeight; x++) {
        console.log('x', x)
        if (y > this.heightSize - 1) {
          row.push(new Tile(x, y, TileType.UNREACHABLE))
        } else if (x > this.widthSize - 1) {
          row.push(new Tile(x, y, TileType.UNREACHABLE))
        } else if (x == this.widthSize - 1 || x == 0 || y == this.heightSize - 1 || y == 0) {
          row.push(new Tile(x, y, TileType.WALL))
        } else {
          row.push(new Tile(x, y, TileType.MOVEMENT))
        }
      }
      this.tiles.push(row)
    }
  }

  private resolveSize(length: number): number {
    return this.randomIntFromInterval((length * 60) / 100, (length * 90) / 100)
  }

  private randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private setEnnemyTile() {
    while (this.ennemyTiles.length < this.nbEnnemy) {
      const x = this.randomIntFromInterval(1, this.widthSize - 2)
      const y = this.randomIntFromInterval(1, this.heightSize - 2)
      const ennemyTile = new Tile(x, y, TileType.ENNEMY)
      if (TileType.ENNEMY != this.getTileFromPos(x, y)?.tileType) {
        this.tiles[y][x] = ennemyTile
        this.ennemyTiles.push(ennemyTile)
      }
    }
  }
  public getTileFromPos(x: number, y: number): Tile | undefined {
    return this.tiles[y][x]
  }
}

// TODO
/*

Instead of multiple room on the canvas,
only display a ROOM with bigger col / row
Free roaming only have to generate new room when exit
Dungeon will have specific number of ROOM and a final boss room
*/
