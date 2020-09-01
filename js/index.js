document.addEventListener("DOMContentLoaded", ()=>{
    const MONSTERS_URL = 'http://localhost:3000/monsters'

    getPage(1)

    function getPage(page) {
        fetch(`${MONSTERS_URL}/?_limit=50&_page=${page}`)
            .then(response => response.json())
            .then(monsters => {
                renderMonsters(monsters)
                renderPageNumber()
            })
    }

    document.addEventListener("click", (e)=>{

        if(e.target.matches('.create-monster')){
            e.preventDefault()
            const form = document.querySelector('form')
            const newMonster = {
                "name": form['name'].value,
                "age": form['age'].value,
                "description": form['description'].value
            }
            const configObj = {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application'
                },
                body: JSON.stringify(newMonster)
            }

            fetch(MONSTERS_URL, configObj)
                .then(response => response.json())
                .then(monster => {
                    const id = parseInt(monster.id, 10)
                    resetContainer()
                    getPage(Math.ceil(id/50))
                })
                .catch(err => console.log(err.message))

            console.log('New Monster has been created!')
            form.reset()

        } else if(e.target.matches('#forward')) {
            //forward button
            navigation('forward')
        } else if(e.target.matches('#back')) {
            //back button
            navigation('back')
        }


    })

    const renderPageNumber = () => {
        const container = document.querySelector('#monster-container')
        const currentPage = getCurrentPage().current
        const h3 = document.createElement('h3')
        h3.innerHTML = `Page: ${currentPage}`
        container.prepend(h3)
    }

    const navigation = (direction) => {
        let directionPage = 0
        if (direction === 'forward') {
            directionPage = getCurrentPage().next
        } else if (direction === 'back') {
            directionPage = getCurrentPage().previous
        }

        resetContainer()
        getPage(directionPage)
    }

    const resetContainer = () => {
        const container = document.querySelector('#monster-container')
        // const lastMonId = container.lastChild.dataset.id
        // const monsters = container.children
        // for(const monster of monsters) {
        //     if(monster.dataset.id < (lastMonId + 1)){
        //         container.remove(monster)
        //     }
        // }
        container.innerHTML = ''
    }

    const getCurrentPage = () => {
        const container = document.querySelector('#monster-container')
        const lastMonId = parseInt(container.lastChild.dataset.id, 10)
        const currentPage = Math.ceil(lastMonId/50)
        const radius = { current: currentPage}
        
        if (lastMonId % 50 === 0) {
            radius.next = currentPage + 1
        } else {
            radius.next = currentPage
        }

        if(lastMonId === 50) {
            radius.previous = currentPage
        } else {
            radius.previous = currentPage - 1
        }

        // debugger
        
        return radius
    }

    const renderMonsters = (monsters) => {
        monsters.forEach(monster => renderMonster(monster));
    }

    const renderMonster = (monster) => {
        const container = document.getElementById('monster-container')
        const monsterDiv = document.createElement('div')
        monsterDiv.dataset.id = monster.id
        monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p><strong>Description:</strong><br>${monster.description}</p>
        `
        container.append(monsterDiv)
    }


})