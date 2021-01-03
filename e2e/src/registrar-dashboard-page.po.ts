import {$, $$, browser, by, element, ElementFinder} from 'protractor';

export class RegistrarDashboardPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + 'content/registrar-dashboard') as Promise<unknown>;
  }

  getCardByContractId(contractId: string): ElementFinder {
    return $$('.card').filter(((elementCardFinder, index) => {
      return elementCardFinder.$('.card-title').getText().then(text => {
        return text.startsWith(contractId);
      });
    })).first();
  }
}
