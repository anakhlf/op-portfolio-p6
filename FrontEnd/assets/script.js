const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");
const h2 = document.getElementById("h2");

const divCategories = document.createElement("div");
divCategories.className = "categories";
const categoryAll = document.createElement("button");
categoryAll.className = "category category_selected";
categoryAll.innerHTML = `<p>Tous</p>`;
divCategories.appendChild(categoryAll);

portfolio.appendChild(divCategories);
var modeEditionWorks = document.querySelector('#mode-edition-works');
modeEditionWorks.insertAdjacentElement('afterend', divCategories);


// GET Categories

async function fetchCategories() {
    const r = await fetch("http://localhost:5678/api/categories");
    if (r.ok === true) {
        return r.json();
    }
    throw new Error ("Impossible de contacter le serveur")
}

fetchCategories().then(categories => console.log(categories));


// GET Works
async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    if (response.ok === true) {
        return response.json();
    }
    throw new Error ("Impossible de contacter le serveur")
}

fetchWorks()
    .then(works => console.log(works))




// Fonction WORK

categoryAll.addEventListener("click", () => {
    async function workGenerator () {

        const works = await fetchWorks();
    
        works.forEach ((work) => {
            const project = document.createElement("figure");
            const workImage = document.createElement("img");
            workImage.src = work.imageUrl;
            const workTitle = document.createElement("p");
            workTitle.textContent = work.title;

            project.appendChild(workImage);
            project.appendChild(workTitle);
            gallery.appendChild(project);
        });
    }
    
    workGenerator();    
});

async function workGenerator () {

    const works = await fetchWorks();

    works.forEach ((work) => {
        const project = document.createElement("figure");
        const workImage = document.createElement("img");
        workImage.src = work.imageUrl;
        const workTitle = document.createElement("p");
        workTitle.textContent = work.title;

        project.appendChild(workImage);
        project.appendChild(workTitle);
        gallery.appendChild(project);
    });
}

workGenerator();


//fonction categories

//Créer mes catégories

async function categoriesGenerator() {
    // ***** OK 
    const works = await fetchWorks();
    const categories = await fetchCategories();
    categories.forEach((category) => {
        const categoryName = document.createElement("button");
        categoryName.className = "category";
        categoryName.setAttribute("data-id", category.id);
        categoryName.innerHTML = `<p>${category.name}</p>`;
        divCategories.appendChild(categoryName); 

  

        categoryName.addEventListener("click", () => {
            const gallery = document.querySelector(".gallery");
            gallery.innerHTML="";
            let idCategory = category.id;
            
            const allCategories = document.querySelectorAll(".category");
            allCategories.forEach((cat) => {
                cat.classList.remove("category_selected");
            });

        

            works.forEach ((work) => {
                    if (work.categoryId === idCategory) {
                            const project = document.createElement("figure");
                            const workImage = document.createElement("img");
                            workImage.src = work.imageUrl;
                            const workTitle = document.createElement("p");
                            workTitle.textContent = work.title;
                            project.appendChild(workImage);
                            project.appendChild(workTitle);
                            gallery.appendChild(project);   
                            categoryName.classList.add("category_selected");   
                    }
                });
            });

            categoryAll.addEventListener("click", () =>{
                gallery.innerHTML="";
                const allCategories = document.querySelectorAll(".category");
                allCategories.forEach((cat) => {
                    cat.classList.remove("category_selected");
                });
                categoryAll.className = "category category_selected";
            });
    });
}

categoriesGenerator();

const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

if(isUserLoggedIn) {
    const modifyContentSection = document.querySelector("#modify-content-section");
    const modeEditionIntroduction = document.querySelector("#mode-edition-introduction");
    const modeEditionWorks = document.querySelector ("#mode-edition-works");
    modifyContentSection.style.display = "flex";
    modeEditionIntroduction.style.display = "flex";
    modeEditionWorks.style.display = "inline-block";
    const allCategories = document.querySelector(".categories");
    allCategories.style.visibility = "hidden";

}

async function changeWorksGenerator () {
    
    const works = await fetchWorks();

    console.log(works);

    works.forEach ((work) => {
        const modifyGalery = document.getElementById("modify-galery");
        const changeProject = document.createElement("figure");
        changeProject.style.display = "inline-block";
        const workImage = document.createElement("img");
        workImage.src = work.imageUrl;
        const workTitle = document.createElement("p");
        workTitle.innerHTML = "éditer";
        workTitle.style.marginTop = "2.42px";

        changeProject.appendChild(workImage);
        changeProject.appendChild(workTitle);
        modifyGalery.appendChild(changeProject);
    });
}

modeEditionWorks.addEventListener("click", () => {
    const sectionModifyGalery = document.querySelector("#section-modify-galery");
    sectionModifyGalery.style.display = "flex";
    const modifyGalery = document.getElementById("modify-galery");
    modifyGalery.innerHTML="";
    const modale=document.getElementById("modale");
    modale.style.display = "flex";
    const closeButton = document.querySelector(".close");

    changeWorksGenerator ()

    closeButton.addEventListener('click', function() {
        sectionModifyGalery.style.display = "none";
      });
    window.addEventListener('click', function(event) {
        if (event.target == sectionModifyGalery) {
            sectionModifyGalery.style.display = 'none';
        }
    });

});

const addPhotoButton = document.getElementById("add-photo-button");
const addPhotoSection = document.getElementById("add-photo-section");
addPhotoButton.addEventListener('click', () => {
    modale.style.display = "none";
    addPhotoSection.style.display ="flex";
  });

const arrowLeft = document.querySelector(".fa-arrow-left")
arrowLeft.addEventListener('click', () => {
    modale.style.display = "flex";
    addPhotoSection.style.display ="none";
});

const buttonValidate = document.getElementById("button-validate")
buttonValidate.addEventListener('click', () => {
    async function sendNewWork () {
        const newWork = await fetch("http://localhost:5678/api/works");
        if (response.ok === true) {
            console.log("Bonjour");
        }
    }
});


//





