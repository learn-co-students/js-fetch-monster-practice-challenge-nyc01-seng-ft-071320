document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/monsters"
    let pageCount = 1
    const getUrl = `${baseUrl}/?_limit=50&_page=`
    const createMonster = document.getElementById('create-monster') // for form
    const monsterContainer = document.getElementById('monster-container') // for monster details
    const monsterForm = document.getElementById('monster-form')

    const getMonsters = () => {
        fetch(getUrl + `${pageCount}`)
        .then(response => response.json())
        .then(monsters => unpackMonsters(monsters))
    }

    const unpackMonsters = (monsters) => {
        for(const monster of monsters) {
            renderMonster(monster)
            // console.log('hi');
        }
    }

    const renderForm = () => {
        const form = document.createElement('form')
        form.id = 'monster-form'
        
        const nameInput = document.createElement('input')
        nameInput.placeholder = 'Name'
        nameInput.type = 'text'
        nameInput.name = 'name'

        const ageInput = document.createElement('input')
        ageInput.placeholder = 'Age'
        ageInput.type = 'number'
        ageInput.name = 'age'
        ageInput.min = 0

        const descInput = document.createElement('input')
        descInput.placeholder = 'Description'
        descInput.type = 'text'
        descInput.name = 'desc'

        const monsterSubmit = document.createElement('button')
        monsterSubmit.id = 'monster-submit'
        monsterSubmit.type = 'submit'
        monsterSubmit.innerText = "Submit Monster"

        createMonster.append(form)
        form.append(nameInput)
        form.append(ageInput)
        form.append(descInput)
        form.append(monsterSubmit)
    }

    const renderMonster = (monster) => {
        
        const monsterCard = document.createElement('div')
        monsterCard.id = monster.id
        
        let monsterName = document.createElement('h2')
        monsterName.innerText = monster.name

        let monsterAge = document.createElement('h3')
        monsterAge = `${monster.age}`

        let monsterDesc = document.createElement('p')
        monsterDesc.innerText = monster.description

        monsterCard.append(monsterName)
        monsterCard.append(monsterAge)
        monsterCard.append(monsterDesc)
        monsterContainer.append(monsterCard)
    }

    const submitHandler = () => {
        document.addEventListener('submit', (e) => {
            e.preventDefault()
            const form = e.target
            const name = form.name.value
            const age = form.age.value
            const desc = form.desc.value
            // console.log(name);
            // console.log(age);
            // console.log(desc);
            form.reset()
            postMonster(name, age, desc)
        })
    }

    const postMonster = (mName, mAge, mDesc) => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name: mName,
                age: mAge,
                description: mDesc
            })
        }

        fetch(baseUrl, options)
        .then(response => response.json())
        .then(console.log)
    }

    const clickHandler = () => {
        const forward = document.getElementById('forward')
        const back = document.getElementById('back')

        document.addEventListener('click', (e) => {
            e.preventDefault()
            if(e.target.innerText === forward.innerText) {
                pageCount += 1
                monsterContainer.innerHTML = ""
                getMonsters()
            }
            if(e.target.innerText === back.innerText) {
                pageCount -= 1
                if(pageCount < 1) {
                    alert("no")
                    pageCount = 1
                }
                monsterContainer.innerHTML = ""
                getMonsters()
            }
        })
    }


    renderForm()
    getMonsters()
    submitHandler()
    clickHandler()
})


/*
//Above your list of monsters, you should have a form to create a new monster. 
//You should have fields for name, age, and description, and a 'Create Monster Button'. 
When you click the button, the monster should be added to the list and saved in the API.

//When the page loads, show the first 50 monsters. 
//TODO - fetch get limit 50
//Each monster's name, age, and description should be shown.
//TODO - fields to render - name, age, and description
*/