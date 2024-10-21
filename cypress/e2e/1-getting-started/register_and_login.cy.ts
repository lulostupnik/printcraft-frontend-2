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
<<<<<<< HEAD
        cy.get('input[name="username"]').type(username);
        cy.wait(1000);
        cy.get('input[name="email"]').type(mail);
=======
        cy.get('input[name="username"]').type('juanrulo5');
        cy.wait(1000);
        cy.get('input[name="email"]').type('juanrulo3@gmail.com');
>>>>>>> cca3be4cdcfc1e120f8a4a1b5fb211a23ebce27a
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
<<<<<<< HEAD
      cy.get('input[name="username"]').type(username);
=======
      cy.get('input[name="username"]').type('juanrulo5');
>>>>>>> cca3be4cdcfc1e120f8a4a1b5fb211a23ebce27a
      cy.wait(2000);
      cy.get('input[name="password"]').type(password);
      cy.wait(1000);
      cy.get('button[type="submit"]').click();
      cy.wait(2000);
<<<<<<< HEAD
      cy.contains(`Bienvenido ${name}`);
      cy.wait(1000);
=======
      cy.contains('Bienvenido Juan');
      cy.wait(2000);
>>>>>>> cca3be4cdcfc1e120f8a4a1b5fb211a23ebce27a

    });
  
  });
  