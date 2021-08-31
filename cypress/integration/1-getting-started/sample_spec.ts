const url = 'http://localhost:3000'
describe('My First Test', () => {

    it('Does not do much', done => {
        cy.visit(url)
        cy.get('amplify-authenticator')
            .shadow()
            .get('amplify-sign-in')
            .shadow()
            .find('amplify-form-section')
            .find('amplify-auth-fields')
            .as('amplifyAuthFields');

        cy.get('@amplifyAuthFields')
            .find('amplify-username-field')
            .find('amplify-form-field')
            .find('input#username')
            .type('123{enter}')

        cy.get('@amplifyAuthFields')
            .find('amplify-password-field')
            .find('amplify-form-field')
            .find('input#password').type('123')
    })
})