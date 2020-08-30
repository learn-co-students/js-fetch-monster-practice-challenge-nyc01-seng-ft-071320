document.addEventListener("DOMContentLoaded", function() {

    let baseUrl = "http://localhost:3000/monsters/?_limit=50&_page="
    let pageCounter = 1
    let Url = "http://localhost:3000/monsters"
    const monsterContainer = document.getElementById("monster-container")
    const createMonster = document.getElementById("create-monster")
    const forward = document.getElementById("forward")
    const back = document.getElementById("back")

    function getData(){
        fetch(baseUrl + pageCounter)
        .then(resp => resp.json())
        .then(data => (renderMonster(data)))
    }
    
    
    function renderMonster(data){
        for(let monster of data){
            let div = document.createElement('div')   
            div.className = "belowMonster"       

            name = monster.name
            age = monster.age
            desc = monster.description

            div.innerHTML = `
            <h2>Name: ${name}</h2>
            <h3>Age: ${age}</h3>
            <h4>Desc: ${desc}</h4>
            `  
            monsterContainer.append(div);
        }
    }
    function createForm(){
        const form = document.createElement('form');
        const name = document.createElement("input");
        const age = document.createElement("input");
        const desc = document.createElement("input");
        const submit = document.createElement("input"); 
        name.setAttribute("type", "text");
        name.setAttribute("name", "name");
        name.id = "name"

        age.setAttribute("type", "number");
        age.setAttribute("age", "age");
        age.id = "age"

        desc.setAttribute("type", "text");
        desc.setAttribute("desc", "desc");
        desc.id = "desc"

        submit.setAttribute("type", "submit"); 
        submit.setAttribute("value", "submit"); 
        submit.setAttribute("id", "submit-button");

        form.append(name)
        form.append(age)
        form.append(desc)
        form.append(submit)

        createMonster.append(form)
    }
    
    const submitHandler = () => {
        document.addEventListener("submit", e => {
            // e.preventDefault
            console.log(e)
            
            const form = e.target
            
            const name = form.name.value
            const age = form.age.value
            const desc = form.desc.value
            const monsterObj = {
                name: name,
                age: age,
                desc: desc
            }
            // renderMonster(monsterObj)
            
            // form.reset();
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(monsterObj)
            }
            fetch(Url, options)
            .then(resp => resp.json())
            .then(monster => {console.log(monster)})
        })
    }

    function clickHandler(){
        document.addEventListener("click", e => {
            button = e.target
            if(button.matches("#forward")){
                pageCounter++
                pageClear()
                if(pageCounter >= 22){
                    pageCounter = 21;
                    fetch(baseUrl + pageCounter)
                    .then(resp => resp.json())
                    .then(data => (renderMonster(data)))
                } else {
                    fetch(baseUrl + pageCounter)
                    .then(resp => resp.json())
                    .then(data => (renderMonster(data)))
                }
            }
            if(button.matches("#back")){
                pageCounter--
                pageClear()
                console.log(`You are at page -- ${pageCounter}`)
                if(pageCounter < 1){
                    pageCounter = 1;
                    fetch(baseUrl + pageCounter)
                    .then(resp => resp.json())
                    .then(data => (renderMonster(data)))
                } else {
                    fetch(baseUrl + pageCounter)
                    .then(resp => resp.json())
                    .then(data => (renderMonster(data)))
                }
            }
        function pageClear(){
            monsterContainer.innerHTML = ""
        }
        })
    }


    





    clickHandler()
    createForm()
    getData()
    submitHandler()
})