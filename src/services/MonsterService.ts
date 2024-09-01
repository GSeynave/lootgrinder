import Character from '@/models/Character'
import Monster from '@/models/Monster'

export default class MonsterService {
  constructor() {
  }

  public getMonster() {
    return new Monster("Monster 1");
  }
}
