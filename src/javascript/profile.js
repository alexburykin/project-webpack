
const personal = document.querySelector("#personal");
const account = document.querySelector("#account");
const accountForm = document.querySelector(".account");
const personalForm = document.querySelector(".content");

function activePersonal(){
    this.classList.remove("grey");
    account.classList.add("grey");
    personalForm.classList.remove("hidden");
    accountForm.classList.add("hidden")
}
function activeAccount(){
    this.classList.remove("grey");
    personal.classList.add("grey");
    personalForm.classList.add("hidden");
    accountForm.classList.remove("hidden")
}
personal.addEventListener("click", activePersonal);
account.addEventListener("click", activeAccount);