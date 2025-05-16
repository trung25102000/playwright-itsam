const { expect } = require("@playwright/test");

class BasePayPage {
  constructor(page) {
    this.page = page;
  }

  async isCreateDialogVisible() {
    const dialog = await this.page.locator('section[role="dialog"]');
    await expect(dialog).toBeVisible();
  }

  async submitWithEmptyFields() {
    await this.page.click('button[type="submit"]');
  }

  async checkRequiredFieldErrors() {
    const nameError = await this.page.locator("text=Name field is required");
    const amountError = await this.page.locator(
      "text=Amount field is required"
    );
    await expect(nameError).toBeVisible();
    await expect(amountError).toBeVisible();
  }

  async createBasePay(name, amount, currency, startDate) {
    await this.page.fill('input[name="name"]', name);
    await this.page.fill('input[name="amount"]', amount);
    await this.page.fill('input[name="currency_unit_id"]', currency);

    await this.selectStartDate(startDate);

    await this.page.click('button[type="submit"]');
  }

  async checkSuccessMessage() {
    const successMessage = await this.page.locator(
      "text=Successfully created!"
    );
    await expect(successMessage).toBeVisible();
  }

  async checkInvalidAmountError() {
    const amountError = await this.page.locator("text=Invalid amount");
    await expect(amountError).toBeVisible();
  }

  async selectStartDate(date) {
    await this.page.click('input[data-slot="trigger"]');

    await this.page.waitForSelector('div[role="dialog"][data-slot="base"]');

    await this.page.selectOption('select[aria-label="Choose the Month"]', "8");

    await this.page.selectOption(
      'select[aria-label="Choose the Year"]',
      "2024"
    );

    await this.page.click(
      'button[aria-label="Today, Monday, September 23rd, 2024, selected"]'
    );
  }
}

module.exports = { BasePayPage };
