describe('Login Page', () => {
  it('shows error on invalid login', () => {
    cy.visit('/login');
    cy.get('[data-testid="login-email"]').type('wrong@example.com');
    cy.get('[data-testid="login-password"]').type('wrongpass');
    cy.get('[data-testid="login-submit"]').click();
    cy.contains('Invalid email or password');
  });

  it('logs in successfully', () => {
    cy.visit('/login');
    cy.get('[data-testid="login-email"]').type('user@example.com');
    cy.get('[data-testid="login-password"]').type('password123');
    cy.get('[data-testid="login-submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});