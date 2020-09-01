document.addEventListener("DOMContentLoaded", (e) => {
  fetchMonsters(counter);
  createForm();
  submitHandler();
  clickListener();
});

let counter = 1;
const baseUrl = "http://localhost:3000/monsters/";
const monstUrl = "http://localhost:3000/monsters/?_limit=50&_page=";
const fetchMonsters = (counter) => {
  fetch(`${monstUrl}${counter}`)
    .then((res) => res.json())
    .then((monsters) => {
      renderM(monsters);
    });
};

function renderM(monsters) {
  const mContainer = document.querySelector("#monster-container");
  mContainer.innerHTML = "";
  for (const monster of monsters) {
    const div = document.createElement("div");
    div.classList.add("monster");
    div.innerHTML = `<div> <h2>${monster.name}</h2> <h4>Age: ${monster.age}</h4> <p>Bio: ${monster.description}</div> `;
    mContainer.append(div);
  }
}

const createForm = () => {
  const mDiv = document.querySelector("#create-monster");
  const mForm = document.createElement("FORM");
  mForm.classList.add("monster-form");

  mForm.innerHTML =
    '<input id="name" name="name" placeholder="name" />' +
    '<input id="age" age="age" placeholder="age" />' +
    '<input id="description" description="description" placeholder="description" />' +
    "<button>create</button>";
  mDiv.append(mForm);

  // const nameI = document.createElement("INPUT");
  // nameI.id = "name";
  // const ageI = document.createElement("INPUT");
  // ageI.id = "age";
  // const descI = document.createElement("INPUT");
  // descI.id = "description";
  // const submitB = document.createElement("button");

  // nameI.setAttribute("name", "name");
  // nameI.setAttribute("placeholder", "name");
  // ageI.setAttribute("age", "age");
  // ageI.setAttribute("placeholder", "age");
  // descI.setAttribute("description", "description");
  // descI.setAttribute("placeholder", "description");

  // submitB.innerText = "create";

  // mForm.append(nameI);
  // mForm.append(ageI);
  // mForm.append(descI);
  // mForm.append(submitB);
};

const submitHandler = () => {
  //   const form = document.querySelector("#monster-form");
  document.addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const age = form.age.value;
    const description = form.description.value;

    const mObj = {
      name: name,
      age: age,
      description: description,
    };

    form.reset();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(mObj),
    };

    fetch(baseUrl, options)
      .then((resp) => resp.json())
      //   .then(renderM)
      .catch((error) => {
        console.log("There was an error.");
      });
  });
};

const clickListener = (e) => {
  document.addEventListener("click", function (e) {
    if (e.target.matches("#back")) {
      counter--;
      fetchMonsters(counter);
    } else if (e.target.matches("#forward")) {
      counter++;
      fetchMonsters(counter);
    }
  });
};
