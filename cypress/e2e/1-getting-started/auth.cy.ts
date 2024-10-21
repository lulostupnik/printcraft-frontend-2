describe('Authentication', () => {

    const name = 'Juan';
    const surname = 'Perez';
    const username1 = 'juanrulo15';
    const email = `${username1}@gmail.com`;
    const password = "Juan33233399citoRUlo!";
    const username2='juanrulo15';

    it('deberia poder registrarse', () => {

        cy.visit('/register');
        cy.get('input[name="name"]').type(name);
        cy.wait(1000);
        cy.get('input[name="surname"]').type(surname);
        cy.wait(1000);
        cy.get('input[name="username"]').type(username1);
        cy.wait(1000);
        cy.get('input[name="email"]').type(email);
        cy.wait(1000);
        cy.get('input[name="password"]').type(password);
        cy.wait(1000);
        cy.get('input[name="confirmPassword"]').type(password);
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.wait(3000);

      });

    it('should log in successfully with valid credentials', () => {

      cy.visit('/login');
      cy.wait(1000);
      cy.get('input[name="username"]').type(username2);
      cy.wait(2000);
      cy.get('input[name="password"]').type(password);
      cy.wait(1000);
      cy.get('button[type="submit"]').click();
      cy.wait(2000);
      cy.contains('Bienvenido Juan');
      cy.wait(2000);

    });
  
  });