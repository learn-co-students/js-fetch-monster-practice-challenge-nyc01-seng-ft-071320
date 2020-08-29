document.addEventListener("DOMContentLoaded", e => {
    const baseUrl = 'http://localhost:3000/monsters'

    let counter = 1
    fetchMonsters(counter)
    const buttonHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('#back') && counter > 1) {
                counter--
                fetchMonsters(counter)
            } else if (e.target.matches('#forward')) {
                counter++
                fetchMonsters(counter)
            }
        });
    }

    function fetchMonsters(counter) {
        fetch(baseUrl + `?_limit=50&_page=${counter}`)
            .then(resp => resp.json())
            .then(monsters => renderMonsters(monsters))
    }

    function renderMonsters(monsters) {
        const monsterContainer = document.getElementById('monster-container')
        for (let monster of monsters) {
            const monsterDiv = document.createElement('div')
            monsterDiv.innerHTML = `
            <h3>Name: ${monster.name}</h3>
            <h5>Age: ${Math.floor(monster.age)}</h5>
            <p>${monster.description}</p>
            `
            monsterContainer.append(monsterDiv)
        }
    }

    function createForm() {
        const header = document.querySelector('h1')
        let monsterForm = document.createElement('form')
        monsterForm.id = "monster-form"
        monsterForm.innerHTML = `
        <input type="text" id="name" name="name" placeholder="name">
        <input type="text" id="age" name="age" placeholder="age">
        <input type="text" id="description" name="description" placeholder="description">
        <input type="submit" value="Create">
        `
        header.insertAdjacentElement("afterend", monsterForm)
    }

    const submitHandler = () => {
        let form = document.getElementById('monster-form')
        form.addEventListener("submit", e => {
            e.preventDefault()
            let monster = {
                "name": form.name.value,
                "age": form.age.value,
                "description": form.description.value
            }
            const options = {
                method: 'POST',
                headers:
                {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(monster)
            }
            function postMonster(monster) {
                fetch(baseUrl, options)
                    .then(console.log("Success"))
            }
            postMonster(monster)
            form.reset()
        })
    }


    createForm()
    submitHandler()
    buttonHandler();

})