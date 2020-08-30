document.addEventListener("DOMContentLoaded", () => {
    let counter = 1
    const monsterContainer = document.getElementById("monster-container")
    const forwardBtn = document.getElementById("forward")
    const backBtn = document.getElementById("back")
    const createMonsterDiv = document.getElementById("create-monster")
    let form = document.createElement('form')
    form.innerHTML = `
    <form id="monster-form">
    <input id="name" placeholder="name..."></input>
    <input id="age" placeholder="age..."></input>
    <input id="description" placeholder="description..."></input>
    <button>Create</button>
    </form>
    `
    
    createMonsterDiv.append(form)
    
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let name = document.getElementById('name').value
        let age = document.getElementById('age').value
        let description = document.getElementById('description').value
        
        let monsterObj = {
            name: name,
            age: age,
            description: description
        }
        let configObj = {
            method: "POST",
            headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
        },
        body: JSON.stringify(monsterObj)
          };

       fetch("http://localhost:3000/monsters", configObj)
       .then(resp => resp.json())
       .then(data => console.log(data))
          form.reset()
    })
    
    
    const getMonsters = () => {
        let baseUrl = `http://localhost:3000/monsters/?_limit=50&_page=${counter}`
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(monster => renderMonster(monster)))
    }

    const renderMonster = (monster) => {
        const monsterDiv = document.createElement("div")
        monsterDiv.dataset.id = monster.id
        monsterDiv.innerHTML = `
        <h2> ${monster.name} </h2>
        <h4> ${monster.age} </h4>
        <p> ${monster.description} </p>
        `
        
        monsterContainer.append(monsterDiv)
        
        
    }    
    forwardBtn.addEventListener("click", (e) => {
            counter += 1
                monsterContainer.innerHTML = ``
                getMonsters()

            } )
    
            backBtn.addEventListener("click", (e) => {
                counter -= 1
                monsterContainer.innerHTML = ``
                getMonsters()
            })
  

    getMonsters()


})