"use strict";

var radius = 250;

if (window.innerWidth < 768) {
  radius = 150;
}

var tag_cloud = TagCloud(
  ".word-cloud",
  [
    "Python",
    "JavaScript",
    "Java",
    "C#",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Seaborn",
    "SciPy",
    "ScanPy",
    "statsmodels",
    "scikit-Learn",
    "TensorFlow",
    "PyTorch",
    "React.js",
    "MUI",
    "Bootstrap",
    "Firebase",
    "MongoDB",
    "Node.js",
    "Leaflet",

  ],
  {
    radius: radius,
    maxSpeed: "fast",
    initSpeed: "fast",
    direction: 135,
    keep: true,
    itemClass: "word-cloud-item"
  }
);


// if screen width is less than 768px, change radius from 250 to 150

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// projects variables
const projectsItem = document.querySelectorAll("[data-project-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalTime = document.querySelector("[data-modal-time]");
const modalSkills = document.querySelector("[data-modal-skills]");
const modalLink = document.querySelector("[data-modal-link]");
// modal toggle function
const projectsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < projectsItem.length; i++) {
  projectsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-project-img]").src;
    modalImg.alt = this.querySelector("[data-project-img]").alt;
    modalTitle.innerHTML = this.querySelector("[data-project-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-project-desc]").innerHTML;
    modalTime.innerHTML = this.querySelector("[data-project-time]").innerHTML;

    if (this.querySelector("[data-project-link]").innerHTML === "") {
      modalLink.href = "";
      modalLink.classList.add("disabled");
      modalLink.addEventListener("click", function (event) {
        event.preventDefault();
      });
    } else {
      modalLink.href = this.querySelector("[data-project-link]").innerHTML;
    }

    const modalSkillsList = this.querySelector("[data-project-skills]")
      .innerHTML.trim()
      .split(", ");

    const skillsHTML = modalSkillsList
      .map((skill) => `<span class="chip">${skill}</span>`)
      .join(" ");

    modalSkills.innerHTML = skillsHTML;

    projectsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", projectsModalFunc);
overlay.addEventListener("click", projectsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

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
};

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
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
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

// (function () {
//   // https://dashboard.emailjs.com/admin/account
//   emailjs.init("Me6GoQ5XMsum2cn9T");
// })();

// window.onload = function () {
//   document
//     .getElementById("contact-form")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();
//       // generate a five digit number for the contact_number variable
//       this.contact_number.value = (Math.random() * 100000) | 0;
//       // these IDs from the previous steps
//       emailjs.sendForm("service_1jx83rh", "template_3b5o7u5", this).then(
//         function () {
//           console.log("SUCCESS!");

//           alert("Your message has been sent. Thank you!");
//           // disable button
//           document.getElementById("form-btn").disabled = true;
//         },
//         function (error) {
//           console.log("FAILED...", error);
//         }
//       );
//     });
// };

// // email js

// emailjs.init("YOUR_USER_ID"); // Replace with your user ID

// window.onload = function () {
//   document
//     .getElementById("myForm")
//     .addEventListener("submit", function (event) {
//       event.preventDefault(); // Prevent the default form submission

//       emailjs.sendForm("service_1jx83rh", "template_3b5o7u5", this).then(
//         function () {
//           console.log("SUCCESS!");
//           // You can clear the form or display a success message
//         },
//         function (error) {
//           console.log("FAILED...", error);
//           // You can display an error message
//         }
//       );
//     });
// };
