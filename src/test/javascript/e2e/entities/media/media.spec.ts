import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MediaComponentsPage, MediaDeleteDialog, MediaUpdatePage } from './media.page-object';

const expect = chai.expect;

describe('Media e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mediaComponentsPage: MediaComponentsPage;
  let mediaUpdatePage: MediaUpdatePage;
  let mediaDeleteDialog: MediaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Media', async () => {
    await navBarPage.goToEntity('media');
    mediaComponentsPage = new MediaComponentsPage();
    await browser.wait(ec.visibilityOf(mediaComponentsPage.title), 5000);
    expect(await mediaComponentsPage.getTitle()).to.eq('kaloloApp.media.home.title');
    await browser.wait(ec.or(ec.visibilityOf(mediaComponentsPage.entities), ec.visibilityOf(mediaComponentsPage.noResult)), 1000);
  });

  it('should load create Media page', async () => {
    await mediaComponentsPage.clickOnCreateButton();
    mediaUpdatePage = new MediaUpdatePage();
    expect(await mediaUpdatePage.getPageTitle()).to.eq('kaloloApp.media.home.createOrEditLabel');
    await mediaUpdatePage.cancel();
  });

  it('should create and save Media', async () => {
    const nbButtonsBeforeCreate = await mediaComponentsPage.countDeleteButtons();

    await mediaComponentsPage.clickOnCreateButton();

    await promise.all([
      mediaUpdatePage.setUrlInput('url'),
      mediaUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      mediaUpdatePage.setTitreInput('titre'),
      mediaUpdatePage.setDescriptionInput('description'),
      mediaUpdatePage.setKeywordsInput('keywords'),
      mediaUpdatePage.auteurSelectLastOption(),
      mediaUpdatePage.typeSelectLastOption(),
    ]);

    expect(await mediaUpdatePage.getUrlInput()).to.eq('url', 'Expected Url value to be equals to url');
    expect(await mediaUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    expect(await mediaUpdatePage.getTitreInput()).to.eq('titre', 'Expected Titre value to be equals to titre');
    expect(await mediaUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await mediaUpdatePage.getKeywordsInput()).to.eq('keywords', 'Expected Keywords value to be equals to keywords');

    await mediaUpdatePage.save();
    expect(await mediaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mediaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Media', async () => {
    const nbButtonsBeforeDelete = await mediaComponentsPage.countDeleteButtons();
    await mediaComponentsPage.clickOnLastDeleteButton();

    mediaDeleteDialog = new MediaDeleteDialog();
    expect(await mediaDeleteDialog.getDialogTitle()).to.eq('kaloloApp.media.delete.question');
    await mediaDeleteDialog.clickOnConfirmButton();

    expect(await mediaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
