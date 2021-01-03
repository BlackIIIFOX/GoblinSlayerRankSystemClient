import {$, $$, browser, by, element, logging, protractor, ProtractorExpectedConditions} from 'protractor';
import {Md5} from 'ts-md5/dist/md5';
import * as uuid from 'uuid';
import {AuthenticationPage} from './authentication.po';
import {NavBar} from './nav-bar.po';
import {CreateContractPage} from './create-contract-page.po';
import {RegistrarDashboardPage} from './registrar-dashboard-page.po';
import {EditorContractPage} from './editor-contract-page.po';

describe('creating a contract', () => {
  let createContractPage: CreateContractPage;
  let navBar: NavBar;
  let authPage: AuthenticationPage;
  let registrarDashboardPage: RegistrarDashboardPage;
  let editorContractPage: EditorContractPage;
  let login: string;
  let password: string;
  let EC: ProtractorExpectedConditions;


  beforeEach(() => {
    navBar = new NavBar();
    authPage = new AuthenticationPage();
    createContractPage = new CreateContractPage();
    registrarDashboardPage = new RegistrarDashboardPage();
    editorContractPage = new EditorContractPage();
    login = 'test_user@gmail.com';
    password = 'test';
    EC = protractor.ExpectedConditions;
  });

  it('should create and update contract', () => {
    const contractName = 'Auto contract - ' + uuid.v4();
    const address = uuid.v4();
    const comment = uuid.v4();
    const description = uuid.v4();
    const reward = Math.floor(Math.random() * Math.floor(1000));
    const registrarComment = uuid.v4();

    // perform authentication
    authPage.navigateTo();
    authPage.getEmailElement().sendKeys(login);
    authPage.getPasswordElement().sendKeys(password);
    authPage.getAuthButton().click();
    browser.waitForAngularEnabled(false);
    browser.wait(EC.presenceOf($('#dropdownMenuLogged')), 3000);

    // create contract
    createContractPage.navigateTo();
    expect(createContractPage.getTitleText()).toEqual('Создание нового контракта');
    createContractPage.getContractNameElement().sendKeys(contractName);
    createContractPage.getAddressElement().sendKeys(address);
    createContractPage.getCommentElement().sendKeys(comment);
    createContractPage.getDescriptionElement().sendKeys(description);
    createContractPage.getRewardElement().sendKeys(reward);
    createContractPage.getCreateContractButton().click();

    // Open contract
    registrarDashboardPage.navigateTo();
    const newCard = registrarDashboardPage.getCardByContractId(contractName);
    browser.wait(EC.presenceOf(newCard), 3000);
    newCard.$('.btn').click();
    browser.wait(EC.presenceOf(editorContractPage.getContractNameElement()), 3000);

    // Accept and check contract
    editorContractPage.getMinLevelSelectElement().click();
    $('#minLevelSelect [value=\'Porcelain\']').click();
    editorContractPage.getRegistrarCommentElement().sendKeys(registrarComment);
    editorContractPage.getAcceptButton().click();
    browser.wait(EC.presenceOf(editorContractPage.getPayedButton()), 3000);
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
