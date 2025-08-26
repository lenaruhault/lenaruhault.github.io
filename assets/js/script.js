'use strict';



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items


document.addEventListener("click", function (e) {

  const item = e.target.closest("[data-testimonials-item]");

  if (!item) return;

  modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
  modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
  modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
  modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
  testimonialsModalFunc();

});



// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.textContent.trim() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


const blogItems = document.querySelectorAll(".blog-post-item");

blogItems.forEach(item => {

  item.addEventListener("click", function (e) {

    e.preventDefault(); // empêche le lien de scroller en haut

    const key = this.dataset.detail;

    if (detailMap[key]) {

      detailContent.innerHTML = detailMap[key];

      detailBox.classList.remove("hidden");


      // cacher la liste des items de blog

      document.querySelector(".blog-posts").style.display = "none";

    }

  });

});

document.addEventListener("DOMContentLoaded", () => {

  // Fonction : afficher la bonne UE

  function afficherUE(sectionId) {

    // Cacher toutes les UE

    document.querySelectorAll(".ue-content").forEach(section => {

      section.style.display = "none";

    });


    // Cacher la liste des boutons de sélection

    const selectionSection = document.getElementById("ue-selection");

    if (selectionSection) selectionSection.style.display = "none";


    // Afficher la bonne section

    const target = document.getElementById(sectionId);

    if (target) {

      target.style.display = "block";

      window.scrollTo({ top: target.offsetTop, behavior: "smooth" });


      // Activer les modals de la section (si présente)

      if (typeof activerModalsDansSection === "function") {

        activerModalsDansSection(sectionId);

      }


      // Activer les pop-ups de la section

      if (sectionId === "ue4") {

        activerPopupsDansUE("ue4", ["UE4Trace1", "UE4Trace2", "UE4Trace3", "UE4Trace4"]);

      } else if (sectionId === "ue5") {

        activerPopupsDansUE("ue5", ["UE5Trace1", "UE5Trace2", "UE5Trace3"]);

      } else if (sectionId === "ue6") {

        activerPopupsDansUE("ue6", ["UE6Trace1", "UE6Trace2", "UE6Trace3", "UE6Trace4"]);

      }

    }

  }


  // Fonction : activer les pop-ups personnalisées

  function activerPopupsDansUE(sectionId, popupIds) {

    const section = document.getElementById(sectionId);

    if (!section) return;


    popupIds.forEach(id => {

      const ouvrirBtn = section.querySelector(`#ouvrirPopup${id}`);

      const fermerBtn = section.querySelector(`#fermerPopup${id}`);

      const popup = section.querySelector(`#popup${id}`);


      if (ouvrirBtn && fermerBtn && popup) {

        ouvrirBtn.addEventListener("click", () => popup.style.display = "flex");

        fermerBtn.addEventListener("click", () => popup.style.display = "none");


        window.addEventListener("click", (e) => {

          if (e.target === popup) popup.style.display = "none";

        });

      }

    });

  }


  // Clic sur les boutons d’ouverture des UE

  document.querySelectorAll(".ue-btn").forEach(btn => {

    btn.addEventListener("click", () => {

      const targetId = btn.getAttribute("data-ue-btn");

      afficherUE(targetId);

    });

  });


  // Clic sur les boutons retour

  document.querySelectorAll(".btn-retour").forEach(btn => {

    btn.addEventListener("click", () => {

      // Cacher toutes les sections UE

      document.querySelectorAll(".ue-content").forEach(section => {

        section.style.display = "none";

      });


      // Réafficher la liste des boutons UE

      const selectionSection = document.getElementById("ue-selection");

      if (selectionSection) selectionSection.style.display = "block";


      // Revenir en haut de la page

      window.scrollTo({ top: 0, behavior: "smooth" });

    });

  });

});








