document.addEventListener('DOMContentLoaded', () => {
  const monsterContainer = document.querySelector('#monster-container')
  const backButton = document.querySelector('#back')
  const forwardButton = document.querySelector('#forward')
  let startIndex = 0
  let endIndex = 50
  let dataSize = 0
  // let maxPage = dataSize % 50 === 0 ? dataSize / 20 : dataSize / 20 + 1
  let maxPage = 0
  let currentPage = 1

  const clickHandler = () => {
    document.addEventListener('click', e => {
      if (e.target === forwardButton) {
        removeMonsterCard()
        getIndex(true)
        getMonster()
      } else if (e.target === backButton) {
        removeMonsterCard()
        getIndex(false)
        getMonster()
      }
    })
  }

  const getMonster = () => {
    fetch('http://localhost:3000/monsters')
      .then(response => response.json())
      .then(monsters => {
        dataSize = monsters.length
        maxPage = Math.ceil(dataSize / 50)
        const displayMonsters = monsters.slice(startIndex, endIndex)
        for(const monster of displayMonsters) {
          createMonsterCard(monster)
        }
      })
  }
    
  const createMonsterCard = (monster) => {
    const monsterCard = document.createElement('div')
    monsterCard.className = 'monster-card'
    const monsterName = document.createElement('h2')
    const monsterAge = document.createElement('h4')
    const monsterDescription = document.createElement('p')

    monsterName.textContent = monster.name
    monsterAge.textContent = monster.age
    monsterDescription.textContent = monster.description
    monsterCard.dataset.id = monster.id

    monsterContainer.append(monsterCard)
    monsterCard.append(monsterName)
    monsterCard.append(monsterAge)
    monsterCard.append(monsterDescription)
  }

  const removeMonsterCard = () => {
    for (let i = startIndex + 1; i < endIndex + 1; i++) {
      document.querySelector(`[data-id='${i}']`).remove()
    }
  }

  const getIndex = (direction) => {
    if (direction === true) {
      if (currentPage + 1 < maxPage) {
        currentPage += 1
        startIndex += 50
        endIndex += 50
      } else if (currentPage + 1 === maxPage) {
        currentPage += 1
        startIndex += 50
        endIndex += Math.ceil(dataSize % 50)
      }
    } else {
      if (currentPage > 1) {
        currentPage -= 1
        startIndex -= 50
        endIndex -= 50
      }
    }
  }


  getMonster()
  clickHandler()
})
