export const login = (username: string, password: string) => {
    cy.visit('/login');
    cy.wait(1000);
    cy.get('input[name="username"]').type(username);
    cy.wait(1000);
    cy.get('input[name="password"]').type(password);
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
};

export const register = (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
) => {
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
};
