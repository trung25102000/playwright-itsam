// tests/payroll.test.js
const { test } = require("@playwright/test");
const { PayrollPage } = require("../pages/payrollPage");

const user = {
  id: 1,
  name: "Hoàng Quốc Trung",
  email: "trunghq@deha-soft.com",
  avatar:
    "https://lh3.googleusercontent.com/a/ACg8ocK3aZsvr5pQlVdhYtKqI4z3L3MO8jBCiPOzORZ4pCEvYcCLmbIG=s96-c",
  createdBy: "Trunghq",
};

test.describe("test Payroll list", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL);

    await page.evaluate(
      ({ token, user }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      },
      { token: process.env.PLAYWRIGHT_TOKEN, user }
    );
  });

  test("should validate various Payroll list functionalities", async ({
    page,
  }) => {
    const payrollPage = new PayrollPage(page);

    await payrollPage.goto();

    await payrollPage.isPayrollsVisible();

    await payrollPage.isPayrollsNotEmpty();

    const expectedPayrollCount = 1;
    await payrollPage.checkPayrollsCount(expectedPayrollCount);

    await payrollPage.isPayrollsEnabled();
  });
});
