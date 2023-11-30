let selectedPackageContainer;
document.querySelectorAll(".package-container").forEach(function (packageContainer) {
    packageContainer.addEventListener("click", function () {
      const isSelected = packageContainer.classList.contains("selected");
      
      document.querySelectorAll(".package-container").forEach(function (otherPackage) {
        otherPackage.classList.remove("selected");
      });
  
      // Enable continue button if not selected
      const continueButton = document.getElementById("btn-continue");
      continueButton.disabled = isSelected;
  
      if (!isSelected) {
        packageContainer.classList.add("selected");
              // Set the global variable
      selectedPackageContainer = packageContainer;
      }
  
      // Print the selected package details
      const packageName = packageContainer.querySelector(".pkg-name").textContent;
      const packagePrice = packageContainer.querySelector(".pkg-price").textContent;
      console.log("Selected Package:", packageName);
      console.log("Package Price:", packagePrice);
    });
  });
  
// Function to handle Continue button click (you can customize this function)
function continueButtonClick() {

    const chkPkgSelCheckbox = document.getElementById("chk-pkg-sel");
    
    if(chkPkgSelCheckbox.checked === false){
        
    if (chkPkgSelCheckbox) {
        chkPkgSelCheckbox.checked = true;
    }

    const packageSelectionSection = document.getElementById("pkg-sel");
    packageSelectionSection.classList.add("hidden");

    const packageSection = document.getElementById("pkg");
    packageSection.classList.remove("hidden");

    const rightSectionTitle = document.getElementById("rightSectionTitle");
    rightSectionTitle.textContent = "Package";

    const packageName = selectedPackageContainer.querySelector(".pkg-name").textContent;
    const packagePrice = selectedPackageContainer.querySelector(".pkg-price").textContent;
    document.getElementById("selected-pkg").textContent = packageName;
    document.getElementById("selected-pkg2").textContent = packageName +" includes:";
    document.getElementById("selected-pkg-price").textContent = packagePrice;
    }
    else {
        const chkPkgCheckbox = document.getElementById("chk-pkg");
    
        if(chkPkgCheckbox.checked === false){
            
        if (chkPkgCheckbox) {
            chkPkgCheckbox.checked = true;
        }
    
        const originalRightSection = document.getElementById("pkg");
        originalRightSection.classList.add("hidden");
    
        const newRightSection = document.getElementById("appointments");
        newRightSection.classList.remove("hidden");
    
        const rightSectionTitle = document.getElementById("rightSectionTitle");
        rightSectionTitle.textContent = "Appointments";
        }
    }
}

function toggleCard() {
    var card = document.getElementById("myCard");
    var expandableContent = document.getElementById("expandableContent");
    var arrowIcon = document.getElementById("arrowIcon");

    if (expandableContent.style.display === "block") {
      expandableContent.style.display = "none";
      arrowIcon.innerHTML = "&#9660;"; // Downward arrow when collapsed
      card.style.height = "auto";
    } else {
      expandableContent.style.display = "block";
      arrowIcon.innerHTML = "&#9650;"; // Upward arrow when expanded
      card.style.height = "auto"; // Set the desired expanded height or remove this line for dynamic height
    }
  }
  
  function toggleSimplyOrganize() {
    var card = document.getElementById("simplyOrganizeCard");
    var expandableContent = document.getElementById("simplyexpandableContent");
    var arrowIcon = document.getElementById("simplyarrowIcon");

    if (expandableContent.style.display === "block") {
      expandableContent.style.display = "none";
      arrowIcon.innerHTML = "&#9660;"; // Downward arrow when collapsed
      card.style.height = "auto";
    } else {
      expandableContent.style.display = "block";
      arrowIcon.innerHTML = "&#9650;"; // Upward arrow when expanded
      card.style.height = "auto"; // Set the desired expanded height or remove this line for dynamic height
    }
  }  

  function toggleDecluttering() {
    var card = document.getElementById("decluttering");
    var expandableContent = document.getElementById("declutteringexpandableContent");
    var arrowIcon = document.getElementById("declutteringarrowIcon");

    if (expandableContent.style.display === "block") {
      expandableContent.style.display = "none";
      arrowIcon.innerHTML = "&#9660;"; // Downward arrow when collapsed
      card.style.height = "auto";
    } else {
      expandableContent.style.display = "block";
      arrowIcon.innerHTML = "&#9650;"; // Upward arrow when expanded
      card.style.height = "auto"; // Set the desired expanded height or remove this line for dynamic height
    }
  }  

function showRightSection(sectionId, title) {
    // Hide all right sections
    document.querySelectorAll('.rs-container').forEach(function (section) {
        section.classList.add('hidden');
    });

    // Show the selected right section
    document.getElementById(sectionId).classList.remove('hidden');

    // Update the title in the right section
    document.getElementById('rightSectionTitle').textContent = title;
}

// Function to handle button clicks and show corresponding right section
function buttonClick(sectionId, title) {
    showRightSection(sectionId, title);
}
