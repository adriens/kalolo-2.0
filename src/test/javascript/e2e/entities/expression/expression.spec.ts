import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExpressionComponentsPage, ExpressionDeleteDialog, ExpressionUpdatePage } from './expression.page-object';

const expect = chai.expect;

describe('Expression e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let expressionComponentsPage: ExpressionComponentsPage;
  let expressionUpdatePage: ExpressionUpdatePage;
  let expressionDeleteDialog: ExpressionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Expressions', async () => {
    await navBarPage.goToEntity('expression');
    expressionComponentsPage = new ExpressionComponentsPage();
    await browser.wait(ec.visibilityOf(expressionComponentsPage.title), 5000);
    expect(await expressionComponentsPage.getTitle()).to.eq('kaloloApp.expression.home.title');
    await browser.wait(ec.or(ec.visibilityOf(expressionComponentsPage.entities), ec.visibilityOf(expressionComponentsPage.noResult)), 1000);
  });

  it('should load create Expression page', async () => {
    await expressionComponentsPage.clickOnCreateButton();
    expressionUpdatePage = new ExpressionUpdatePage();
    expect(await expressionUpdatePage.getPageTitle()).to.eq('kaloloApp.expression.home.createOrEditLabel');
    await expressionUpdatePage.cancel();
  });

  it('should create and save Expressions', async () => {
    const nbButtonsBeforeCreate = await expressionComponentsPage.countDeleteButtons();

    await expressionComponentsPage.clickOnCreateButton();

    await promise.all([
      expressionUpdatePage.setTextInput('text'),
      expressionUpdatePage.setPointsInput('5'),
      // expressionUpdatePage.tagsSelectLastOption(),
    ]);

    expect(await expressionUpdatePage.getTextInput()).to.eq('text', 'Expected Text value to be equals to text');
    expect(await expressionUpdatePage.getPointsInput()).to.eq('5', 'Expected points value to be equals to 5');

    await expressionUpdatePage.save();
    expect(await expressionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await expressionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Expression', async () => {
    const nbButtonsBeforeDelete = await expressionComponentsPage.countDeleteButtons();
    await expressionComponentsPage.clickOnLastDeleteButton();

    expressionDeleteDialog = new ExpressionDeleteDialog();
    expect(await expressionDeleteDialog.getDialogTitle()).to.eq('kaloloApp.expression.delete.question');
    await expressionDeleteDialog.clickOnConfirmButton();

    expect(await expressionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
