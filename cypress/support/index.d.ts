declare namespace Cypress {
    interface Chainable {
      /**
       * Comando personalizado para iniciar sesión
       * @example cy.login('user@example.com', 'password123')
       */
      login(username, password): Chainable<void>;
      register(firstName, lastName, username, email, password): Chainable<void>;
    }
  }

// cypress/support/index.js
Cypress.Cookies.defaults({
  preserve: (cookie) => {
    // Puedes devolver true para preservar todas las cookies, o usar el nombre de la cookie
    return cookie.name === 'nombre_de_la_cookie_de_sesion';
  },
});
