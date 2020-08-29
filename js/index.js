//This is code for the Wu Soul! Why is there no Tarrasque on this list of monsters
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    createForm()
    btnWorks()
});

function get (page) {
    fetch("http://localhost:3000/monsters/?_limit=50&_page="+page)
    .then(res=>res.json())
    .then(data=>{data.forEach(mon=>renderMon(mon))})
}

function getMax(){
    fetch("http://localhost:3000/monsters/")
    .then(res=>res.json())
    .then(mon=>{
        monsters = Object.keys(mon)
        console.log(monsters.length)
        return monsters.length
    })
}

function createForm (){
    const form = document.createElement('form')
    form.id = "monster-form"
    const name = document.createElement('input')
    name.id = "name"
    name.placeholder="Monstar Name Please"
    const age = document.createElement('input')
    age.id = "age"
    age.placeholder="How old be Mon-STAR"
    const description = document.createElement('input')
    description.id = "description"
    description.placeholder="The Scribe Mon Sta"
    const submit = document.createElement('button')
    submit.innerHTML= " Create Mon "
    form.appendChild(name)
    form.appendChild(age)
    form.appendChild(description)
    form.appendChild(submit)
    const createMon = document.getElementById('create-monster')
    createMon.appendChild(form)
    form.addEventListener('submit', e=>{
        e.preventDefault()
        console.log("you are about to submit")
        
        mon={
            name: form.name.value,
            age: form.age.value,
            description: form.description.value
            }
            
            console.log(mon)
            

            const options = {
                method: "POST",
                headers: {
                  "content-type": "application/json", // mime-types
                  "accept": "application/json"
                },
                body: JSON.stringify(mon)
              }

            fetch('http://localhost:3000/monsters', options)
            .then(response => response.json())
            // .then(mon => renderMon(mon))
            form.reset()
    })
}

function renderMon (mon){
    // console.log(mon)
    faker={
        name: mon.name,
        age: mon.age,
        description: mon.description,
        id: mon.id
    }
    // console.log(faker)
    makeMon(faker)
}

function makeMon(mon){
    const monCollection = document.getElementById('monster-container')
    const divMon= document.createElement('div')
    divMon.classList.add('monster')
    divMon.dataset.id= mon.id
    divMon.innerHTML=   `<h2>${mon.name}</h2><h4>${mon.age}</h4><p>${mon.description}<p>`
    monCollection.appendChild(divMon)
}

function btnWorks(){
    let page = 1
    get(page)
    const back = document.getElementById('back')
    back.addEventListener('click',function(e){
        if (page <1){
            page=1
            console.log("There are no monstars in that page")
        }else{
            page--
            removeMons()
            get (page)
        }
    })
    const forward = document.getElementById('forward')
    forward.addEventListener('click',(e)=>{
        // const max=getMax()
        console.log(max)
        if (page>20){
            page=21
            console.log("There are no monsters on that page")
        }else{
            page++
            removeMons()
            get (page)
        }
    })
}

function removeMons(){
    const monCollection = document.getElementById('monster-container')
    while (monCollection.firstChild){
    monCollection.removeChild(monCollection.firstChild)
    }
}
