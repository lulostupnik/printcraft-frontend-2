describe('Authentication', () => {

    it('deberia poder registrarse', () => {

        cy.visit('/register');
        cy.get('input[name="name"]').type('Juan');
        cy.wait(1000);
        cy.get('input[name="surname"]').type('Perez');
        cy.wait(1000);
        cy.get('input[name="username"]').type('juanrulo5');
        cy.wait(1000);
        cy.get('input[name="email"]').type('juanrulo3@gmail.com');
        cy.wait(1000);
        cy.get('input[name="password"]').type('Juanrulo123');
        cy.wait(1000);
        cy.get('input[name="confirmPassword"]').type('Juanrulo123');
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.wait(3000);

      });

    it('should log in successfully with valid credentials', () => {

      cy.visit('/login');
      cy.wait(1000);
      cy.get('input[name="username"]').type('juanrulo5');
      cy.wait(2000);
      cy.get('input[name="password"]').type('Juanrulo123');
      cy.wait(1000);
      cy.get('button[type="submit"]').click();
      cy.wait(2000);
      cy.contains('Bienvenido Juan');
      cy.wait(2000);

    });
  
  });
  