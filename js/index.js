//DONE
//Get the first 50 monsters using a fetch. DONE
//First send a fetch get request. DONE
//Then create a render monsters function that builds the html DONE
//For each object create a html with a div, and h2 tags with thier name, h4 age and p description DONE
//Above the list of the first 50 monsters make a form to create a new monster. DONE
//Make the form have fields for name, age, and description, and a create monster button DONE
//When we click the button the monster should be saved in the api and added to the DOM list DONE

//Still need to do
//At the end of the list of monsters create a button when clicked the button should load 50 more monsters.

document.addEventListener('DOMContentLoaded', function(e) {

    let counter = 50;
    const monsterList = document.querySelector('div#monster-container');

    monsterList.insertAdjacentHTML('beforebegin', `<form id="monster-form">
        <input id ="name" placeholder="name...">
        <input id ="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button id="monster-button">Create New Monster</button>
    </form>`);


    function getMonsters() {
        fetch("http://localhost:3000/monsters")
        .then(response => response.json())
        .then(monsters => {
            renderMonsters(monsters.slice(0, 50))
        })
    }

    function renderMonsters(monsters) {
        for(const monster of monsters) {
            monsterList.insertAdjacentHTML('beforeend', `<div class="monster">
                <h2>Name: ${monster.name}</h2>
                <h4>Age: ${monster.age}</h4>
                <p>Description: ${monster.description}</p>
            </div>`);
        }
    }

    function submitHandler() {
        document.addEventListener('submit', function(e) {
            
            if(e.target.matches('form#monster-form')){
                e.preventDefault();
                makeMonster(e.target);
            }
        })
    }

    function makeMonster(monster) {
        fetch("http://localhost:3000/monsters", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "name": monster.name.value ,
                "age": monster.age.value ,
                "description": monster.description.value 
            })
        })
        .then(response => response.json())
        .then(monsterObject => {
            appendMonster(monsterObject);
        })
        
    }

    function appendMonster(monster) {
        monsterList.insertAdjacentHTML('afterbegin', `<div class="monster">
        <h2>Name: ${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Description: ${monster.description}</p>
    </div>`);        
    }

    function clickHandler() {
        document.addEventListener('click', function(e) {
            if(e.target.matches('button#forward')) {
                monsterList.innerHTML = "";
                fetch("http://localhost:3000/monsters")
                .then(response => response.json())
                .then(monsters => {
                    renderMonsters(monsters.slice((counter), (counter + 50)))
                })
                counter += 50;
            }
            else if(e.target.matches('button#back')){
                monsterList.innerHTML = "";
                fetch("http://localhost:3000/monsters")
                .then(response => response.json())
                .then(monsters => {
                    renderMonsters(monsters.slice((counter - 50), (counter)))
                })
                counter -= 50;                
            }
        })
    }



    submitHandler();
    clickHandler();
    getMonsters();  
    
})