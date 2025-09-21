// STYLES

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://raw.githubusercontent.com/hsnfwz/conversion-take-home-assignment/main/task3-spa-dom/style.css";
document.head.appendChild(link);

// FUNCTIONS

function persistDOMChanges() {
  const h1Element = document.querySelector('.lm-hero h1');
  const newH1ElementTextContent = "We are the best experimentation agency in the world";

  if (h1Element) {
    if (h1Element.textContent !== newH1ElementTextContent) {
      h1Element.textContent = newH1ElementTextContent;
    }

    const valuePropositionContainerElementId = "value-proposition-container";

    if (h1Element.nextElementSibling.id !== valuePropositionContainerElementId) {
      const valuePropositionTexts = [
        "Increase conversion rates across your website",
        "Iterative site redesign",
        "Improve ROAS efficiency",
        "Standing or scaling an experimentation program",
        "Advanced customer research",
      ];

      const valuePropositionContainerElement = document.createElement('ul');
      valuePropositionContainerElement.id = valuePropositionContainerElementId;

      valuePropositionTexts.forEach(valuePropositionText => {
        const valuePropositionElement = document.createElement('li');
        valuePropositionElement.classList.add('value-proposition');
        valuePropositionElement.textContent = valuePropositionText;
        valuePropositionContainerElement.appendChild(valuePropositionElement);
      });

      h1Element.insertAdjacentElement("afterend", valuePropositionContainerElement);
    }
  }

  const buttonElements = document.querySelectorAll('.lm-hero__buttons button');
  const firstButtonElement = buttonElements[0];
  const secondButtonElement = buttonElements[1];
  const newFirstButtonElementTextContent = "Contact us";

  if (firstButtonElement && firstButtonElement.textContent !== newFirstButtonElementTextContent) {
    firstButtonElement.textContent = newFirstButtonElementTextContent;
  }

  if (secondButtonElement) {
    secondButtonElement.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      const whySectionElement = document.querySelector('.lm-why');
      whySectionElement.scrollIntoView({ behavior: 'smooth' });
    }, true);
  }
};

const observer = new MutationObserver(persistDOMChanges);
observer.observe(document.body, { childList: true, subtree: true });

persistDOMChanges();