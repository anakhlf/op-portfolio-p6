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


// GET Categories OK

async function fetchCategories() {
    const r = await fetch("http://localhost:5678/api/categories");
    if (r.ok === true) {
        return r.json();
    }
    throw new Error ("Impossible de contacter le serveur")
}

fetchCategories().then(categories => console.log(categories));


// GET Works OK

async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    if (response.ok === true) {
        return response.json();
    }
    throw new Error ("Impossible de contacter le serveur")
}

fetchWorks()
    .then(works => console.log(works))




// AFFICHER MES WORKS - pp OK

categoryAll.addEventListener("click", () => {
    async function workGenerator () {

        const works = await fetchWorks();
    
        works.forEach ((work) => {
            const project = document.createElement("figure");
            project.id = work.id;
            project.src = work.id;
            project.className = idCounter;
            const workImage = document.createElement("img");
            workImage.src = "image-" + work.imageUrl;
            const workTitle = document.createElement("p");
            workTitle.id = "title-" + work.id;
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

    let idCounter = works.length;

    works.forEach ((work) => {
        const project = document.createElement("figure");
        project.id = idCounter;
        project.className = idCounter;
        const workImage = document.createElement("img");
        workImage.src = work.imageUrl;
        workImage.id = "image-" + idCounter;
        const workTitle = document.createElement("p");
        workTitle.textContent = work.title;

        idCounter--;

        project.appendChild(workImage);
        project.appendChild(workTitle);
        gallery.appendChild(project);
    });
}

workGenerator();


//Créer mes catégories OK

async function categoriesGenerator() {
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



//CONNEXION ET AFFICHAGE OKK



const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
console.log(isUserLoggedIn)

if(isUserLoggedIn) {
    const modifyContentSection = document.querySelector("#modify-content-section");
    const modeEditionIntroduction = document.querySelector("#mode-edition-introduction");
    const modeEditionWorks = document.querySelector ("#mode-edition-works");
    modifyContentSection.style.display = "flex";
    modeEditionIntroduction.style.display = "flex";
    modeEditionWorks.style.display = "inline-block";
    const allCategories = document.querySelector(".categories");
    allCategories.style.visibility = "hidden";
    allCategories.style.marginTop = "-20px";
}


const sectionModifyGalery = document.querySelector("#section-modify-galery");
const closeButton1 = document.getElementById("close-1");
const closeButton2 = document.getElementById("close-2");

    closeButton1.addEventListener('click', function() {
        sectionModifyGalery.style.display = "none";
        gallery.innerHTML="";
        workGenerator();
      });
    closeButton2.addEventListener('click', function() {
        sectionModifyGalery.style.display = "none";
        addPhotoSection.style.display = "none";
        resetForm();
        gallery.innerHTML="";
        workGenerator();
      });
    window.addEventListener('click', function(event) {
        if (event.target == sectionModifyGalery) {
            sectionModifyGalery.style.display = 'none';
            addPhotoSection.style.display = 'none';
            resetForm();
            gallery.innerHTML="";
            workGenerator();
        }
    });





//AFFICHER WORKS MODALE OKK 

async function changeWorksGenerator () {
    
    const workMove = document.createElement("i");
    workMove.className = "fa-solid fa-up-down-left-right icons-change-work";
    const works = await fetchWorks();

    //let idCounter = works.length;

    console.log(works);
    //move
    

    works.forEach ((work) => {
        const modifyGalery = document.getElementById("modify-galery");
        const changeProject = document.createElement("figure");
        changeProject.id = work.id;
        changeProject.className = "change-project";
        //changeProject.style.display = "inline-block";
        const workImage = document.createElement("img");
        workImage.id = "image-" + work.id;
        workImage.src = work.imageUrl;
        workImage.style.position = "relative";
        const workTrash = document.createElement("i");
        workTrash.className = "fa-solid fa-trash-can icons-change-work";
        workTrash.id = work.id;
        workTrashclassName = work.id;
        const workTitle = document.createElement("p");
        workTitle.innerHTML = "éditer";
        workTitle.style.marginTop = "2.42px";
        workTitle.id = "title-" + work.id;
    

        changeProject.appendChild(workImage);
        changeProject.appendChild(workTitle);
        modifyGalery.appendChild(changeProject);
        changeProject.prepend(workMove);
        changeProject.appendChild(workTrash);
        
        if (work.id === 1) {
            const workMove = document.createElement("i");
            workMove.className = "fa-solid fa-up-down-left-right";
        }
    });




    // LIEN ID POUBELLE IMAGE OKK 

    const workTrash = document.getElementsByClassName("icons-change-work");
    for (let i = 0; i < workTrash.length; i++) {
        const trash = workTrash[i];

        trash.addEventListener('click',function(event) {
            event.preventDefault(); 
            const id = trash.id;
            deleteWork(id, event);
        });    
    };

}

    //FONCTION SUPPRESSION 

    function deleteWork(id, event) {
        
        event.preventDefault();
        const token = localStorage.getItem('dataToken');
        const url = `http://localhost:5678/api/works/${id}`;
        fetch(url, {
        method: 'DELETE',
        headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        if (response.ok) {
            
            console.log('Work deleted successfully');

            const changeProject = document.getElementById(id);
            changeProject.remove();
            changeProject.style.display = 'none';
            
            
            }
        else {
            console.error('Work not deleted successfully');
        }
    })
    .catch(error => {
        console.error('Error deleting', error);
        });
    }

//suppression gallery 

const eraseGallery = document.getElementById("erase-galery");
eraseGallery.addEventListener("click", async (event) => {
    async function eraseGalleryFunction () {
        try {
            const works = await fetchWorks();
            works.forEach ((work) => {
                
                deleteWork(work.id, event);
                const modifyGalery = document.getElementById("modify-galery");
                //modifyGalery.innerHTML = "";
            });
        }
        catch (error) {
            console.error("Erreur lors de la récupération des travaux :", error);
        }
    }
    await eraseGalleryFunction();
});

// FENETRE N1 MODIFIER LES TRAVAUX OK

modeEditionWorks.addEventListener("click", () => {
    const sectionModifyGalery = document.querySelector("#section-modify-galery");
    sectionModifyGalery.style.display = "flex";
    const modifyGalery = document.getElementById("modify-galery");
    modifyGalery.innerHTML="";
    const modale=document.getElementById("modale");
    modale.style.display = "flex";
    changeWorksGenerator ()


});


// FENETRE N2 FAIRE APPARAITRE LA MODALE AJOUTER LES PHOTOS

const addPhotoButton = document.getElementById("add-photo-button");
const addPhotoSection = document.getElementById("add-photo-section");
addPhotoButton.addEventListener('click', () => {
    modale.style.display = "none";
    addPhotoSection.style.display ="flex";
});


//flèche retour

const arrowLeft = document.querySelector(".fa-arrow-left")
arrowLeft.addEventListener('click', () => {
    modale.style.display = "flex";
    addPhotoSection.style.display ="none";
});


// REMPLISSAGE FORM

const modifyContentSection = document.getElementById("section-modify-galery")
const modale = document.getElementById("modale");
const buttonAddPhoto = document.getElementById("button-add-photo");
const fileInput = document.getElementById('fileInput');
const encartPhoto = document.getElementById('encart-photo');
const contenuEncart = document.getElementById('contenu-encart');
const fileTitle = document.getElementById('title');
const categorySelect = document.getElementById('category');
const sendButton = document.getElementById('button-validate')







// AJOUT PHOTO

encartPhoto.addEventListener("click", () => {
    const fichierVolumineux = document.querySelector('#fichier-volumineux');
    const fichierNonConforme = document.querySelector('#fichier-nonconforme');
    fichierVolumineux.style.display = 'none';
    fichierNonConforme.style.display = 'none';
    fileInput.click();
    fileInput.addEventListener('change', handleFileUpload);
    function handleFileUpload () {
        const imagePreview = document.querySelector('#imagePreview');
        const selectedFiles = fileInput.files;
        console.log('Nombre de fichiers sélectionnés :', selectedFiles.length);
        if (selectedFiles.length > 0) {
            const file = selectedFiles[0];
            if (file.type === 'image/png' || file.type === 'image/jpeg')  {
                if (file.size < 4 * 1024 * 1024 ) {
                    const imageUrl = URL.createObjectURL(file);
                    imagePreview.src = imageUrl;
                    imagePreview.addEventListener('load', () => {
                    console.log('Image chargée avec succès');
                    contenuEncart.style.display = 'none';
                    imagePreview.style.display="block";
                    });
                }
                else {
                    fichierVolumineux.style.display = 'block';
                }
            }
            else {
                fichierNonConforme.style.display = 'block';
            } 
        }
    } 
});

fileInput.addEventListener('change', validateForm);
fileTitle.addEventListener('input', validateForm);
categorySelect.addEventListener('change', validateForm);




// VALIDER LE FORMULAIRE FONCTION


async function sendNewWork () {
    
        const token = localStorage.getItem('dataToken');
        console.log(token);
        
        const fileInputFiles = fileInput.files[0];
        const fileTitleValue= fileTitle.value;
        const categorySelectValue = categorySelect.value;
        const selectedOption = categorySelect.options[categorySelect.selectedIndex];
        const selectedOptionId = selectedOption.id;


        const formData = new FormData();    
        formData.append('image', fileInputFiles);
        formData.append('title', fileTitleValue);
        formData.append('category', selectedOptionId);
        console.log(formData);

        const newWork = await fetch("http://localhost:5678/api/works", {
                method : 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        
            if (newWork.ok) {
                
                addPhotoSection.style.display = 'none';
                modifyContentSection.style.display = "flex";
                modale.style.display = "flex";
                const modifyGalery = document.getElementById("modify-galery");
                modifyGalery.innerHTML = "";
                
                changeWorksGenerator(); 
                console.log("changeProject-" + selectedOptionId);
                

            } else {
                console.error('Erreur lors de la création du travail.');
            }

}



//Style du bouton + message erreur --------------------------------


function validateForm() {
    const categorySelected = categorySelect.value !='';
    const titleSelected = fileTitle.value.trim() !== '';
    const fileSelected = fileInput.files.length > 0;    

    if (categorySelected && titleSelected && fileSelected) {
        errorMessage.style.visibility = 'hidden';
        errorMessage.textContent = '';
        sendButton.style.background = '#1D6154';
        sendButton.style.color = 'white';  
        
    }

}




//messsage erreur

const errorMessage = document.querySelector('#errormessage');
sendButton.addEventListener('click', () => {
    errorMessage.style.visibility = 'visible';
    if (fileTitle.value.trim() === '') {
    fileTitle.classList = 'errorstyleinput';
    }
    if (fileInput.files.length === 0){
    encartPhoto.classList = 'errorstyleinput';
    }
    if (categorySelect.value === '')
    categorySelect.classList = 'errorstyleinput';
    
});

// ENLEVER MESSAGE ERREUR


fileTitle.addEventListener ('input', () => {
    if (fileTitle.value.trim() !== '') {
        fileTitle.classList.remove('errorstyleinput');
        fileTitle.classList = 'classicdesigninput';
    }
});

fileInput.addEventListener ('change', () => {
    if (fileInput.files.length > 0) {
        encartPhoto.classList.remove('errorstyleinput');
        encartPhoto.classList = 'classicdesigninput';
    }
});

categorySelect.addEventListener ('change', () => {
    if (categorySelect.value !=''){
        categorySelect.classList.remove('errorstyleinput');
        categorySelect.classList = 'classicdesigninput';

    }
});


document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById("form-add-photo")
        form.addEventListener('submit', function(event) {
            event.preventDefault();     
            sendNewWork (); 
    
    });
});



//FERMER LES FENETRES ET LES REINITIALISER OK

function resetForm() {
    const formAddPhoto = document.getElementById("form-add-photo");

    const imagePreview = document.querySelector('#imagePreview');
    imagePreview.style.display = 'none' ;
    contenuEncart.style.display = "flex";
    

    const newFileInput = document.createElement("input");
    newFileInput.type = "file";
    newFileInput.id = "fileInput";
    newFileInput.name = "fileInput";
    newFileInput.style.display = "none";


    if (fileInput.parentNode) {
    fileInput.parentNode.replaceChild(newFileInput, fileInput);
    }
    formAddPhoto.reset();
    
}



    // supprimer tout les console.log
    // Relecture

    