import {browser, by, element, ElementFinder} from 'protractor';

export class ContractorRegistrationPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + 'content/contractor-registration') as Promise<unknown>;
  }

  getEmailElement(): ElementFinder {
    return element(by.id('email'));
  }

  getFullNameElement(): ElementFinder {
    return element(by.id('fullName'));
  }

  getAddressElement(): ElementFinder {
    return element(by.id('address'));
  }

  getPasswordElement(): ElementFinder {
    return element(by.id('password'));
  }

  getConfirmPasswordElement(): ElementFinder {
    return element(by.id('confirmPassword'));
  }

  getRegistrationButton(): ElementFinder {
    return element(by.buttonText('Регистрация'));
  }
}
