import { url } from "inspector";
import 'cypress-file-upload';


describe('Start Selling', () => {


    // Usa cy.session() para mantener la sesión
    Cypress.Commands.add('login', (username, password) => {
        cy.visit('/login');
        cy.wait(1000);
        cy.get('input[name="username"]').type(username);
        cy.wait(1000);
        cy.get('input[name="password"]').type(password);
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
    });

    // Usa cy.session() para mantener la sesión
    Cypress.Commands.add('register', (firstName, lastName, username, email, password) => {
      cy.visit('/register');
      cy.wait(1000);
      cy.get('input[name="name"]').type(firstName);
      cy.wait(1000);
      cy.get('input[name="surname"]').type(lastName);
      cy.wait(1000);
      cy.get('input[name="username"]').type(username);
      cy.wait(1000);
      cy.get('input[name="email"]').type(email);
      cy.wait(1000);
      cy.get('input[name="password"]').type(password);
      cy.wait(1000);
      cy.get('input[name="confirmPassword"]').type(password);
      cy.wait(1000);
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
  });

    it('should login into a user that is a seller and publish a product', () => {
      cy.visit('/');
      cy.wait(1000);
      cy.login('juancitorulo','Juancitorulo123');
      cy.wait(1000);
      cy.get('button[name="publish_product"]').click();
      cy.wait(2000);
      cy.get('input[name="name"]').type("Millenium Falcon 2");
      cy.wait(1000);
      cy.get('textarea[name="description"]').type("The best ship in the entire galaxy");
      cy.wait(1000);
      cy.get('input[name="price"]').type("50");
      cy.wait(1000);
      cy.get('input[name="material"]').type("PVS");
      cy.wait(1000);
      cy.get('input[name="stock"]').type("7");
      cy.wait(2000);
      cy.get('input[name="imageFiles"]').attachFile('millenium_falcon.jpg');;
      cy.wait(2000);
      cy.get('button[type="submit"]').click();
      cy.wait(2000);

    });

    it('should appear as a product', () => {
        cy.visit('/');
        cy.wait(1000);
        cy.get('button[name="catalog"]').click();
        cy.wait(2000);
        cy.contains('Millenium Falcon 2');
        cy.wait(2000);
  
      });

  
  });
  