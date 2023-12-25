describe('empty spec', () => {
	beforeEach(() => {
		cy.visit('/login');
		cy.wait(500);
		cy.getByDataTestAttribute('email-input').as('emailInput');
		cy.getByDataTestAttribute('password-input').as('passwordInput');
		cy.getByDataTestAttribute('login-button').as('loginButton');
	});

	it('Should login and logout', () => {
		cy.get('@emailInput').type('test@example.com');
		cy.get('@passwordInput').type('password');
		cy.get('@loginButton').click();
		cy.location('pathname').should('eq', '/');

		cy.wait(500);
		cy.getByDataTestAttribute('logout-button').should('exist').as('logoutButton');
		cy.get('@logoutButton').click();
		cy.location('pathname').should('eq', '/login');
	});

	it('Should verify form validations', () => {
		const invalidEmail = 'invalid@invalid';
		cy.get('@loginButton').click();
		cy.contains('Email is required').should('exist');
		cy.contains('Password is required').should('exist');

		cy.get('@emailInput').type(invalidEmail);
		cy.get('@loginButton').click();
		cy.contains('Invalid email').should('exist');
	});
});
