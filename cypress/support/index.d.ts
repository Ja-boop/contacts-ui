declare namespace Cypress {
	interface Chainable {
		getByDataTestAttribute(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
		upload_file(fileName: string, fileType?: string, selector: string): Chainable<void>;
	}
}
