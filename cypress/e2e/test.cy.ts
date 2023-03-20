describe('첫 테스트', () => {
  it('로그아웃 및 로그인', () => {
    cy.clearCookies();
    cy.visit('/login');
    cy.get('input[type=text]').type('admin');
    cy.get('input[type=password]').type('rhqmffls13!');
    cy.get('button[type=submit]').click();
  });
});
