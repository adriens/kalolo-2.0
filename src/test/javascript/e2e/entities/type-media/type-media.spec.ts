import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TypeMediaComponentsPage, TypeMediaDeleteDialog, TypeMediaUpdatePage } from './type-media.page-object';

const expect = chai.expect;

describe('TypeMedia e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let typeMediaComponentsPage: TypeMediaComponentsPage;
  let typeMediaUpdatePage: TypeMediaUpdatePage;
  let typeMediaDeleteDialog: TypeMediaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TypeMedias', async () => {
    await navBarPage.goToEntity('type-media');
    typeMediaComponentsPage = new TypeMediaComponentsPage();
    await browser.wait(ec.visibilityOf(typeMediaComponentsPage.title), 5000);
    expect(await typeMediaComponentsPage.getTitle()).to.eq('kaloloApp.typeMedia.home.title');
    await browser.wait(ec.or(ec.visibilityOf(typeMediaComponentsPage.entities), ec.visibilityOf(typeMediaComponentsPage.noResult)), 1000);
  });

  it('should load create TypeMedia page', async () => {
    await typeMediaComponentsPage.clickOnCreateButton();
    typeMediaUpdatePage = new TypeMediaUpdatePage();
    expect(await typeMediaUpdatePage.getPageTitle()).to.eq('kaloloApp.typeMedia.home.createOrEditLabel');
    await typeMediaUpdatePage.cancel();
  });

  it('should create and save TypeMedias', async () => {
    const nbButtonsBeforeCreate = await typeMediaComponentsPage.countDeleteButtons();

    await typeMediaComponentsPage.clickOnCreateButton();

    await promise.all([typeMediaUpdatePage.setLibelleInput('libelle')]);

    expect(await typeMediaUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await typeMediaUpdatePage.save();
    expect(await typeMediaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await typeMediaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TypeMedia', async () => {
    const nbButtonsBeforeDelete = await typeMediaComponentsPage.countDeleteButtons();
    await typeMediaComponentsPage.clickOnLastDeleteButton();

    typeMediaDeleteDialog = new TypeMediaDeleteDialog();
    expect(await typeMediaDeleteDialog.getDialogTitle()).to.eq('kaloloApp.typeMedia.delete.question');
    await typeMediaDeleteDialog.clickOnConfirmButton();

    expect(await typeMediaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
