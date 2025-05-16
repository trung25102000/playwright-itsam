const { expect } = require("@playwright/test");

class SettingPage {
  constructor(page) {
    this.page = page;
    this.settingButton = this.page.locator('button:has-text("Setting")');
    this.dropdownList = this.page.locator('div[data-slot="base"] ul');
    this.basePayItem = this.page.locator('li[data-key="base_pay"]');
    this.createButton = this.page.locator('button[data-testid="create"]');
  }

  async clickSettingButton() {
    await this.settingButton.click();
  }

  async isDropdownListVisible() {
    await expect(this.dropdownList).toBeVisible();
  }

  async clickBasePayItem() {
    await this.basePayItem.click();
  }

  async isRedirectedToBasePay() {
    await expect(this.page).toHaveURL("https://itsam01.deha.vn/base-pay");
  }

  async isCreateButtonVisible() {
    await expect(this.createButton).toBeVisible();
  }

  async clickCreateButton() {
    await this.createButton.click();
  }
}

module.exports = { SettingPage };
