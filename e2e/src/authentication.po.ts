import {browser, by, element, ElementFinder} from 'protractor';

export class AuthenticationPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + 'content/login') as Promise<unknown>;
  }

  getEmailElement(): ElementFinder {
    return element(by.id('email'));
  }

  getPasswordElement(): ElementFinder {
    return element(by.id('password'));
  }

  getAuthButton(): ElementFinder {
    return element(by.id('auth-button'));
  }
}
