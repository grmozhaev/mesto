class FormBio {
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

      /*
        Надо исправить: 
        - обрабтка ошибок должна быть здесь
        Если используется async/await она делается с помощью try catch
        
        - все изменения на странице должны происходить, только после того, как
        сервер ответил подтверждением. Если сервер не ответил, или ответил ошибкой, а
        данные на странице сохраняться, то это может ввести пользователя в заблуждение
        Попап так же нужно закрывать, а форму очищать, только если сервер ответил подтверждением, иначе
        если запрос завершиться ошибкой, а попап закроется пользователь может подумать
        что данные сохранились
      */
      try {
        await this.userInfo.setUserInfo(name.value, job.value);
        this.popup.close();
        this.form.reset();
      } catch (err) {
        console.log(`Couldn't update user info on the server: ${err}`);
      }

      /*
        Надо исправить: 
        - в ответ на отправку данных сервер возвращает обновленные данные, не нужно делать
        запрос ещё раз, нужно использовать данные которые вернул сервер
      */
    });
  };
}
