/*import 'cypress-file-upload';
import { password, username } from './user';
import { login, register } from './commands'; 

describe('Start Selling', () => {
  
  const prod_name = 'Millenium Falcon XI';

  Cypress.Commands.add('login', login); 
  Cypress.Commands.add('register', register); 
  
  it('should login into a user that is a seller and publish a product', () => {
      cy.visit('/');
      cy.wait(2000);
      cy.login(username,password);
      cy.wait(2000);
      cy.get('button[name="publish_product"]').click();
      cy.wait(2000);
      cy.get('input[name="name"]').type(prod_name);
      cy.wait(2000);
      cy.get('textarea[name="description"]').type("The best ship in the entire galaxy");
      cy.wait(2000);
      cy.get('input[name="price"]').type("50");
      cy.wait(2000);
      cy.get('input[name="material"]').type("PVS");
      cy.wait(2000);
      cy.get('input[name="stock"]').type("7");
      cy.wait(2000);
      cy.get('input[name="imageFiles"]').attachFile('millenium_falcon.jpg');;
      cy.wait(2000);
      cy.get('button[type="submit"]').click();
      cy.wait(2000);

    });

    it('should appear as a product', () => {
        cy.visit('/');
        cy.wait(2000);
        cy.get('button[name="catalog"]').click();
        cy.wait(2000);
        cy.contains(prod_name);
        cy.wait(2000);
  
      });

  
  });*/
  