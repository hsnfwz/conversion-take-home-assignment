// STYLES

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://raw.githubusercontent.com/hsnfwz/conversion-take-home-assignment/main/task1-dynamic-modal/style.css";
document.head.appendChild(link);

// DATA

const contactFormStepTexts = [
  "User Information",
  "Inquiry",
  "Complete"
];

let firstName = '';
let lastName = '';
let email = '';
let isEmailCorrect = false;

// FUNCTIONS

function checkInputs(target) {
  if (target.name === 'firstname') {
    firstName = target.value.trim();
  } else if (target.name === 'lastname') {
    lastName = target.value.trim();
  } else if (target.name === 'email') {
    email = target.value.trim();
    isEmailCorrect = target.checkValidity() && document.querySelectorAll('.hs-error-msgs').length === 0;
  }

  if (
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    isEmailCorrect
  ) {
    contactFormNextPageButtonElement.disabled = false;
  } else {
    contactFormNextPageButtonElement.disabled = true;
  }
}

function createContactUsButton() {
  const contactUsButtonElement = document.createElement('button');
  contactUsButtonElement.id = "contact-us-button";
  contactUsButtonElement.disabled = false;

  const contactUsButtonTopElement = document.createElement('div');
  contactUsButtonTopElement.id = 'contact-us-button-top';

  const contactUsButtonBottomElement = document.createElement('div');
  contactUsButtonBottomElement.id = 'contact-us-button-bottom';

  const contactUsButtonLeftElement = document.createElement('div');
  contactUsButtonLeftElement.id = 'contact-us-button-left';

  const contactUsButtonRightElement = document.createElement('div');
  contactUsButtonRightElement.id = 'contact-us-button-right';

  const contactUsButtonMiddleElement = document.createElement('div');
  contactUsButtonMiddleElement.id = 'contact-us-button-middle';
  contactUsButtonMiddleElement.textContent = "CLICK ME";

  const contactUsButtonShadowElement = document.createElement('div');
  contactUsButtonShadowElement.id = 'contact-us-button-shadow';

  contactUsButtonElement.append(contactUsButtonTopElement, contactUsButtonBottomElement, contactUsButtonLeftElement, contactUsButtonRightElement, contactUsButtonMiddleElement, contactUsButtonShadowElement);

  return contactUsButtonElement;
}

function createContactSection(contactUsButtonElement) {
  const contactSectionElement = document.createElement('section');
  contactSectionElement.id = "contact-section";

  const h1Element = document.createElement('h1');
  h1Element.innerHTML = `<span>H</span><span>e</span><span>l</span><span>l</span><span>o</span> <span>C</span><span>o</span><span>n</span><span>v</span><span>e</span><span>r</span><span>s</span><span>i</span><span>o</span><span>n</span><span>!</span>`;
  h1Element.classList.add('pop-animation');

  const pElement = document.createElement('p');
  pElement.textContent = "Click on the button below to contact us";

  contactSectionElement.append(h1Element, pElement, contactUsButtonElement);

  return contactSectionElement;
}

function createContactForm(contactSectionElement) {
  const contactFormContainerElement = document.querySelector('.contact-form > div > div');
  const contactFormElement = contactFormContainerElement.children[1];
  contactFormElement.id = "contact-form";
  contactFormElement.replaceWith(contactSectionElement);

  return contactFormElement;
}

function createOverlay() {
  const overlayElement = document.createElement('div');
  overlayElement.id = "overlay";

  return overlayElement;
}

function createContactFormNextPageButton() {
  const contactFormNextPageButtonElement = document.createElement('button');
  contactFormNextPageButtonElement.id = "contact-form-next-page-button";
  contactFormNextPageButtonElement.disabled = true;
  contactFormNextPageButtonElement.textContent = "Next";

  return contactFormNextPageButtonElement;
}

function createContactFormBackPageButton() {
  const contactFormBackPageButtonElement = document.createElement('button');
  contactFormBackPageButtonElement.id = "contact-form-back-page-button";
  contactFormBackPageButtonElement.disabled = false;
  contactFormBackPageButtonElement.textContent = "Back";

  return contactFormBackPageButtonElement;
}

function createContactFormPageButtonsContainer(contactFormNextPageButtonElement, contactFormBackPageButtonElement) {
  const contactFormPageButtonsContainerElement = document.createElement('div');
  contactFormPageButtonsContainerElement.id = "contact-form-page-buttons-container";

  contactFormPageButtonsContainerElement.append(contactFormBackPageButtonElement, contactFormNextPageButtonElement);

  return contactFormPageButtonsContainerElement;
}

function createModalContainer(modalElement) {
  const modalContainerElement = document.createElement('div');
  modalContainerElement.id = "modal-container";

  modalContainerElement.appendChild(modalElement);

  return modalContainerElement;
}

function createCloseModalButton() {
  const closeModalButtonElement = document.createElement('button');
  closeModalButtonElement.id = "close-modal-button";

  return closeModalButtonElement;
}

function createModal(closeModalButtonElement) {
  const modalElement = document.createElement('div');
  modalElement.id = "modal";

  const progressBarContainerElement = document.createElement('div');
  progressBarContainerElement.id = "progress-bar-container";

  const progressBarIconContainerElement = document.createElement('div');
  progressBarIconContainerElement.id = "progress-bar-icon-container";

  const progressBarTextContainerElement = document.createElement('div');
  progressBarTextContainerElement.id = "progress-bar-text-container";

  contactFormStepTexts.forEach((contactFormStepText, index) => {
    const progressBarIcon = document.createElement('div');
    progressBarIcon.id = `progress-bar-icon-${index}`;

    const progressBarIconText = document.createElement('div');
    progressBarIconText.textContent = contactFormStepText;
    progressBarIconText.id = `progress-bar-text-${index}`;

    progressBarIconContainerElement.appendChild(progressBarIcon);

    if (index !== contactFormStepTexts.length-1) {
      const progressBarLineElement = document.createElement('div');
      progressBarLineElement.id = `progress-bar-line-${index}`;
      progressBarIconContainerElement.appendChild(progressBarLineElement);
    }
  });

  progressBarContainerElement.append(progressBarIconContainerElement);

  modalElement.append(closeModalButtonElement, progressBarContainerElement, contactFormElement, contactFormPageButtonsContainerElement);

  return modalElement;
}

// ELEMENTS

const bodyElement = document.querySelector('body');
const contactUsButtonElement = createContactUsButton();
const contactSectionElement = createContactSection(contactUsButtonElement);
const contactFormElement = createContactForm(contactSectionElement);
const formElement = contactFormElement.querySelector('form');
const contactFormNextPageButtonElement = createContactFormNextPageButton();
const contactFormBackPageButtonElement = createContactFormBackPageButton();
const contactFormPageButtonsContainerElement = createContactFormPageButtonsContainer(contactFormNextPageButtonElement, contactFormBackPageButtonElement)
const overlayElement = createOverlay();
const closeModalButtonElement = createCloseModalButton();
const modalElement = createModal(closeModalButtonElement);
const modalContainerElement = createModalContainer(modalElement);
bodyElement.append(overlayElement, modalContainerElement);

// EVENTS

contactFormElement.addEventListener('input', (event) => {
  if (event.target.matches('input')) {
    checkInputs(event.target);
  }
});

closeModalButtonElement.addEventListener("click", (event) => {
  bodyElement.classList.toggle('open');
  modalContainerElement.classList.toggle('open');
  contactFormElement.classList.toggle('show-page-0');

  const progressBarIconElement = document.querySelector("#progress-bar-icon-0");
  progressBarIconElement.classList.toggle('active-icon');
  progressBarIconElement.classList.toggle('active-text');
});

contactUsButtonElement.addEventListener("click", (event) => {
  bodyElement.classList.toggle('open');
  modalContainerElement.classList.toggle('open');
  contactFormElement.classList.toggle('show-page-0');

  const progressBarIconElement = document.querySelector("#progress-bar-icon-0");
  progressBarIconElement.classList.toggle('active-icon');
  progressBarIconElement.classList.toggle('active-text');
});

contactFormNextPageButtonElement.addEventListener("click", (event) => {
  contactFormNextPageButtonElement.classList.toggle('visible');
  contactFormBackPageButtonElement.classList.toggle('visible');
  contactFormElement.classList.toggle('show-page-0');
  contactFormElement.classList.toggle('show-page-1');

  const progressBarLineElement = document.querySelector("#progress-bar-line-0");
  progressBarLineElement.classList.toggle('active-line');

  const firstProgressBarIconElement = document.querySelector("#progress-bar-icon-0");
  firstProgressBarIconElement.classList.toggle('active-text');
  firstProgressBarIconElement.classList.toggle('success-icon');

  const secondProgressBarIconElement = document.querySelector("#progress-bar-icon-1");
  secondProgressBarIconElement.classList.toggle('active-icon');
  secondProgressBarIconElement.classList.toggle('active-text');
});

contactFormBackPageButtonElement.addEventListener("click", (event) => {
  contactFormBackPageButtonElement.classList.toggle('visible');
  contactFormNextPageButtonElement.classList.toggle('visible');
  contactFormElement.classList.toggle('show-page-1');
  contactFormElement.classList.toggle('show-page-0');

  const progressBarLineElement = document.querySelector("#progress-bar-line-0");
  progressBarLineElement.classList.toggle('active-line');

  const firstProgressBarIconElement = document.querySelector("#progress-bar-icon-0");
  firstProgressBarIconElement.classList.toggle('active-text');
  firstProgressBarIconElement.classList.toggle('success-icon');

  const secondProgressBarIconElement = document.querySelector("#progress-bar-icon-1");
  secondProgressBarIconElement.classList.toggle('active-icon');
  secondProgressBarIconElement.classList.toggle('active-text');
});

formElement.addEventListener("submit", (event) => {
  contactFormBackPageButtonElement.classList.toggle('visible');

  const progressBarLineElement = document.querySelector("#progress-bar-line-1");
  progressBarLineElement.classList.toggle('active-line');

  const secondProgressBarIconElement = document.querySelector("#progress-bar-icon-1");
  secondProgressBarIconElement.classList.toggle('active-text');
  secondProgressBarIconElement.classList.toggle('success-icon');

  const thirdProgressBarIconElement = document.querySelector("#progress-bar-icon-2");
  thirdProgressBarIconElement.classList.toggle('active-icon');
  thirdProgressBarIconElement.classList.toggle('active-text');
  thirdProgressBarIconElement.classList.toggle('success-icon');
});