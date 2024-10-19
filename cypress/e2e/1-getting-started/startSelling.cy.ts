import { url } from "inspector";


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

    it('should redirect into a login page', () => {
      cy.visit('/');
      cy.wait(1000);
      cy.get('button[name="startSelling"]').click();
      cy.wait(1000);
      cy.url().should('include', '/login');
      cy.wait(1000);
    });

    it('should register as a seller successfully', () => {


      cy.login('juanrulo2', 'Juanrulo123');

      cy.wait(2000);
      cy.get('button[name="startSelling"]').click();
      cy.wait(1000);
      cy.url().should('include', '/register_seller');
      cy.wait(1000);
      cy.get('input[name="address"]').type('Libertador 3500');
      cy.wait(1000);
      cy.get('input[name="storeName"]').type('Juan y Asociados');
      cy.wait(1000);
      cy.get('textarea[name="description"]').type('La mejor tienda de todo Belgrano');
      cy.wait(1000);
      cy.get('input[name="email"]').type('juanrulo@gmail.com');
      cy.wait(1000);
      cy.get('button[type="submit"]').click();
      cy.wait(2000);
    });

    it('finally be able to visit the seller page', () => {
      cy.visit('/');
      cy.wait(1000);
      cy.login('juanrulo2', 'Juanrulo123');
      cy.wait(2000);
      cy.get('button[name="startSelling"]').click();
      cy.wait(1000);
      cy.url().should('include', '/seller_home');
      cy.wait(1000);
    });

  
  });
  