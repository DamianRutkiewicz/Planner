import { InzPage } from './app.po';

describe('inz App', () => {
  let page: InzPage;

  beforeEach(() => {
    page = new InzPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
