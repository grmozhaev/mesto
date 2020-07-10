export default class FormValidator {
  constructor(form) {
    this.form = form;
  }

  errorMessages = {
    empty: "Это обязательное поле",
    wrongLength: "Должно быть от 2 до 30 символов",
    notUrl: "Здесь должна быть ссылка",
  };

  setEventListeners = () => {
    this.form.addEventListener("input", (event) => {
      const submitButton = event.currentTarget.querySelector(".button");
      const inputs = [...event.currentTarget.elements];

      this.isInputValid(event.target);

      if (inputs.every((input) => this.checkInputValidity(input))) {
        this.setSubmitButtonState(submitButton, true);
      } else {
        this.setSubmitButtonState(submitButton, false);
      }
    });
  };

  checkInputValidity(input) {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.empty);
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages.wrongLength);
      return false;
    }
    /** REVIEW: Можно лучше:
     *
     * Также можно использовать type="url" и `.validity.typeMismatch`.
     * Это избавит от необходимости указывать сложное регулярное выражение в аттрибуте pattern у текстового поля.
     */
    if (input.validity.patternMismatch) {
      input.setCustomValidity(this.errorMessages.notUrl);
      return false;
    }

    return input.checkValidity();
  }

  isInputValid(input) {
    const error = input.parentNode.querySelector(`#${input.id}-error`);
    const isValid = this.checkInputValidity(input);
    error.textContent = input.validationMessage;
    return isValid;
  }

  setSubmitButtonState(button, state) {
    if (state) {
      button.removeAttribute("disabled");
      button.classList.add("popup__button_enabled");
    } else {
      button.setAttribute("disabled", true);
      button.classList.remove("popup__button_enabled");
    }
  }

  resetErrorMessage() {
    const inputs = [...this.form.elements];

    inputs.forEach((input) => {
      if (input.type !== "submit") {
        const error = input.parentNode.querySelector(`#${input.id}-error`);
        error.textContent = "";
      }
    });
  }
}
