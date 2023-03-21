describe('Login', () => {
  it('로그인 페이지 방문 후 로그인', () => {
    cy.visit('/login');
    cy.visitLoginPage();
    cy.location('pathname').should('eq', '/');
  });
});
