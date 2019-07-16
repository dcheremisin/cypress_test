// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (login, password) => {
    let csrf;
    let cookie;

    cy.request('/')
        .its('headers')
        .then((headers) => {
            csrf = headers["x-csrf-token"];
            cookie = headers['cookie'];
            return({csrf, cookie})
        })
        .then((data)=> {
            cy.request({
                method: 'POST',
                url: '/login',
                cookie: data.csrf,
                failOnStatusCode: false,
                form: true,
                body: {
                    identification: login,
                    password,
                    remember: true,
                },
                headers: {
                    "X-CSRF-TOKEN": data.csrf
                }
            })
        })
        .then((resp) => {
            expect(resp.status).to.eq(200)
        })
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
