export default class FormBio {
  constructor(
    trigger,
    content,
    closeButton,
    createPopup,
    createFormValidator,
    createUserInfo,
    userName,
    userJob,
    userAvatar
  ) {
    this.trigger = trigger;
    this.closeButton = closeButton;
    this.form = content.querySelector("form");
    this.popup = createPopup(content);

    this.userInfo = createUserInfo(userName, userJob, userAvatar);
    this.userInfo.updateUserInfo();

    this.formValidator = createFormValidator(this.form);
    this.formValidator.setEventListeners();
  }

  setEventListeners = () => {
    this.trigger.addEventListener("click", () => {
      const submitButton = this.form.querySelector(".button");
      submitButton.removeAttribute("disabled");
      submitButton.classList.add("popup__button_enabled");

      const { name, job } = this.form.elements;
      job.value = this.userInfo.job;
      name.value = this.userInfo.name;

      this.popup.open();
    });

    this.closeButton.addEventListener("click", () => {
      this.popup.close();
      this.formValidator.resetErrorMessage();
      this.form.reset();
    });

    this.form.addEventListener("submit", async (event) => {
      const { name, job } = this.form.elements;

      event.preventDefault();

      try {
        await this.userInfo.setUserInfo(name.value, job.value);
        this.popup.close();
        this.form.reset();
      } catch (err) {
        console.log(`Couldn't update user info on the server: ${err}`);
      }
    });
  };
}
