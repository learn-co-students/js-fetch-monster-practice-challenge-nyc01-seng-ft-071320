document.addEventListener("DOMContentLoaded", () => {
    let counter = 1
    const monUrl = "http://localhost:3000/monsters/?_limit=50&_page="
    const monsterContainer = document.querySelector('#monster-container')
    const createContainer = document.querySelector('#create-monster')
    
    const renderMonsters = monsters => {
        for(const aMonster of monsters){
            renderMonster(aMonster)
        }
    }

    const getMonsters = () => {
        fetch(monUrl + counter)
        .then(response => response.json())
        .then(monsters => renderMonsters(monsters))
    }
    
    function renderMonster(aMonster){
        const monsterDiv = document.createElement('div')
        monsterDiv.classList.add('monster')

        monsterDiv.innerHTML = `
        <h2>Name: ${aMonster.name}</h3>
        <h4>Age: ${aMonster.age}</h4>
        <h4>Description: ${aMonster.description}</h4>
        <h4>Id: ${aMonster.id}</h5>
        `

        monsterContainer.append(monsterDiv)
    }

    const createForm = () => {
        // create monster from
        // create id for each attribute
        const newMonsterForm = document.createElement('form')
        newMonsterForm.id = 'monster-form'
        // newMonsterForm.classList.add('monster-form')    
       
        newMonsterForm.innerHTML = `
        <label>Name: </label>
        <input type="text" name="name">
        <label>Age: </label>
        <input type="text" name="age">
        <label>Description: </label>
        <input type="text" name="description">
        <input type="submit" value="Add Monster">
        `

        createContainer.append(newMonsterForm)
     }

    const submitHandler = () => {
        const form = document.getElementById('monster-form')
        form.addEventListener('submit', e => {
            e.preventDefault()
            // const form = e.target
            const name = form.name.value
            const age = form.age.value
            const description = form.description.value
            
            const newMonster = {
                // read up on keys as a string
                "name": name,
                "age": age,
                "description": description
                // reference created id
            }

            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(newMonster)
            }

            fetch(monUrl, options)
            // .then(response => response.json())
            // .then(monster => renderMonster(monster))
            // resetMonsters()
        })
    }

    // const resetMonsters = () => {
    //     document.querySelector('#monster-form').reset()
    // }
    // Didn't reset page like I thought it would

    const clickHandler = () => {
        const back = document.querySelector('#back')
        const forward = document.querySelector('#forward')
        back.addEventListener('click', e => {
            goBack()
        })
        forward.addEventListener('click', e => {
            goForward()
        })
    }
    const goBack = () => {
        counter--,
        monsterContainer.innerHTML = ""
        // clear page
        getMonsters()
    }
    const goForward = () => {
        counter++,
        monsterContainer.innerHTML = ""
        // clear page
        getMonsters()
    }

    getMonsters()
    createForm()
    submitHandler()
    clickHandler()
    resetMonsters()
})