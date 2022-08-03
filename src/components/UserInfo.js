export class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector),
    this._userInfo = document.querySelector(userInfoSelector),
    this._userAvatar = document.querySelector(userAvatarSelector)
  }

  // Берет данные из профиля и сохраняет их в объект user
  getUserInfo() {
    const user = {};
    user.name = this._userName.textContent;
    user.about = this._userInfo.textContent;

    return user;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userInfo.textContent = userData.about;
  }

  getUserAvatar() {
    const avatar = this._userAvatar.src;

    return avatar;
  }

  setUserAvatar(userData) {
    this._userAvatar.src = userData.avatar;

  }

  getUserId(userId) {
    this.id = userId;
  }

}
