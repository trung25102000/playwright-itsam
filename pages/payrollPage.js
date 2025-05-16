const { expect } = require("@playwright/test");

class PayrollPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      payrollInfo:
        "body > div > div > div.px-8.py-6 > div > div:nth-child(4) > div.flex.flex-col.relative.gap-4.w-full",
    };
  }

  async goto() {
    await this.page.goto("/vi");
  }

  async isPayrollsVisible() {
    const payrollInfoElement = this.page.locator(this.selectors.payrollInfo);
    await expect(payrollInfoElement).toBeVisible();
  }

  async getPayrollText() {
    const payrollInfoElement = this.page.locator(this.selectors.payrollInfo);
    return await payrollInfoElement.textContent();
  }

  async isPayrollsNotEmpty() {
    const payrollInfoElement = this.page.locator(this.selectors.payrollInfo);
    const text = await payrollInfoElement.textContent();
    await expect(text.trim().length).toBeGreaterThan(0);
  }

  async checkPayrollsCount(expectedCount) {
    const payrollInfoItems = this.page.locator(
      `${this.selectors.payrollInfo} > div`
    );
    await expect(payrollInfoItems).toHaveCount(expectedCount);
  }

  async isPayrollsEnabled() {
    const payrollInfoElement = this.page.locator(this.selectors.payrollInfo);
    await expect(payrollInfoElement).toBeEnabled();
  }
}

module.exports = { PayrollPage };
