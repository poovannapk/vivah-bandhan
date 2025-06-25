describe('Register Page', () => {
  it('shows validation errors', () => {
    cy.visit('/register');
    cy.contains('Next').click();
    cy.contains('Please fill all required fields');
  });

  it('registers a new user', () => {
    cy.visit('/register');
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('User');
    cy.get('input[type="email"]').type('testuser@example.com');
    cy.get('input[type="tel"]').type('1234567890');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.contains('Next').click();
    // Fill step 2 fields...
    // cy.get('input[name="dateOfBirth"]').type('2000-01-01');
    // cy.get('input[name="city"]').type('Test City');
    // cy.contains('Sign Up').click();
    // cy.url().should('include', '/profile-setup');
  });
});