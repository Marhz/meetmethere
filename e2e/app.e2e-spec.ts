import { MeetmetherePage } from './app.po';

describe('meetmethere App', () => {
  let page: MeetmetherePage;

  beforeEach(() => {
    page = new MeetmetherePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
