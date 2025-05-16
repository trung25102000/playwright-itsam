// tests/navigation.test.js
const { test } = require("@playwright/test");
const { NavigationPage } = require("../pages/navigationPage");
const { UserInfoPage } = require("../pages/userInfoPage");
const { SettingPage } = require("../pages/settingPage");
const { BasePayPage } = require("../pages/basePayPage");

const user = {
  id: 1,
  name: "Hoàng Quốc Trung",
  email: "trunghq@deha-soft.com",
  avatar:
    "https://lh3.googleusercontent.com/a/ACg8ocK3aZsvr5pQlVdhYtKqI4z3L3MO8jBCiPOzORZ4pCEvYcCLmbIG=s96-c",
  createdBy: "Trunghq",
};

test.describe("Navigation and User Information Tests", () => {
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

  test("Test navigation and user avatar functionality", async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const userInfoPage = new UserInfoPage(page);
    const settingPage = new SettingPage(page);
    const basePayPage = new BasePayPage(page);

    await navigationPage.goto();
    await navigationPage.isHomeLinkVisible();

    await navigationPage.isUserAvatarVisible();
    await navigationPage.checkUserAvatarAttributes(user.avatar);

    await navigationPage.clickUserAvatar();

    await userInfoPage.waitForUserInfo();
    await userInfoPage.isUserAvatarVisible();
    await userInfoPage.checkUserName(user.name);
    await userInfoPage.checkUserEmail(user.email);
    await navigationPage.clickUserAvatar();

    await settingPage.clickSettingButton();

    await settingPage.isDropdownListVisible();

    await settingPage.clickBasePayItem();

    await settingPage.isRedirectedToBasePay();

    await settingPage.isCreateButtonVisible();

    await settingPage.clickCreateButton();

    await basePayPage.isCreateDialogVisible();
    await basePayPage.submitWithEmptyFields();
    await basePayPage.checkRequiredFieldErrors();

    await basePayPage.createBasePay(
      "Basic Salary",
      "5000",
      "VND",
      "01/01/2023"
    );
    await basePayPage.checkSuccessMessage();
  });
});
