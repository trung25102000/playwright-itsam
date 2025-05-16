const { expect } = require("@playwright/test");

class UserInfoPage {
  constructor(page) {
    this.page = page;
    this.userInfo = this.page.locator('li[data-key="user-info"]');
    this.userAvatar = this.page.locator(
      'li[data-key="user-info"] img[alt="avatar"]'
    );
    this.userName = this.page.locator(
      'li[data-key="user-info"] button[aria-label="user name"]'
    );
    this.userEmail = this.page.locator('li[data-key="user-info"] p');
  }

  async waitForUserInfo() {
    await this.page.waitForSelector('li[data-key="user-info"]');
  }

  async isUserAvatarVisible() {
    await expect(this.userAvatar).toBeVisible();
  }

  async checkUserName(expectedName) {
    await expect(this.userName).toHaveText(expectedName);
  }

  async checkUserEmail(expectedEmail) {
    await expect(this.userEmail).toHaveText(expectedEmail);
  }
}

module.exports = { UserInfoPage };
