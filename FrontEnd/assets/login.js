//LOGIN 

const loginForm = document.getElementById("login-form");
const submitButton = document.getElementById("submit-button");



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
            const data = await response.json();
            window.location.href = "index.html"    
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



const serveurResponse = {
    userId: 1,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NTMxNzAxNiwiZXhwIjoxNjk1NDAzNDE2fQ.RDOZWzN1Ot9ZxWnkSSlPbqKKqJ7-KtBcRTT6z1J6bKQ"
}
localStorage.setItem('userData', JSON.stringify(serveurResponse));



const isLoggedIn= localStorage.getItem('userData') !== null;




function unloadpage () {
    localStorage.removeItem('userData');
} 

window.addEventListener('beforeunload', unloadpage);

//email: sophie.bluel@test.tld
//password: S0phie 