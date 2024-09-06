describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display the login form', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should display an error message on failed authentication', () => {
    cy.intercept('POST', '/api/authenticate', {
      statusCode: 401,
      body: { message: 'Invalid email or password' },
    });

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.login-error').should('contain.text', 'Invalid email or password');
  });

  it('should navigate to dashboard on successful login', () => {
    cy.intercept('POST', '/api/authenticate', {
      statusCode: 200,
    });

    cy.get('input[name="email"]').type('test@bold.co');
    cy.get('input[name="password"]').type('b0ld123*');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.window().its('localStorage.isAuthenticated').should('equal', 'true');
  });
});
