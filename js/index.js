document.addEventListener("DOMContentLoaded", () => {
    let counter = 1;
    const monsterCont = document.getElementById('monster-container');
    const monsterForm = document.getElementById('create-monster');
    const fwdBtn = document.getElementById('forward');
    const bckBtn = document.getElementById('back');
    const form = document.createElement('form');
    
    const getMonsters = () => {
        let baseUrl = `http://localhost:3000/monsters/?_limit=50&_page=${counter}`;
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(monsters => renderMonsters(monsters))
    }

    const renderMonsters = (monsters) => {
        for (const monster of monsters) {
            renderMonster(monster)
        }
    }

    const renderMonster = (monster) => {
        const monsterDiv = document.createElement('div');
        monsterDiv.dataset.id = monster.id
        monsterDiv.innerHTML = `
        <h2> ${monster.name} </h2>
        <h4> ${monster.age} </h4>
        <p> ${monster.description} </p>
        `
        monsterCont.append(monsterDiv)
    }

    const clickHandler = () => {
        fwdBtn.addEventListener('click', (e) => {
          counter += 1
          console.log(counter);
          monsterCont.innerHTML = "";
          getMonsters();
        })
        bckBtn.addEventListener('click', (e) => {
            counter -= 1
            monsterCont.innerHTML = "";
            getMonsters();
        })
    }

    const renderCreateForm = () => {
        form.innerHTML = `
        <form id="monster-form">
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button>Create</button>
        </form>
        `
        monsterForm.append(form);
    }

    const submitHandler = () => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let monsterName = e.target.children[0].value;
            let monsterAge = e.target.children[1].value;
            let monsterDesc = e.target.children[2].value;

            let monsterObj = { 
               name: monsterName, 
               age: monsterAge,
               description: monsterDesc 
                }

            let configObj = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(monsterObj)
            };
            form.reset();
            createMonster(configObj)
        })
    }

    const createMonster = (configObj) => {
        fetch("http://localhost:3000/monsters", configObj)
        .then(resp => resp.json())
        .then(getMonsters())
    }


   renderCreateForm();
   getMonsters();
   clickHandler();
   submitHandler();
});

