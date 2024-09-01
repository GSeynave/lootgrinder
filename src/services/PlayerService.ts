import Character from '@/models/Character'

export default class PlayerService {
  team: Character[] = []
  constructor() {
    this.team = [new Character("Character 1"), new Character("Character 2")]
  }

  public getTeam() {
    return this.team
  }
}
