let selectedPackageContainer;
let selectedpaymentMethod;

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
      selectedPackageContainer = packageContainer;
    }

    const packageName = packageContainer.querySelector(".pkg-name").textContent;
    const packagePrice = packageContainer.querySelector(".pkg-price").textContent;
    console.log("Selected Package:", packageName);
    console.log("Package Price:", packagePrice);
  });
});

// Function to handle Continue button click (you can customize this function)
function continueButtonClick() {
  const chkPkgSelCheckbox = document.getElementById("chk-pkg-sel");
  const rightSectionTitle = document.getElementById("rightSectionTitle");

  switch (true) {
    case !chkPkgSelCheckbox.checked:
      if (chkPkgSelCheckbox) chkPkgSelCheckbox.checked = true;

      const packageSelectionSection = document.getElementById("pkg-sel");
      packageSelectionSection.classList.add("hidden");

      const packageSection = document.getElementById("pkg");
      packageSection.classList.remove("hidden");

      rightSectionTitle.textContent = "Package";

      const packageName = selectedPackageContainer.querySelector(".pkg-name").textContent;
      const packagePrice = selectedPackageContainer.querySelector(".pkg-price").textContent;
      document.getElementById("selected-pkg").textContent = packageName;
      document.getElementById("selected-pkg2").textContent = packageName + " includes:";
      document.getElementById("selected-pkg-price").textContent = packagePrice;
      document.getElementById("stripe-pay").textContent = packagePrice;
      document.getElementById("packageName").textContent = packageName;
      document.getElementById("subtotal").textContent = packagePrice;
      document.getElementById("paypalamnt").textContent = packagePrice;
      
      var numericPrice = parseFloat(packagePrice.replace(/[\$,]/g, ""));
      var total = numericPrice + 10;
      document.getElementById("total").textContent = total;
      break;

    case !document.getElementById("chk-pkg").checked:
      const chkPkgCheckbox = document.getElementById("chk-pkg");
      if (chkPkgCheckbox) chkPkgCheckbox.checked = true;

      const originalRightSection = document.getElementById("pkg");
      originalRightSection.classList.add("hidden");

      const newRightSection = document.getElementById("appointments");
      newRightSection.classList.remove("hidden");

      rightSectionTitle.textContent = "Appointments";
      break;

    case !document.getElementById("chk-appointments").checked:
      const chkAppointmentCheckbox = document.getElementById("chk-appointments");
      if (chkAppointmentCheckbox) chkAppointmentCheckbox.checked = true;

      const originalAppointmentsSection = document.getElementById("appointments");
      originalAppointmentsSection.classList.add("hidden");

      const newInfoSection = document.getElementById("your-info");
      newInfoSection.classList.remove("hidden");

      rightSectionTitle.textContent = "Your Info";
      break;

    case !document.getElementById("chk-info").checked:
      const chkInfoCheckbox = document.getElementById("chk-info");
      var firstName = document.getElementById("firstName").value;
      var lastName = document.getElementById("lastName").value;
      var country = document.getElementById("country").value;
      var address = document.getElementById("address").value;
      var city = document.getElementById("city").value;
      var state = document.getElementById("state").value;
      var zipcode = document.getElementById("zipcode").value;

      if (!firstName || !lastName || !country || !address || !city || !state || !zipcode) {
        document.getElementById("error-txt").textContent = "All fields must be filled.";
        
      }

      if (!selectedpaymentMethod) {
        document.getElementById("error-txt").textContent = "Must Select a payment method!";
        return;
      }

      if (chkInfoCheckbox) chkInfoCheckbox.checked = true;

      if(selectedpaymentMethod === "visa"){
        document.getElementById("selectedPaymentMethod").textContent = "Debit / Credit Card";

      }
      else{
        document.getElementById("selectedPaymentMethod").textContent = selectedpaymentMethod.charAt(0).toUpperCase() + selectedpaymentMethod.slice(1);

      }

      const originalInfoSection = document.getElementById("your-info");
      originalInfoSection.classList.add("hidden");

      const paymentSection = document.getElementById("payments");
      paymentSection.classList.remove("hidden");

      rightSectionTitle.textContent = "Payment";

      const stripeSection = document.getElementById("opt-stripe");
      const paypalSection = document.getElementById("opt-paypal");
      const visaSection = document.getElementById("opt-visa");
    
      stripeSection.classList.add("hidden");
      paypalSection.classList.add("hidden");
      visaSection.classList.add("hidden");
    
      if (selectedpaymentMethod.toLowerCase().includes("stripe")) {
        stripeSection.classList.remove("hidden");
      }
      if (selectedpaymentMethod.toLowerCase().includes("paypal") ) {
        paypalSection.classList.remove("hidden");
      }
      if (selectedpaymentMethod.toLowerCase().includes("visa")) {
        visaSection.classList.remove("hidden");
      }

      break;
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


document.addEventListener('DOMContentLoaded', function () {
  const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');

  paymentMethods.forEach(function (method) {
    method.addEventListener('change', function () {
      selectedpaymentMethod = this.value;
    });
  });

});
