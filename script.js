const languageButtons = document.querySelectorAll(".lang-btn");

const chineseContent = document.querySelectorAll(".lang-cn");
const englishContent = document.querySelectorAll(".lang-en");


languageButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedLanguage = button.dataset.lang;


        languageButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        if (selectedLanguage === "cn") {

            chineseContent.forEach((item) => {
                item.style.display = "block";
            });

            englishContent.forEach((item) => {
                item.style.display = "none";
            });

        }


        if (selectedLanguage === "en") {

            chineseContent.forEach((item) => {
                item.style.display = "none";
            });

            englishContent.forEach((item) => {
                item.style.display = "block";
            });

        }

    });

});
/* =========================================
   SYSTEM MAP — MOBILE INTERACTION
========================================= */

const systemNodes =
    document.querySelectorAll(".system-node");


systemNodes.forEach((node) => {

    node.addEventListener("click", () => {

        const isActive =
            node.classList.contains("active");


        systemNodes.forEach((item) => {
            item.classList.remove("active");
        });


        if (!isActive) {
            node.classList.add("active");
        }

    });

});
/* =========================================
   HOW I DESIGN — EVIDENCE INTERACTION
========================================= */

const designSteps =
    document.querySelectorAll(".design-step");

const evidenceImages =
    document.querySelectorAll(".evidence-image");


function activateDesignStep(stepName) {

    /* LEFT */

    designSteps.forEach((step) => {

        if (step.dataset.step === stepName) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }

    });


    /* RIGHT */

    evidenceImages.forEach((image) => {

        if (image.dataset.group === stepName) {
            image.classList.add("is-active");
        } else {
            image.classList.remove("is-active");
        }

    });

}


/* hover */

designSteps.forEach((step) => {

    step.addEventListener("mouseenter", () => {

        activateDesignStep(
            step.dataset.step
        );

    });

});


/* click for tablet / mobile */

designSteps.forEach((step) => {

    step.addEventListener("click", () => {

        activateDesignStep(
            step.dataset.step
        );

    });

});


/* default */

activateDesignStep("understand");
/* =========================================
   SELECTED WORK — PROJECT PAGE TURN
========================================= */

const portfolioSheets =
    document.querySelectorAll(".portfolio-sheet");

const deckCurrent =
    document.querySelector(".deck-current");

const deckPrev =
    document.querySelector(".deck-prev");

const deckNext =
    document.querySelector(".deck-next-button");


let currentProjectIndex = 0;

let projectIsTurning = false;



/* -----------------------------------------
   SHOW PROJECT
----------------------------------------- */

function showProject(index) {

    portfolioSheets.forEach((sheet) => {

        sheet.classList.remove("active");
        sheet.classList.remove("turning");

    });


    currentProjectIndex = index;


    portfolioSheets[currentProjectIndex]
        .classList.add("active");


    if (deckCurrent) {

        deckCurrent.textContent =
            String(currentProjectIndex + 1)
            .padStart(2, "0");

    }

}



/* -----------------------------------------
   TURN TO PROJECT
----------------------------------------- */

function turnToProject(nextIndex) {

    if (projectIsTurning) {
        return;
    }


    projectIsTurning = true;


    const currentSheet =
        portfolioSheets[currentProjectIndex];


    currentSheet.classList.add("turning");


    setTimeout(() => {

        showProject(nextIndex);

        projectIsTurning = false;

    }, 380);

}



/* -----------------------------------------
   NEXT
----------------------------------------- */

function nextProject() {

    const nextIndex =
        (currentProjectIndex + 1)
        % portfolioSheets.length;


    turnToProject(nextIndex);

}



/* -----------------------------------------
   PREVIOUS
----------------------------------------- */

function previousProject() {

    const previousIndex =
        (
            currentProjectIndex
            - 1
            + portfolioSheets.length
        )
        % portfolioSheets.length;


    turnToProject(previousIndex);

}



/* -----------------------------------------
   CLICK COVER = NEXT
----------------------------------------- */

portfolioSheets.forEach((sheet) => {

    const cover =
        sheet.querySelector(".sheet-cover");


    if (cover) {

        cover.addEventListener(
            "click",
            nextProject
        );

    }

});



/* -----------------------------------------
   ARROWS
----------------------------------------- */

if (deckNext) {

    deckNext.addEventListener(
        "click",
        nextProject
    );

}


if (deckPrev) {

    deckPrev.addEventListener(
        "click",
        previousProject
    );

}



/* -----------------------------------------
   INITIAL PROJECT
----------------------------------------- */

if (portfolioSheets.length > 0) {

    showProject(0);

}