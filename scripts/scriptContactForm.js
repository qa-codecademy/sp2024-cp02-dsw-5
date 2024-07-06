let uiService = {
  displayContactForm: function () {
    document.getElementById("contactForm").innerHTML = `
        <div id="contactFormText">
          <h2 class="textTitle">Contact Us</h2>
          <div id="textBody">
            <p>Have a question? Please feel free to contact our team below or email us directly at <a id="contactEmail" href=mailto:"customers@signature.com">customers@signature.com</a>.</p>
            <p>We are available Monday-Saturday 07:00 - 17:00 and Sunday 08:00 - 15:00.</p>
          <div>
        </div>
        <div id="contactFormContainer">
          <form>
            <fieldset id="contactFieldset">
              <div id="formErrorName"></div>
              <label for="fullName">Full Name</label>
              <input type="text" name="name" id="fullName" placeholder="First and Last Name" required/><br/>
              <br/><div id="formErrorEmail"></div>
              <label for="emailAddress">Email Address</label>
              <input type="email" id="emailAddress" placeholder="Email" required/>
              <br/><br/><div id="formErrorIssue"></div>
              <label for="contactIssue">Issue</label>
              <select name="contactIssue" id="contactIssue">
                <option selected disabled value="select">Select</option>
                <option value="generalQuestions">General Questions</option>
                <option value="orderErrors">Order Errors</option>
                <option value="returnExchange">Return / Exchange</option>
                <option value="collaboration">Collaboration</option>
                <option value="promotions">Promotions</option>
              </select>
              <br/><br/><div id="formErrorMessage"></div>
              <label for="contactMessage">Message</label>
                <textarea rows="4" name="contactMessage" id="contactMessage" placeholder="Your message here..." required></textarea>
              <br/>
              <div id="formSuccess"></div>
              <div class="buttonContainer">
                <button id="submit" type="submit">Submit</button>
              </div>
            </fieldset>
          </form>
        </div>
      `;
  }
};
uiService.displayContactForm();


let contactSubmitButton = document.getElementById("submit");

contactSubmitButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (validateForm()) {
    let formSuccess = document.getElementById("formSuccess");
    formSuccess.innerHTML = `<p class="successMessage">Form successfully submitted.</p>`;
    setTimeout(() => {
      formSuccess.innerHTML = ""; // Clear success message after a delay
    }, 3000);
    let contactFullname = document.getElementById("fullName").value;
    let contactEmail = document.getElementById("emailAddress").value;
    let contactIssue = document.getElementById("contactIssue").value;
    let contactMessage = document.getElementById("contactMessage").value;
    resetForm();
  }; //false or true indicates if it's true, the form can be submitted, if it's false, form should not be submitted

});

function validateForm() {
  //Div for error message
  let formErrorName = document.getElementById("formErrorName");
  let formErrorEmail = document.getElementById("formErrorEmail");
  let formErrorIssue = document.getElementById("formErrorIssue");
  let formErrorMessage = document.getElementById("formErrorMessage");
  //Fields from form input
  let contactFullname = document.getElementById("fullName").value;
  let contactEmail = document.getElementById("emailAddress").value;
  let contactIssue = document.getElementById("contactIssue").value;
  let contactMessage = document.getElementById("contactMessage").value;

  //Name validation
  let isNameValid = validate.name(contactFullname);
  if (!isNameValid) {
    formErrorName.innerHTML = `<p class="errorMessage">Please enter full name.</p>`;
    return false;
  } else {
    formErrorName.innerText = "";
  }
  //Email validation
  let isEmailValid = validate.email(contactEmail);
  if (!isEmailValid) {
    formErrorEmail.innerHTML = `<p class="errorMessage">Invalid email address.</p>`;
    return false;
  } else {
    formErrorEmail.innerText = "";
  }
  //Issue validation
  let isIssueValid = validate.issue(contactIssue);
  if (!isIssueValid) {
    formErrorIssue.innerHTML = `<p class="errorMessage">Please select option.</p>`;
    return false;
  } else {
    formErrorIssue.innerText = "";
  }
  //Message validation
  let isMessageValid = validate.message(contactMessage);
  if (!isMessageValid) {
    formErrorMessage.innerHTML = `<p class="errorMessage">Your message has to contain at least 20 characters.</p>`;
    return false;
  } else {
    formErrorMessage.innerText = "";
  }
  return true;
};

let validate = {
  NAME_REGEX: /^[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$/,
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  name: function (name) {
    if (!name) {
      return false;
    }
    if (!this.NAME_REGEX.test(name)) {
      return false;
    }
    let nameParts = name.trim().split(/\s+/); // Split by whitespace
    if (nameParts.length < 2 || nameParts[0].length < 3 || nameParts[1].length < 3) {
      return false;
    }
    return true;
  },
  email: function (email) {
    if (!email) {
      return false;
    }
    if (!this.EMAIL_REGEX.test(email)) {
      return false;
    }
    return true;
  },
  issue: function (issue) {
    if (issue === "select") {
      return false;
    }
    return true;
  },
  message: function (message) {
    if (message.length < 20) {
      return false;
    }
    return true;
  }
};

function resetForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("emailAddress").value = "";
  document.getElementById("contactIssue").value = "select";
  document.getElementById("contactMessage").value = "";
  document.getElementById("formErrorName").innerText = "";
};



