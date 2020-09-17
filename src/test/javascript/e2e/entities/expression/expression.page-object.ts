import { element, by, ElementFinder } from 'protractor';

export class ExpressionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-expression div table .btn-danger'));
  title = element.all(by.css('jhi-expression div h2#page-heading span')).first();
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

export class ExpressionUpdatePage {
  pageTitle = element(by.id('jhi-expression-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  textInput = element(by.id('field_text'));
  pointsInput = element(by.id('field_points'));

  tagsSelect = element(by.id('field_tags'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTextInput(text: string): Promise<void> {
    await this.textInput.sendKeys(text);
  }

  async getTextInput(): Promise<string> {
    return await this.textInput.getAttribute('value');
  }

  async setPointsInput(points: string): Promise<void> {
    await this.pointsInput.sendKeys(points);
  }

  async getPointsInput(): Promise<string> {
    return await this.pointsInput.getAttribute('value');
  }

  async tagsSelectLastOption(): Promise<void> {
    await this.tagsSelect.all(by.tagName('option')).last().click();
  }

  async tagsSelectOption(option: string): Promise<void> {
    await this.tagsSelect.sendKeys(option);
  }

  getTagsSelect(): ElementFinder {
    return this.tagsSelect;
  }

  async getTagsSelectedOption(): Promise<string> {
    return await this.tagsSelect.element(by.css('option:checked')).getText();
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

export class ExpressionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-expression-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-expression'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
