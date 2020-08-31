document.addEventListener("DOMContentLoaded", (e) => {
    //Global variables
    const pupsUrl = "http://localhost:3000/pups/"
    const pupDiv = document.querySelector("#dog-bar")
    const infoDiv = document.querySelector("#dog-info")
    let statusBtn = document.createElement("button")
    statusBtn.className = "dog-status"
    
    //Functions
        function fetchPups() {
            fetch(pupsUrl)
            .then(resp => resp.json())
            .then(pups => pups.forEach(pup => renderPup(pup)))
        }
    
        function patchPup(id, status) {
          let dogStatus
          if(status === "Good Dog!"){
            dogStatus = true
          }
          else{
            dogStatus = false
          }
    
          const configObj = {
             method: "PATCH",
             headers: {
               "content-type": "application/json",
               "accept": "application/json"
             },
             body: JSON.stringify({isGoodDog: dogStatus})
             } 
    
              fetch(pupsUrl+id, configObj)
              .then(response => response.json())
              .then(updatedPup => {
                  let button = document.querySelector(".dog-status")
    
    
                  if(updatedPup.isGoodDog === "true"){
                      button.innerHTML = "Good Dog!"}
                  else if(button.innerHTML === "false")
                      {button.innerHTML = "Bad Dog"}
              })
        }
    
        function renderPup(pup) {
    
            const pupSpan = document.createElement("span")
            pupSpan.className = "pup-name"
            pupSpan.dataset.pupId = pup.id
            pupSpan.dataset.pupImage = pup.image      //added image to avoid fetching again
            pupSpan.dataset.pupStatus = pup.isGoodDog
            pupSpan.dataset.pupName = pup.name
            pupSpan.innerText = `${pup.name}`
            pupDiv.append(pupSpan)
        }
        //Click listener--------------------------------------------------------------------
        document.addEventListener("click", e => {
            let pupImglink = e.target.dataset.pupImage
            let pupName = e.target.dataset.pupName
            let pupStatus = e.target.dataset.pupStatus
            let pupId = e.target.dataset.pupId
            
            if (e.target.matches(".pup-name")) {
                infoDiv.innerHTML = ` <img src= ${pupImglink}>
                <h2 id=${pupId}> ${pupName}</h2>`
                infoDiv.append(statusBtn)
    
                if (pupStatus === "false"){
                    statusBtn.innerText = "Bad Dog"
                }
                else if (pupStatus === "true"){
                    statusBtn.innerText = "Good Dog!"
                }
            }
    
            if (e.target.matches("button")) {
                let dogId = e.target.closest("div").querySelector("h2").id   //the id is set in infoDiv.innerHTML
    
                if (e.target.innerText === "Good Dog!"){
                    statusBtn.innerText = "Bad Dog"
                    patchPup(dogId, statusBtn.innerText)
                }
                else if (e.target.innerText === "Bad Dog"){
                    statusBtn.innerText = "Good Dog!"
                    patchPup(dogId, statusBtn.innerText)
                }
            }
    
        })// end of Click Listener
    
    //Invoke functions
    fetchPups()
    
    })//end of DOMContentLoaded
    
    
    /*
    DOMContentLoaded Listener
    1)√ fetch the dogs from the server
    
    2)√ for each dog create a span node and append to the dog bar 
        -√ (attach dog's id to the dataset - only point in time we have access)
        -√ attach img_url to dataset so we dont have to fetch again within click listener
    
    3) when a user a clicks on a dog span on the dog span, image & name & status shows up on div("#dog-info")
        -√ click listener for document to listen for the spans (Steven said its ok to nest click listener inside the )
        -√ insert innerHTML to existing #dog-info
        -√ add a conditional for the status button
    
    4)√ update server for status change 
    
    
    */
    
    
    
    
    