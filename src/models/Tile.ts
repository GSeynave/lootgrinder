import { TileType } from './TileType'

export default class Tile {
  posX: number = 0
  posY: number = 0

  tileType: TileType

  constructor(posX?: number, posY?: number, tileType?: TileType) {
    if (posX) this.posX = posX
    if (posY) this.posY = posY
    if (tileType) {
      this.tileType = tileType
    } else {
      this.tileType = TileType.UNDEFINED
    }
  }

  public isEqual(x: number, y: number): boolean {
    return x == this.posX && y == this.posY
  }

  public display() {
    console.log('Current tile  [x:' + this.posX + ', y:' + this.posY + '] type :' + this.tileType)
  }
}
