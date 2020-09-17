import { element, by, ElementFinder } from 'protractor';

export class AuteurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-auteur div table .btn-danger'));
  title = element.all(by.css('jhi-auteur div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class AuteurUpdatePage {
  pageTitle = element(by.id('jhi-auteur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomInput = element(by.id('field_nom'));
  cleAuteurInput = element(by.id('field_cleAuteur'));
  urlWebInput = element(by.id('field_urlWeb'));
  urlFbInput = element(by.id('field_urlFb'));
  urlInstaInput = element(by.id('field_urlInsta'));
  urlYtInput = element(by.id('field_urlYt'));
  urlTwitInput = element(by.id('field_urlTwit'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setCleAuteurInput(cleAuteur: string): Promise<void> {
    await this.cleAuteurInput.sendKeys(cleAuteur);
  }

  async getCleAuteurInput(): Promise<string> {
    return await this.cleAuteurInput.getAttribute('value');
  }

  async setUrlWebInput(urlWeb: string): Promise<void> {
    await this.urlWebInput.sendKeys(urlWeb);
  }

  async getUrlWebInput(): Promise<string> {
    return await this.urlWebInput.getAttribute('value');
  }

  async setUrlFbInput(urlFb: string): Promise<void> {
    await this.urlFbInput.sendKeys(urlFb);
  }

  async getUrlFbInput(): Promise<string> {
    return await this.urlFbInput.getAttribute('value');
  }

  async setUrlInstaInput(urlInsta: string): Promise<void> {
    await this.urlInstaInput.sendKeys(urlInsta);
  }

  async getUrlInstaInput(): Promise<string> {
    return await this.urlInstaInput.getAttribute('value');
  }

  async setUrlYtInput(urlYt: string): Promise<void> {
    await this.urlYtInput.sendKeys(urlYt);
  }

  async getUrlYtInput(): Promise<string> {
    return await this.urlYtInput.getAttribute('value');
  }

  async setUrlTwitInput(urlTwit: string): Promise<void> {
    await this.urlTwitInput.sendKeys(urlTwit);
  }

  async getUrlTwitInput(): Promise<string> {
    return await this.urlTwitInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class AuteurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-auteur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-auteur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
