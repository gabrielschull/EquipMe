const { isReadable } = require('stream');

/* eslint-disable no-undef */
describe('Login test', () => {
  it('opens the /login page and sees the form', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="email"]').type('ivanzoloto@tutamail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();
  });

  it('gets to /home after successful login', () => {
    cy.visit('http://localhost:3000/home');
  });
});

// describe('add gear', ()=> {
//   it('add new gear to the website', () => {
//     cy.visit('http://localhost:3000/addgear');
//     cy.get('button[type="submit"]').click();

//   });
// });
