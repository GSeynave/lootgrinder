import Caracteristic from './Caracteristic'

export default class Monster {
  name: string = ''
  currentLife: number = 0
  caracteristic: Caracteristic = new Caracteristic(50, 1, 10, 2) // To be loaded from an archetype
//TODO more to add, loot, exp .. ?
  constructor(name: string, currentLife?: number, caracteristic?: Caracteristic) {
    this.name = name
    if (currentLife) this.currentLife = currentLife
    if (caracteristic) this.caracteristic = caracteristic
  }
}
