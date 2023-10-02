//LOGIN 

const loginForm = document.getElementById("login-form");
const submitButton = document.getElementById("submit-button");

let data;

async function fetchLogIn() {
    try {
    const email = document.getElementById("e-mail").value;
    const pwd = document.getElementById("mot_de_passe").value;
    let response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: pwd
        }),
        headers: { 
            "Content-Type": "application/json",
         }
        }); 
        if (response.status === 200) {
            data = await response.json();

            localStorage.setItem('data', JSON.stringify(data));

            const dataToken = data.token;
            localStorage.setItem('dataToken', dataToken);

            window.location.href = "index.html"    



const isLoggedIn= localStorage.getItem('data') !== null;

        }
        else {
            const wrongPwdP = document.getElementById("wrong-pwd-p");
            wrongPwdP.style.display = "block";
            const inputs = document.getElementsByClassName("input")
            const inputsArray = Array.from(inputs);
            inputsArray.forEach(input => {
                input.style.border = '2px solid red';
              });
        }
    } 
    catch (error) {
        console.error("Erreur :", error);
    } 
}




submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    fetchLogIn()
});



localStorage.setItem('isUserLoggedIn', 'true');




function unloadpage () {
    localStorage.removeItem('data');
} 
window.addEventListener('beforeunload', unloadpage);

//email: sophie.bluel@test.tld
//password: S0phie 