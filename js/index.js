
let baseURL = 'http://localhost:3000/monsters/'
let page = 1;

    document.addEventListener("DOMContentLoaded", function(){
        function getMonsters(pageNo){
            fetch(baseURL+pageNo)
                .then(resp => resp.json())
                .then(renderMonsters)
        
        }

        const monsterContainer = document.querySelector('#monster-container')
        const createMonster = document.querySelector('#create-monster')
        
        document.addEventListener('click', function(e){
            if(e.target.id != 'create-monster'){
                if(e.target.id == 'forward'){
                    page+=1;
                    monsterContainer.innerHTML = ""
                    getMonsters('?_limit=50&_page='+page);
                } else if(e.target.id == 'back'){
                    page -= 1;
                    monsterContainer.innerHTML = ""
                    getMonsters('?_limit=50&_page='+page);
                }
            
        }
        })

        function renderMonsters(monsters){
            for(let monster of monsters){
                let name = monster.name
                let age = monster.age
                let bio = monster.description
                renderMonster(name, age, bio)
            }
        }

        function renderMonster(name, age, bio){
            let div = document.createElement('div')
            div.innerHTML = `<h1>${name}</h1><h3>age: ${age}</h3>bio: ${bio}`
            monsterContainer.append(div)
        }

        function form(){
            let form = document.createElement('form')
            form.innerHTML = '<input name="name" placeholder="Name..."><input name="age" placeholder ="Age..."><input name="bio" placeholder = "Description..."><input type="submit" class="submit" value="Create A Monster" name ="submit">'
            createMonster.append(form)
        }
        
        form();



        document.addEventListener('submit', function(e){
            e.preventDefault();
            name = e.target.name.value
            age = e.target.age.value
            bio = e.target.bio.value
            processMonster(name, age, bio);
            e.target.reset();
            
        })

        

        function processMonster(name, age, bio){

            const option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "name": name,
                    "age": age,
                    "description": bio
                })
            }

            fetch(baseURL, option)
            .then(resp => resp.json())
            .then(data =>  renderMonster(data.name, data.age, data.description))
            .catch((error) => {
                console.log('Error:', error)
            });
        }

        getMonsters('?_limit=50&_page='+page);
       

    });

   

