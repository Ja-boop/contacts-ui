import Contact from '../fixtures/contact.json';
const contact = Contact;

describe('Contact', () => {
	beforeEach(() => {
		cy.visit('/login');
		cy.wait(500);
		cy.getByDataTestAttribute('email-input').type('test@example.com');
		cy.getByDataTestAttribute('password-input').type('password');
		cy.getByDataTestAttribute('login-button').click();
		cy.location('pathname').should('eq', '/');
	});

	it('Should create and edit a contact', () => {
		const fileName = 'example.jpg';
		cy.getByDataTestAttribute('add-contact-btn').click();
		const inputs = {
			name: contact.name,
			title: contact.title,
			address: contact.address,
			email: contact.email,
			phone: contact.phone
		};

		Object.entries(inputs).forEach(([key, value]) => {
			cy.getByDataTestAttribute(`${key}-input`).type(value);
		});

		cy.fixture(fileName).then((file) => {
			cy.getByDataTestAttribute('file-input').attachFile({
				fileContent: file.toString(),
				fileName,
				mimeType: 'image/jpg',
				filePath: `../fixtures/${fileName}`
			});
		});

		cy.getByDataTestAttribute('submit-btn').as('submitBtn').click();
		cy.getByDataTestAttribute('search-input').type(contact.name);
		cy.getByDataTestAttribute('contact-list-item').contains(contact.name).as('contact');

		cy.get('@contact').click();
		cy.getByDataTestAttribute('edit-btn').click();
		cy.getByDataTestAttribute('title-input').should('contain.value', contact.title).as('titleInput');
		cy.get('@titleInput').clear().type('CEO');
		cy.get('@submitBtn').click().location('pathname').should('not.contain', 'edit');
		cy.getByDataTestAttribute('contact-title').should('contain.text', 'CEO');
	});
});
