// resume form user input
var prevBtns = document.querySelectorAll(".btn-prev");
var nextBtns = document.querySelectorAll(".btn-next");
var progress = document.getElementById("progress");
var formSteps = document.querySelectorAll(".form-set");
var progressSteps = document.querySelectorAll(".progress-step");
var formStepsNum = 0;
nextBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
    });
});
prevBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
    });
});
function updateFormSteps() {
    formSteps.forEach(function (formStep) {
        if (formStep.classList.contains("form-set-active")) {
            formStep.classList.remove("form-set-active");
        }
    });
    formSteps[formStepsNum].classList.add("form-set-active");
}
function updateProgressbar() {
    progressSteps.forEach(function (progressStep, idx) {
        if (idx < formStepsNum + 1) {
            progressStep.classList.add("progress-step-active");
        }
        else {
            progressStep.classList.remove("progress-step-active");
        }
    });
    var progressActive = document.querySelectorAll(".progress-step-active");
    if (progress) {
        progress.style.width =
            ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
    }
}
// Generate resume
var form = document.getElementById("form");
var resumePage = document.getElementById("resumePage");
var generateResume = document.getElementById("generateResume");
var shareableLinkContainer = document.getElementById("shareable-link-container");
var shareableLinkElement = document.getElementById("shareable-link");
var downloadPdfButton = document.getElementById("download");
form.addEventListener("submit", function (event) {
    // prevents page reload
    event.preventDefault();
    // user input data
    // personal Info
    var name = document.getElementById("name").value;
    var country = document.getElementById("country")
        .value;
    var city = document.getElementById("city").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
    var linkedinId = document.getElementById("linkedinId")
        .value;
    // summary
    var summary = document.getElementById("summary")
        .value;
    // skills
    var skills = document.getElementById("skill").value;
    // const description = (document.getElementById('description') as HTMLTextAreaElement).value
    // experience
    var jobTitle = document.getElementById("jobTitle")
        .value;
    var company = document.getElementById("company")
        .value;
    var startFrom = document.getElementById("jobStartDate").value;
    var endOn = document.getElementById("jobEndDate")
        .value;
    var detail = document.getElementById("describe")
        .value;
    // education
    var degree = document.getElementById("degree").value;
    var field = document.getElementById("field").value;
    var university = document.getElementById("university")
        .value;
    var uniCountry = document.getElementById("uniCountry")
        .value;
    var from = document.getElementById("startDate").value;
    var to = document.getElementById("endDate").value;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        country: country,
        city: city,
        email: email,
        number: number,
        summary: summary,
        skills: skills,
        jobTitle: jobTitle,
        company: company,
        startFrom: startFrom,
        endOn: endOn,
        detail: detail,
        degree: degree,
        field: field,
        university: university,
        uniCountry: uniCountry,
        from: from,
        to: to,
    };
    localStorage.setItem(name, JSON.stringify(resumeData));
    // Saving the data locally
    var resumeHtml = "<div style=\"margin: 20px; padding: 10px; margin-left:40px;\">\n    <div style='text-align: center;'>\n        <h1><span contenteditable=\"true\">".concat(name.toUpperCase(), "</span></h1>\n        <p><span contenteditable=\"true\">").concat(city, "</span>, <span contenteditable=\"true\">").concat(country, "</span></p>\n        <p><span contenteditable=\"true\">").concat(email, "</span> | <span contenteditable=\"true\">").concat(number, "</span></p>\n        <p>LinkedIn Profile: <span contenteditable=\"true\">").concat(linkedinId, "</span></p>\n    </div>\n\n    <div>\n        <h2>Summary</h2>\n        <p style=\"display: block-level; width: 800px; margin-left:40px\"><span contenteditable=\"true\">").concat(summary, "</span></p>\n    </div>\n\n    <div>\n      <h2>Skills</h2>\n        <div style=\"margin-left:40px; display: block-level; width: 800px;\">\n          <pre><span contenteditable=\"true\">").concat(skills, "</span></pre>\n        </div>\n    </div>\n\n    <div>\n        <h2>Experience</h2>\n        <div style=\"margin-left:40px\">\n        <b><span contenteditable=\"true\">").concat(jobTitle, "</span></b>\n        <br/>\n        <small><span contenteditable=\"true\">").concat(company, "</span> | <span contenteditable=\"true\">").concat(startFrom, "</span> - <span contenteditable=\"true\">").concat(endOn, "</span></small>\n        <p style=\"display: block-level; width: 800px;\">\n        <i><span contenteditable=\"true\">").concat(detail, "</span></i>\n        </p>\n        </div>\n    </div>\n\n    <div>\n        <h2>Education</h2>\n        <p>\n            <b><span contenteditable=\"true\">").concat(degree, "</span> <span contenteditable=\"true\">").concat(field, "</span></b> | \n            <span contenteditable=\"true\">").concat(university, "</span> - <span contenteditable=\"true\">").concat(uniCountry, "</span>\n            <br/>\n            <small><span contenteditable=\"true\">").concat(from, "</span> | <span contenteditable=\"true\">").concat(to, "</span></small>\n        </p>\n    </div>\n   </div>");
    if (generateResume) {
        generateResume.innerHTML = resumeHtml;
    }
    else {
        console.error("element is missing");
    }
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?name=").concat(encodeURIComponent(name));
    // Display the shareable link
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
    // shift page
    form.style.display = "none";
    resumePage.style.display = "block";
});
// Handle PDF download
downloadPdfButton.addEventListener("click", function () {
    window.print();
    // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("name");
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById("name").value =
                resumeData.name;
            document.getElementById("country").value =
                resumeData.country;
            document.getElementById("city").value =
                resumeData.city;
            document.getElementById("email").value =
                resumeData.email;
            document.getElementById("number").value =
                resumeData.number;
            document.getElementById("linkedinId").value =
                resumeData.linkedinId;
            // summary
            document.getElementById("summary").value =
                resumeData.summary;
            // skills
            document.getElementById("skill").value =
                resumeData.skill;
            // const description = (document.getElementById('description') as HTMLTextAreaElement).value
            // experience
            document.getElementById("jobTitle").value =
                resumeData.jobTitle;
            document.getElementById("company").value =
                resumeData.company;
            document.getElementById("jobStartDate").value =
                resumeData.jobStartDate;
            document.getElementById("jobEndDate").value =
                resumeData.jobEndDate;
            document.getElementById("describe").value =
                resumeData.describe;
            // education
            document.getElementById("degree").value =
                resumeData.degree;
            document.getElementById("field").value =
                resumeData.field;
            document.getElementById("university").value =
                resumeData.university;
            document.getElementById("uniCountry").value =
                resumeData.uniCountry;
            document.getElementById("startDate").value =
                resumeData.startDate;
            document.getElementById("endDate").value =
                resumeData.endDate;
        }
    }
});
