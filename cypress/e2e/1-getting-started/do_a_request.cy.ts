import { url, waitForDebugger } from "inspector";


describe('Do a Request', () => {



  Cypress.Commands.add('login', (username, password) => {

    cy.visit('/login');
    cy.wait(2000);
    cy.get('input[name="username"]').type(username);
    cy.wait(2000);
    cy.get('input[name="password"]').type(password);
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    
  });

    // Usa cy.session() para mantener la sesión

    it('should redirect into a login page', () => {
      cy.visit('/');
      cy.wait(4000);
      cy.get('button[name="contact"]').click();
      cy.wait(2000);
      cy.get('button[name="do_request"]').click();
      cy.wait(2000);
      cy.url().should('include', '/login');
      cy.wait(2000);

    });

    it('should finally let me do a request', () => {
      cy.login('messi2','Messi1234');
      cy.wait(4000);
      cy.get('button[name="contact"]').click();
      cy.wait(2000);
      cy.get('button[name="do_request"]').click();
      cy.wait(2000);
      cy.url().should('include', '/designers/contact/all');
      cy.wait(2000);
    });
    
  
  });
  