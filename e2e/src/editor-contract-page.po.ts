import {$, $$, browser, by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class EditorContractPage {
  navigateTo(contractId: string): Promise<unknown> {
    return browser.get(browser.baseUrl + 'content/contract/' + contractId) as Promise<unknown>;
  }

  getContractNameElement(): ElementFinder {
    return $('#contractName');
  }

  getCustomerNameElement(): ElementFinder {
    return $('#customerName');
  }

  getContractDateElement(): ElementFinder {
    return $('#contractDate');
  }

  getAddressElement(): ElementFinder {
    return $('#address');
  }

  getRewardElement(): ElementFinder {
    return $('#reward');
  }

  getDescriptionElement(): ElementFinder {
    return $('#description');
  }

  getCommentElement(): ElementFinder {
    return $('#comment');
  }

  getStatusSelectElement(): ElementFinder {
    return $('#statusSelect');
  }

  getMinLevelSelectElement(): ElementFinder {
    return $('#minLevelSelect');
  }

  getRegistrarCommentElement(): ElementFinder {
    return $('#registrarComment');
  }

  getAcceptButton(): ElementFinder {
    return $('#accept-button');
  }

  getPayedButton(): ElementFinder {
    return $('#payed-button');
  }

  getUpdateButton(): ElementFinder {
    return $('#update-button');
  }
}
