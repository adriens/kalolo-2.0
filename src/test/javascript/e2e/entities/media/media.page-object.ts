import { element, by, ElementFinder } from 'protractor';

export class MediaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-media div table .btn-danger'));
  title = element.all(by.css('jhi-media div h2#page-heading span')).first();
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

export class MediaUpdatePage {
  pageTitle = element(by.id('jhi-media-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  urlInput = element(by.id('field_url'));
  dateInput = element(by.id('field_date'));
  titreInput = element(by.id('field_titre'));
  descriptionInput = element(by.id('field_description'));
  keywordsInput = element(by.id('field_keywords'));

  auteurSelect = element(by.id('field_auteur'));
  typeSelect = element(by.id('field_type'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUrlInput(url: string): Promise<void> {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput(): Promise<string> {
    return await this.urlInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setTitreInput(titre: string): Promise<void> {
    await this.titreInput.sendKeys(titre);
  }

  async getTitreInput(): Promise<string> {
    return await this.titreInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setKeywordsInput(keywords: string): Promise<void> {
    await this.keywordsInput.sendKeys(keywords);
  }

  async getKeywordsInput(): Promise<string> {
    return await this.keywordsInput.getAttribute('value');
  }

  async auteurSelectLastOption(): Promise<void> {
    await this.auteurSelect.all(by.tagName('option')).last().click();
  }

  async auteurSelectOption(option: string): Promise<void> {
    await this.auteurSelect.sendKeys(option);
  }

  getAuteurSelect(): ElementFinder {
    return this.auteurSelect;
  }

  async getAuteurSelectedOption(): Promise<string> {
    return await this.auteurSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption(): Promise<void> {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }

  async typeSelectOption(option: string): Promise<void> {
    await this.typeSelect.sendKeys(option);
  }

  getTypeSelect(): ElementFinder {
    return this.typeSelect;
  }

  async getTypeSelectedOption(): Promise<string> {
    return await this.typeSelect.element(by.css('option:checked')).getText();
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

export class MediaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-media-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-media'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
