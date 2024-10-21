import { name, surname, username, mail, store_name, password } from './user';
import { login, register } from './commands'; 

describe('Start Selling', () => {

    Cypress.Commands.add('login', login); 
    Cypress.Commands.add('register', register); 

    it('should redirect into a login page', () => {
      cy.visit('/');
      cy.wait(2000);
      cy.get('button[name="startSelling"]').click();
      cy.wait(2000);
      cy.url().should('include', '/login');
      cy.wait(2000);
    });

    it('should register as a seller successfully', () => {
    
      cy.register(name, surname,username,mail,password);
      cy.login(username,password);

      cy.wait(2000);
      cy.get('button[name="startSelling"]').click();
      cy.wait(2000);
      cy.url().should('include', '/register_seller');
      cy.wait(2000);
      cy.get('input[name="address"]').type('Libertador 3500');
      cy.wait(2000);
      cy.get('input[name="storeName"]').type(store_name);
      cy.wait(2000);
      cy.get('textarea[name="description"]').type('La mejor tienda de todo Belgrano');
      cy.wait(2000);
      cy.get('input[name="email"]').type(mail);
      cy.wait(2000);
      cy.get('button[type="submit"]').click();
      cy.wait(2000);
    });

    it('finally be able to visit the seller page', () => {
      cy.visit('/');
      cy.wait(2000);
      cy.login(username,password);
      cy.wait(2000);
      cy.url().should('include', '/seller_landing');
      cy.wait(2000);
    });

  
  });
  