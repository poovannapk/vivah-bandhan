describe('Profile Page', () => {
  it('shows user profile', () => {
    cy.login(); // custom command to log in
    cy.visit('/profile');
    cy.contains('Profile');
    // cy.contains('user@example.com');
  });
});