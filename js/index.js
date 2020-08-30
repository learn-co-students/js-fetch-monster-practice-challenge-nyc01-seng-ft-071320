document.addEventListener('DOMContentLoaded', () => {
  const createMonsterDiv = document.querySelector('#create-monster')
  const monsterContainer = document.querySelector('#monster-container')
  const backButton = document.querySelector('#back')
  const forwardButton = document.querySelector('#forward')
  let startIndex = 0
  let endIndex = 50
  let dataSize = 0
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

  const submitMonster = () => {
    const form = createMonsterDiv.children[0]
    form.addEventListener('submit', e => {
      e.preventDefault()
      const data =  {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
      }
      fetch('http://localhost:3000/monsters', {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(monster => {
        if (currentPage === maxPage) {
          createMonsterCard(monster)
          endIndex += 1
        }
      })
      .catch(e => console.log(e.message))
      form.reset()
    })
  }

  const createForm = () => {
    const form = document.createElement('form')
    form.innerHTML = `
      <label for="name">Name</label><br>
      <input type="text" name="name" placeholder="name...">
      <input type="text" name="age" placeholder="age...">
      <input type="text" name="description" placeholder="description...">
      <input type="submit" value="Submit">
    `
    createMonsterDiv.append(form)
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
        endIndex += currentPage * 50
      } else if (currentPage + 1 === maxPage) {
        currentPage += 1
        startIndex += 50
        endIndex += Math.ceil(dataSize % 50)
      }
    } else {
      if (currentPage > 1) {
        currentPage -= 1
        startIndex -= 50
        endIndex -= currentPage * 50
      }
    }
  }

  createForm()
  submitMonster()
  getMonster()
  clickHandler()
})
