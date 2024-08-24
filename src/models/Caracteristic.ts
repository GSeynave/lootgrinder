export default class Caracteristic {
  maxLife: number = 0
  level: number = 0
  attack: number = 0
  defense: number = 0

  constructor(maxLife: number, level: number, attack: number, defense: number) {
    this.maxLife = maxLife
    this.level = level
    this.attack = attack
    this.defense = defense
  }
}
