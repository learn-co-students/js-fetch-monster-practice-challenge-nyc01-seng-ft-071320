document.addEventListener("DOMContentLoaded", function(e) {
    let container = document.getElementById("monster-container")  
    let number = 1
    let form = document.createElement('form')
    let baseUrl = 'http://localhost:3000/monsters/'
    
    function getData(number) {
        fetch(baseUrl + '?_limit=50&_page=' + number)
        .then(resp => resp.json())
        .then(monsters => displayMonsters(monsters))
    }
    
    function displayMonsters(monsters) {
        for (let monster of monsters) {
            displayMonster(monster)
        }
    }
    
    function displayMonster(monster) {
        let monsterDiv = document.createElement("div")
        monsterDiv.classList.add('monster')
        monsterDiv.innerHTML = `
        <h1>${monster.name}</h1>
        <h3>Age: ${monster.age}</h3>
        <p>Bio: ${monster.description}</p>
        `
        container.append(monsterDiv)
    }
    
    
    function removeMonsterDisplays() {
        let monsterDisplays = document.getElementsByClassName("monster")
        console.log(monsterDisplays)
        for (let monster of monsterDisplays) {
            container.querySelectorAll('*').forEach(n => n.remove())
        }
    }
        
    function createForm() {
        let formDiv = document.getElementById('create-monster')
        form.classList.add('form')
        form.innerHTML = `
        Create a New Monster
        <input type="text" name="name" value="name">
        <input type="text" name="age" value="age">
        <input type="text" name="description" value="description">
        <input type="submit" value="Create Monster">
        `
        formDiv.append(form)
    }
    
    document.addEventListener('click', function(e) {
        if (e.target.matches("#back") && number > 1) {
            removeMonsterDisplays()
            number = number - 1
            getData(number)
        } else if (e.target.matches("#forward")) {
            removeMonsterDisplays()
            number = number + 1
            getData(number)
        }
    })
    
    form.addEventListener('submit', function(e) {
        event.preventDefault()
        let name = form.name.value
        let age = form.age.value
        let desc = form.description.value
        fetch('http://localhost:3000/monsters', {method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
            body: JSON.stringify({ 
                name: name, 
                age: age, 
                description: desc 
            })
        }).then(resp => resp.json())
        .then(monster => displayMonster(monster))
        console.log(name)
    })
    
    getData(number)
    createForm()
})