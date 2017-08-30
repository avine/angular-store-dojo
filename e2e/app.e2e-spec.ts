import { AngularStoreDojoPage } from './app.po';

describe('angular-store-dojo App', () => {
  let page: AngularStoreDojoPage;

  beforeEach(() => {
    page = new AngularStoreDojoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
