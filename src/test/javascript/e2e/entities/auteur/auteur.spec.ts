import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AuteurComponentsPage, AuteurDeleteDialog, AuteurUpdatePage } from './auteur.page-object';

const expect = chai.expect;

describe('Auteur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let auteurComponentsPage: AuteurComponentsPage;
  let auteurUpdatePage: AuteurUpdatePage;
  let auteurDeleteDialog: AuteurDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Auteurs', async () => {
    await navBarPage.goToEntity('auteur');
    auteurComponentsPage = new AuteurComponentsPage();
    await browser.wait(ec.visibilityOf(auteurComponentsPage.title), 5000);
    expect(await auteurComponentsPage.getTitle()).to.eq('kaloloApp.auteur.home.title');
    await browser.wait(ec.or(ec.visibilityOf(auteurComponentsPage.entities), ec.visibilityOf(auteurComponentsPage.noResult)), 1000);
  });

  it('should load create Auteur page', async () => {
    await auteurComponentsPage.clickOnCreateButton();
    auteurUpdatePage = new AuteurUpdatePage();
    expect(await auteurUpdatePage.getPageTitle()).to.eq('kaloloApp.auteur.home.createOrEditLabel');
    await auteurUpdatePage.cancel();
  });

  it('should create and save Auteurs', async () => {
    const nbButtonsBeforeCreate = await auteurComponentsPage.countDeleteButtons();

    await auteurComponentsPage.clickOnCreateButton();

    await promise.all([
      auteurUpdatePage.setNomInput('nom'),
      auteurUpdatePage.setCleAuteurInput('cleAuteur'),
      auteurUpdatePage.setUrlWebInput('urlWeb'),
      auteurUpdatePage.setUrlFbInput('urlFb'),
      auteurUpdatePage.setUrlInstaInput('urlInsta'),
      auteurUpdatePage.setUrlYtInput('urlYt'),
      auteurUpdatePage.setUrlTwitInput('urlTwit'),
    ]);

    expect(await auteurUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await auteurUpdatePage.getCleAuteurInput()).to.eq('cleAuteur', 'Expected CleAuteur value to be equals to cleAuteur');
    expect(await auteurUpdatePage.getUrlWebInput()).to.eq('urlWeb', 'Expected UrlWeb value to be equals to urlWeb');
    expect(await auteurUpdatePage.getUrlFbInput()).to.eq('urlFb', 'Expected UrlFb value to be equals to urlFb');
    expect(await auteurUpdatePage.getUrlInstaInput()).to.eq('urlInsta', 'Expected UrlInsta value to be equals to urlInsta');
    expect(await auteurUpdatePage.getUrlYtInput()).to.eq('urlYt', 'Expected UrlYt value to be equals to urlYt');
    expect(await auteurUpdatePage.getUrlTwitInput()).to.eq('urlTwit', 'Expected UrlTwit value to be equals to urlTwit');

    await auteurUpdatePage.save();
    expect(await auteurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await auteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Auteur', async () => {
    const nbButtonsBeforeDelete = await auteurComponentsPage.countDeleteButtons();
    await auteurComponentsPage.clickOnLastDeleteButton();

    auteurDeleteDialog = new AuteurDeleteDialog();
    expect(await auteurDeleteDialog.getDialogTitle()).to.eq('kaloloApp.auteur.delete.question');
    await auteurDeleteDialog.clickOnConfirmButton();

    expect(await auteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
