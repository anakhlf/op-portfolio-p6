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
portfolio.insertBefore(divCategories, h2);




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
    });
}

categoriesGenerator();


