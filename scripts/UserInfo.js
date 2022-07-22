export class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    /* this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector); */
    this._userName = document.querySelector(userNameSelector),
    this._userInfo = userInfoSelector
    console.log(this._userName.textContent);
  }

  // Берет данные из профиля и сохраняет их в объект user
  getUserInfo() {
    const user = {};
    user.name = this._userName.textContent;
    user.info = this._userInfo.textContent;

    return user;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userInfo.textContent = userData.info;
  }
}
