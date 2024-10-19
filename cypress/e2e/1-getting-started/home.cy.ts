describe('Home Page', () => {
    it('should load the home page', () => {

      cy.visit('/');
      cy.contains('Comprar'); // Verifica si el texto 'Bienvenido' aparece en la página
      cy.contains('Vender'); // Verifica si el texto 'Bienvenido' aparece en la página
      
    });
  });