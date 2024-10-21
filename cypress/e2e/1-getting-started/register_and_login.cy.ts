describe('Authentication', () => {

  const name = 'Juan';
  const surname = 'Perez';
  const username = 'juancho222001';
  const mail = 'juanrulo2@gmail.com';
  const password = 'Juanrulo123'

    it('deberia poder registrarse', () => {
    
        cy.visit('/register');
        cy.get('input[name="name"]').type(name);
        cy.wait(1000);
        cy.get('input[name="surname"]').type(surname);
        cy.wait(1000);
        cy.get('input[name="username"]').type(username);
        cy.wait(1000);
        cy.get('input[name="email"]').type(mail);
        cy.wait(1000);
        cy.get('input[name="password"]').type(password);
        cy.wait(1000);
        cy.get('input[name="confirmPassword"]').type(password);
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

      });

    it('should log in successfully with valid credentials', () => {

      cy.visit('/login');
      cy.wait(1000);
      cy.get('input[name="username"]').type(username);
      cy.wait(2000);
      cy.get('input[name="password"]').type(password);
      cy.wait(1000);
      cy.get('button[type="submit"]').click();
      cy.wait(2000);
      cy.contains(`Bienvenido ${name}`);
      cy.wait(1000);

    });
  
  });
  