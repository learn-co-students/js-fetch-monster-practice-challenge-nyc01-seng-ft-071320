document.addEventListener('DOMContentLoaded', () => {
  const monsterContainer = document.querySelector('#monster-container')

  const showMonster = () => {
    fetch('http://localhost:3000/monsters')
      .then(response => response.json())
      .then(monsters => {
        firstFiftyMonsters = monsters.slice(1, 51)
        for(const monster of firstFiftyMonsters) {
          createMonsterCard(monster)
        }
      })
    }
    
    const createMonsterCard = (monster) => {
      const monsterCard = document.createElement('div')
      monsterCard.className = 'monster-card'
      const monsterName = document.createElement('h2')
      const monsterAge = document.createElement('h4')
      const monsterBio = document.createElement('p')

      monsterName.textContent = monster.name
      monsterAge.textContent = monster.age
      monsterBio.textContent = monster.description

      monsterContainer.append(monsterCard)
      monsterCard.append(monsterName)
      monsterCard.append(monsterAge)
      monsterCard.append(monsterBio)
  }


  showMonster()
})
