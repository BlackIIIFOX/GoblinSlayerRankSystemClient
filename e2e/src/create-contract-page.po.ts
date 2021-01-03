import {$, browser, by, element, ElementFinder} from 'protractor';

export class CreateContractPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + 'content/create-new-contract') as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.id('labelCreateContract')).getText() as Promise<string>;
  }

  getContractNameElement(): ElementFinder {
    return element(by.id('contractName'));
  }

  getAddressElement(): ElementFinder {
    return element(by.id('address'));
  }

  getRewardElement(): ElementFinder {
    return element(by.id('reward'));
  }

  getDescriptionElement(): ElementFinder {
    return element(by.id('description'));
  }

  getCommentElement(): ElementFinder {
    return element(by.id('comment'));
  }

  getCreateContractButton(): ElementFinder {
    return element(by.id('crateContractButton'));
  }
}
