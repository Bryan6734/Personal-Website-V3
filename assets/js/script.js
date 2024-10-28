"use strict";

const lenis = new Lenis();

lenis.on("scroll", (e) => {
	// console.log(e);
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ensure scroll is at 0

var radius = 250;

if (window.innerWidth < 768) {
	radius = 180;
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
		"scikit-Learn",
		"TensorFlow",
		"PyTorch",
		"React.js",
		"Bootstrap",
		"Firebase",
        "MongoDB",
        "Hugging Face"
	],
	{
		radius: radius,
		maxSpeed: "fast",
		initSpeed: "fast",
		direction: 135,
		keep: true,
		itemClass: "word-cloud-item",
	}
);



// if  you click on a html with tag "timeline"
document.querySelectorAll(".timeline").forEach((timeline) => {
    // // find ol.timeline
    // const ol = timeline.querySelector("ol.timeline-list");
    // // flip "hidden" class on click
    // timeline.addEventListener("click", () => {
    //     ol.classList.toggle("hidden");
    // });
    // console.log(ol);
});

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

		const modalSkillsList = this.querySelector("[data-project-skills]").innerHTML.trim().split(", ");

		const skillsHTML = modalSkillsList.map((skill) => `<span class="chip">${skill}</span>`).join(" ");

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

document.addEventListener("DOMContentLoaded", (event) => {
	window.scrollTo(0, 0);

	// Ensure the page is scrolled to the top

	setTimeout(() => {
		window.scrollTo(0, 0);
		// To make sure Lenis updates correctly after scrolling
		// lenis.update();
		const tl = gsap.timeline();

		// get slider
		const slider = document.querySelector(".welcome-slider");
		const sidebar = document.querySelector(".sidebar");
		const hero = document.querySelector(".main-content");

		tl.fromTo(
			slider,
			{
				borderRadius: "200%",
			},
			{
				translateY: "-100%",
				ease: "power2.out",
				duration: 1.5,
				delay: 1,
				borderRadius: "50%",
			},
			0
		)
			.fromTo(
				sidebar,
				{
					translateY: "500px",
					opacity: 0,
				},
				{
					opacity: 1,
					translateY: "0%",
					ease: "power2.out",
					duration: 1.1,
					delay: 1.3,
				},
				0
			)
			.fromTo(
				hero,
				{
					translateY: "600px",
					opacity: 0,
				},
				{
					translateY: "0;",
					opacity: 1,
					ease: "power2.out",
					duration: 1.1,
					delay: 1.32,
				},
				0
			)
			.fromTo(
				".mapbox",
				{
					display: "none",
					opacity: 0,
					translateY: "250%",
				},
				{
					display: "block",
					opacity: 1,
					translateY: "0%",
					ease: "power2.out",
					duration: 1.1,
					delay: 1.35,
				},
				0
			)
			.fromTo(
				".word-cloud",
				{
					scale: 0,
				},
				{
					scale: 1,
					ease: "power2.out",
					duration: 1.1,
					delay: 0.3,
				},
				1
			);
		if (window.innerWidth < 1024) {
			tl.fromTo(
				".navbar",
				{
					translateY: "+=100%",
					position: "absolute",
				},
				{
					translateY: "0%",
					position: "fixed",
					opacity: 1,
					ease: "power2.out",
					duration: 0.9,
					delay: 1.4,
				},
				1
			);
		}
	}, 50);
});

let navbar = document.querySelector(".navbar");

window.addEventListener("DOMContentLoaded", function () {
	// Run this code once at the beginning of the site

	if (window.innerWidth < 1024) {
		// move the navbar outside of its parent
		document.body.appendChild(navbar);
	} else {
		// move the navbar back to its parent
		document.querySelector(".main-content").appendChild(navbar);
	}

	// Add event listener for window resize
	window.addEventListener("resize", function () {
		if (window.innerWidth < 1024) {
			// move the navbar outside of its parent
			document.body.appendChild(navbar);
		} else {
			// move the navbar back to its parent
			document.querySelector(".main-content").appendChild(navbar);
		}
	});
});
