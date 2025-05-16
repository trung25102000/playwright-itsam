const { expect } = require("@playwright/test");

class NavigationPage {
  constructor(page) {
    this.page = page;
    this.homeLink = this.page.locator('nav a[href="/"]');
    this.userAvatar = this.page.locator('img[alt="User Avatar"]');
  }

  async goto() {
    await this.page.goto("/");
  }

  async clickUserAvatar() {
    await this.userAvatar.click();
  }

  async isHomeLinkVisible() {
    await expect(this.homeLink).toBeVisible();
    await expect(this.homeLink).toHaveAttribute("href", "/");
  }

  async isUserAvatarVisible() {
    await expect(this.userAvatar).toBeVisible();
  }

  async checkUserAvatarAttributes(expectedSrc) {
    await expect(this.userAvatar).toHaveAttribute("src", expectedSrc);
    await expect(this.userAvatar).toHaveAttribute("data-loaded", "true");
  }
}

module.exports = { NavigationPage };
