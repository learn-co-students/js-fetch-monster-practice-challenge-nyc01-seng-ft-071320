
const monsterForm = document.getElementById('create-monster')
const monsterContainer = document.getElementById('monster-container')
let num = 1

  function createForm(){
    monsterForm.innerHTML = `
      <form id='monster-form'>
        <input for='name' placeholder='Name...' id='name'></input>
        <input for='age' placeholder='Age...' id='age'></input>
        <input for='description' placeholder='Description...' id='description'></input>
        <input type="submit" value="Create">
      </form>
    `
  }

  function get50Monsters(num){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
      .then(resp => resp.json())
      .then(obj => renderMonsters)
  }

  function renderMonsters(monsters){
    for(const monster of monsters){
      const newDiv = document.createElement('div')
      newDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
      `
      monsterContainer.append(newDiv)
    }
  }

  function clearMonsters(){
    let child = monsterContainer.lastElementChild
    while (child){
      monsterContainer.removeChild(child)
      child = monsterContainer.lastElementChild
    }
  }

  document.addEventListener('click', e => {
    if (e.target.matches('button#forward')){
      clearMonsters()
      get50Monsters(num += 1)
    } else if (e.target.matches('button#back')) {
      clearMonsters()
      num > 1 ? get50Monsters(num -= 1) : get50Monsters(num)
    }
  })

  function createNewMonster(target){
    const newMonster = {
      name: target.name.value,
      age: target.age.value,
      description: target.description.value
    }
    return newMonster
  }

  monsterForm.addEventListener('submit', e => {
    e.preventDefault()
    const newMonster = createNewMonster(e.target)
    addMonsterToDB(newMonster)
    e.target.reset()
  })

  function addMonsterToDB(obj){
    const configObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(obj)
      }
    fetch('http://localhost:3000/monsters', configObj)
      .then(resp => resp.json())
      .then(obj=> console.dir(obj))
  }

createForm()
get50Monsters(num)
