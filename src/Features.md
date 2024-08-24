# Feature to implement

## Priority

- [ ] [Caracteristics](#Caracteristics)
- [ ] [Save](#SaveSystem)
- [ ] [Crafting](#CraftingSystem)
- [ ] [Archetypes](#Archetypes)
- [ ] [Inventory](#InventorySystem)
- [ ] [Gameplay](#GameplayFeature)
- [ ] [Team](#Teams)
- [ ] [Prestige](#Prestige)
- [ ] [BattleSystem](#BattleSystem)
- [ ] [Ranks](#Ranks)
- [ ] [Loot](#Loots)
- [ ] [PathFinding](#PathFindingSystem)
- [ ] [DungeonGenerator](#DungeonGeneratorSystem)

# <a name="MapSystem">map system in order to switch grinding area

- 2D visual map
- Uses canvas

# <a name="SaveSystem"></a>Save system,

- Simply save by store data in the browser's store at first.

# <a name="CraftingSystem"></a>Crafting system

- Equipable equipment for the characters.
  - Should have multiple 'tier' of equipments.
  - Upgradable .. ?
  - Should be expensive and time consuming to not clean the game to fast.
  - The grind should be mainly for this part.
  - Lot of resources required for the last unlocked tier.
  - Ex : first run, the first tier is expensive qnd long to make. The more run you do the more upgrade you'll discover to accelerate this process.

# <a name="Archetypes"></a>Archetypes specifities. Ex : loot chance / loot quantities - To be clarified when archetype tree is created.

- During the run characters will level up allowing player to choose the available archetypes.
  - Warrior -> Templar / Berseker
  - Rogue -> Archer / Ninja
- Create a complete archetype tree, making player enjoying the grind to unlock the next one.
- warrior get better health increase, take less damage from physical hit.
- rogue has better spd (his turn is more often than other)
- magician has better elemental damage increase per level
- tier 2 archetypes get loot bonuses against specific monster type
  - archer / ninja get loot bonus against ennemy type animal
  - Pyromancer / Ice maker get loot bonus against type magical

# <a name="InventorySystem"></a>Inventory system

- SHould be the most detail / precise as possible.
- Each equipment display the craft.
- Each resource can be clickable to see how to craft it / where to get it.

# <a name="GameplayFeature"></a>gameplay features

- free roaming
  - Choose an area to send your characters and let them roam freely to encounter monster and grind resources.
  - Target global monster ressources, earn exp.
- Dungeons
  - Multiple rooms to clear til you reach the boss's room.
  - Target boss resources, earn exp.
  - Dungeon will have "themes" such as magical dungeon where monster will be magical forcing the player to prepare is farming session accordinly. (will be easier / harder depending of the archetypes, which will reinforce the "teams" aspects)

# <a name="Teams"></a>Teams

- A player first start with a single characters.
- He will then find some way to unlock more allowing to create a teams of characters.
- The player will then be able to create his team at the beginning of the run and will benefit from each archetype specificities.

# <a name="Prestige"></a>Prestige

- A run will end when a player decide to 'Prestige'.
- It will then reset everything from the player inventory, team

# <a name="BattleSystem"></a>Battle system

- When a player choose an area, it will then make his team travel to his destination (small loading to simulate the travelling)
- The team will then roam freely in an area (graphycal with of the team moving arround a 2d area would be so nice) until it reach the closest ennemy.
- The screen then switch to the battle screen (pokemon like?) and each characters / ennemy play turn by turn depending by their speed. And so on until the all the characters / ennemies dies.
- Battle win :
  - Get loot reward
  - Get Exp
  - Returns to roaming
- Battle loose :
  - Characters dies, and will respawn after x seconds. Roaming stop / restart ? tbd.

# <a name="Caracteristics"></a>Caracteristics

- Life
  - The amount of life the characters / ennemy has
- Physical damage
  - Amount of physical direct / dot damage
- Magical damage
  - Amount of magical direct / dot damage
- Critical hit chance
  - Chance for a hit to be critical
- Critical hit damage
  - Damage bonus on a critical hit
- Speed
  - Determine how fast a character's turn will happen again
- Luck
  - Boost the loot chance.

# <a name="Ranks"></a>Ranks

- Each monster will have ranks, the more it gets killed, the more rank it will get.
- Rank will unlock some functionnalities such as displayed ennemies caracteristics
  - Life display
  - caracteristics : defense / attack
  - exp
  - drops
  - ranks
- It will grants better exp.
- It will grants better loot chance.

# <a name="Loots"></a>Loots

- Loot will have differents rarity
  - common
  - rare
  - legendary
- Each area will have their specific resources.
- Each monster will have multiples resources.
- Dungeons boss will have their unique resources.

# <a name="PathFindingSystem"></a>PathFinding

- The team will be searching for ennemies in a large area.
- Create a path finding system to freely roaming in the area and go to the closest ennemy when in range.
- Make it so the team 'randomly' travel in the direction of an ennemy to avoid waiting too long
- Implement a Djikstra algorithm

# <a name="DungeonGeneratorSystem"></a>DungeonGenerator

- Implement a dungeon generator for free roaming and an other one for the dungeon
- Free roaming should look like 4 room
  - Free roaming should all be the same.
  - Huge square room with the style of the area.
- Dungeon should be 6 room, separated by a door which can be open only when all monster are dead in the room
