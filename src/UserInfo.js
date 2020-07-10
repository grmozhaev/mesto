export default class UserInfo {
  constructor(userName, userJob, userAvatar, createApi) {
    this.userName = userName;
    this.userJob = userJob;
    this.userAvatar = userAvatar;
    this.api = createApi();
  }

  _updateFields(name, job) {
    this.name = name;
    this.job = job;
    this.userName.textContent = name;
    this.userJob.textContent = job;
  }

  setUserInfo(name, job) {
    return this.api.setUserInfo(name, job).then((res) => {
      this._updateFields(res.name, res.about);
    });
  }

  async updateUserInfo() {
    const userInfo = await this.api.getUserInfo();
    const { name, about: job, avatar } = userInfo;
    this._updateFields(name, job);
    this.userAvatar.setAttribute("style", `background-image: url(${avatar});`);
  }
}
