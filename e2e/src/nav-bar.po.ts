import {$, browser, by, element, ElementFinder} from 'protractor';

export class NavBar {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.className('navbar-brand')).getText() as Promise<string>;
  }

  getCreateContractButton(): ElementFinder {
    return element(by.id('new-contract-nav-item'));
  }

  getDropDownMenu(): ElementFinder {
    return element(by.id('dropdownMenuLogged'));
  }
}
