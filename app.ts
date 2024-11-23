// resume form user input

const prevBtns = document.querySelectorAll<HTMLButtonElement>(".btn-prev");
const nextBtns = document.querySelectorAll<HTMLButtonElement>(".btn-next");
const progress = document.getElementById("progress") as HTMLElement;
const formSteps = document.querySelectorAll<HTMLElement>(".form-set");
const progressSteps = document.querySelectorAll<HTMLElement>(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps(): void {
  formSteps.forEach((formStep) => {
    if (formStep.classList.contains("form-set-active")) {
      formStep.classList.remove("form-set-active");
    }
  });

  formSteps[formStepsNum].classList.add("form-set-active");
}

function updateProgressbar(): void {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");
  if (progress) {
    progress.style.width =
      ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
  }
}

// Generate resume

const form = document.getElementById("form") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLDivElement;
const generateResume = document.getElementById("generateResume") as HTMLDivElement;
const shareableLinkContainer = document.getElementById("shareable-link-container") as HTMLDivElement;
const shareableLinkElement = document.getElementById("shareable-link") as HTMLAnchorElement;
const downloadPdfButton = document.getElementById("download") as HTMLButtonElement;

form.addEventListener("submit", async (event: Event) => {
  
  // prevents page reload
  event.preventDefault();

  // user input data

  // personal Info
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const country = (document.getElementById("country") as HTMLInputElement)
    .value;
  const city = (document.getElementById("city") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const number = (document.getElementById("number") as HTMLInputElement).value;
  const linkedinId = (document.getElementById("linkedinId") as HTMLInputElement)
    .value;

  // summary
  const summary = (document.getElementById("summary") as HTMLTextAreaElement)
    .value;

  // skills
  const skills = (document.getElementById("skill") as HTMLInputElement).value;
  // const description = (document.getElementById('description') as HTMLTextAreaElement).value

  // experience
  const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement)
    .value;
  const company = (document.getElementById("company") as HTMLInputElement)
    .value;
  const startFrom = (
    document.getElementById("jobStartDate") as HTMLInputElement
  ).value;
  const endOn = (document.getElementById("jobEndDate") as HTMLInputElement)
    .value;
  const detail = (document.getElementById("describe") as HTMLTextAreaElement)
    .value;

  // education
  const degree = (document.getElementById("degree") as HTMLInputElement).value;
  const field = (document.getElementById("field") as HTMLInputElement).value;
  const university = (document.getElementById("university") as HTMLInputElement)
    .value;
  const uniCountry = (document.getElementById("uniCountry") as HTMLInputElement)
    .value;
  const from = (document.getElementById("startDate") as HTMLInputElement).value;
  const to = (document.getElementById("endDate") as HTMLInputElement).value;

  // Save form data in localStorage with the username as the key
  const resumeData = {
    name,
    country,
    city,
    email,
    number,
    summary,
    skills,
    jobTitle,
    company,
    startFrom,
    endOn,
    detail,
    degree,
    field,
    university,
    uniCountry,
    from,
    to,
  };
  localStorage.setItem(name, JSON.stringify(resumeData));
  // Saving the data locally

  const resumeHtml = `<div style="margin: 20px; padding: 10px; margin-left:40px;">
    <div style='text-align: center;'>
        <h1><span contenteditable="true">${name.toUpperCase()}</span></h1>
        <p><span contenteditable="true">${city}</span>, <span contenteditable="true">${country}</span></p>
        <p><span contenteditable="true">${email}</span> | <span contenteditable="true">${number}</span></p>
        <p>LinkedIn Profile: <span contenteditable="true">${linkedinId}</span></p>
    </div>

    <div>
        <h2>Summary</h2>
        <p style="display: block-level; width: 800px; margin-left:40px"><span contenteditable="true">${summary}</span></p>
    </div>

    <div>
      <h2>Skills</h2>
        <div style="margin-left:40px; display: block-level; width: 800px;">
          <pre><span contenteditable="true">${skills}</span></pre>
        </div>
    </div>

    <div>
        <h2>Experience</h2>
        <div style="margin-left:40px">
        <b><span contenteditable="true">${jobTitle}</span></b>
        <br/>
        <small><span contenteditable="true">${company}</span> | <span contenteditable="true">${startFrom}</span> - <span contenteditable="true">${endOn}</span></small>
        <p style="display: block-level; width: 800px;">
        <i><span contenteditable="true">${detail}</span></i>
        </p>
        </div>
    </div>

    <div>
        <h2>Education</h2>
        <p>
            <b><span contenteditable="true">${degree}</span> <span contenteditable="true">${field}</span></b> | 
            <span contenteditable="true">${university}</span> - <span contenteditable="true">${uniCountry}</span>
            <br/>
            <small><span contenteditable="true">${from}</span> | <span contenteditable="true">${to}</span></small>
        </p>
    </div>
   </div>`;

  if (generateResume) {
    generateResume.innerHTML = resumeHtml;
  } else {
    console.error("element is missing");
  }

  // Generate a shareable URL with the username only
  const shareableURL = `${window.location.origin}?name=${encodeURIComponent(
    name
  )}`;
  // Display the shareable link
  shareableLinkContainer.style.display = "block";
  shareableLinkElement.href = shareableURL;
  shareableLinkElement.textContent = shareableURL;

  // shift page
  form.style.display = "none";
  resumePage.style.display = "block";
});

// Handle PDF download
downloadPdfButton.addEventListener("click", () => {
  window.print()
  // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("name");
  if (username) {
    // Autofill form if data is found in localStorage
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);

      (document.getElementById("name") as HTMLInputElement).value =
        resumeData.name;
      (document.getElementById("country") as HTMLInputElement).value =
        resumeData.country;
      (document.getElementById("city") as HTMLInputElement).value =
        resumeData.city;
      (document.getElementById("email") as HTMLInputElement).value =
        resumeData.email;
      (document.getElementById("number") as HTMLInputElement).value =
        resumeData.number;
      (document.getElementById("linkedinId") as HTMLInputElement).value =
        resumeData.linkedinId;

      // summary
      (document.getElementById("summary") as HTMLTextAreaElement).value =
        resumeData.summary;

      // skills
      (document.getElementById("skill") as HTMLInputElement).value =
        resumeData.skill;
      // const description = (document.getElementById('description') as HTMLTextAreaElement).value

      // experience
      (document.getElementById("jobTitle") as HTMLInputElement).value =
        resumeData.jobTitle;
      (document.getElementById("company") as HTMLInputElement).value =
        resumeData.company;
      (document.getElementById("jobStartDate") as HTMLInputElement).value =
        resumeData.jobStartDate;
      (document.getElementById("jobEndDate") as HTMLInputElement).value =
        resumeData.jobEndDate;
      (document.getElementById("describe") as HTMLTextAreaElement).value =
        resumeData.describe;

      // education
      (document.getElementById("degree") as HTMLInputElement).value =
        resumeData.degree;
      (document.getElementById("field") as HTMLInputElement).value =
        resumeData.field;
      (document.getElementById("university") as HTMLInputElement).value =
        resumeData.university;
      (document.getElementById("uniCountry") as HTMLInputElement).value =
        resumeData.uniCountry;
      (document.getElementById("startDate") as HTMLInputElement).value =
        resumeData.startDate;
      (document.getElementById("endDate") as HTMLInputElement).value =
        resumeData.endDate;
    }
  }
});
