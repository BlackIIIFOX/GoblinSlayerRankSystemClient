import {$, browser, by, element, logging, protractor, ProtractorExpectedConditions} from 'protractor';
import {ContractorRegistrationPage} from './contactor-registration.po';
import * as uuid from 'uuid';
import {AuthenticationPage} from './authentication.po';
import {NavBar} from './nav-bar.po';

describe('authentication', () => {
  let navBar: NavBar;
  let authPage: AuthenticationPage;
  let login: string;
  let password: string;
  let EC: ProtractorExpectedConditions;

  beforeEach(() => {
    navBar = new NavBar();
    authPage = new AuthenticationPage();
    login = 'test_user@gmail.com';
    password = 'test';
    EC = protractor.ExpectedConditions;
  });

  it('should auth test_user@gmail.com', () => {
    authPage.navigateTo();
    authPage.getEmailElement().sendKeys(login);
    authPage.getPasswordElement().sendKeys(password);
    authPage.getAuthButton().click();
    // browser.sleep(3000);
    browser.waitForAngularEnabled(false);
    browser.wait(EC.presenceOf($('#dropdownMenuLogged')), 3000);
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
