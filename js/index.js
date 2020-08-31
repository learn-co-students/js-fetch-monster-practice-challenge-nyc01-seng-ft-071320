document.addEventListener('DOMContentLoaded', function(e) {
    const baseUrl = "http://localhost:3000/monsters"
    const monstContain = document.querySelector('#monster-container')
    const newMonsterPlace = document.querySelector('#create-monster')
    const newForm = document.createElement('form')

    fetch(baseUrl)
    .then(resp => resp.json())
    .then(data => filterMonsters(data))

    function filterMonsters(obj) {
        const firstFifty = obj.filter(monster => monster.id <= 49)
        firstFifty.forEach(monster => {renderMonsters(monster)})
    }
    
    
    function renderMonsters(monsterObj) {
        const monstP = document.createElement("p")
        monstContain.append(monstP)
        monstP.innerHTML = `
            <strong>Name: </strong> ${monsterObj.name}<br>
            <strong>Age: </strong> ${monsterObj.age}<br>
            <strong>Description: </strong> ${monsterObj.description}`
    }


    // function newMonsterForm() {
        newMonsterPlace.append(newForm)
        newForm.id = 'new-monster-form'
        newForm.innerHTML = `
            <label for="name">Monster's name:</label><br>
            <input type="text" id="monster-name" <br><br>
            <label for="age">Monster's age:</label><br>
            <input type="number" id="monster-age" ><br>
            <label for="description">Monster's description:</label><br>
            <input type="text" id="monster-description" ><br>
            <input type="submit" value="Submit">`
    // }

    // find form, add submit listener to whole form, pass it to renderMonster
    // function createMonster() {
        newForm.addEventListener('submit', function(e){
            e.preventDefault()
            const name = e.target[0]["value"]
            const age = e.target[1]["value"]
            const description = e.target[2]["value"]
            const newMonster = {
                name: name,
                age: age,
                description: description}

            const options =  {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
                },
                body: JSON.stringify(newMonster)}  
            
            fetch(baseUrl, options)
            .then(resp => resp.json())
            .then(data => renderMonsters(data))
        
            newForm.reset()
        })
    // }
















})