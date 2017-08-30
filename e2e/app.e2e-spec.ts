import { BlablaPage } from './app.po';

describe('blabla App', () => {
  let page: BlablaPage;

  beforeEach(() => {
    page = new BlablaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
