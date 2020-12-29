import {browser, logging, protractor, ProtractorExpectedConditions} from 'protractor';
import {ContractorRegistrationPage} from './contactor-registration.po';
import * as uuid from 'uuid';
import {AuthenticationPage} from './authentication.po';

describe('registration', () => {
  let registrationPage: ContractorRegistrationPage;
  let authPage: AuthenticationPage;
  let login: string;
  let password: string;
  let EC: ProtractorExpectedConditions;

  beforeEach(() => {
    registrationPage = new ContractorRegistrationPage();
    authPage = new AuthenticationPage();
    login = uuid.v4() + '@gmail.com';
    password = 'test';
    EC = protractor.ExpectedConditions;
    browser.executeScript('return window.localStorage.clear();');
    browser.refresh();
  });

  it('should register new user', () => {
    registrationPage.navigateTo();
    registrationPage.getEmailElement().sendKeys(login);
    registrationPage.getAddressElement().sendKeys('some address');
    registrationPage.getFullNameElement().sendKeys('Full name');
    registrationPage.getPasswordElement().sendKeys(password);
    registrationPage.getConfirmPasswordElement().sendKeys(password);

    registrationPage.getRegistrationButton().click();
    browser.waitForAngular();

    authPage.navigateTo();
    authPage.getEmailElement().sendKeys(login);
    authPage.getPasswordElement().sendKeys(password);
    authPage.getAuthButton().click();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));

    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });
});
