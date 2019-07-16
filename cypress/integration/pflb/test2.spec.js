context('Test 2', () => {
    let test;
    beforeEach(() => {
        cy.fixture('test.json')
            .then((data) => {
                test = data;
                cy.login(test.login, test.password)
            })
            .then(() => {
                cy.visit('/t/sandbox')
            })
    });

    describe('Test 2', () => {
        it('leave comment', () => {
            cy.get('.DiscussionListItem-title')
                .contains(test.title).click();
            cy.get('.Post > .Post-header').click();
            cy.get('.ComposerBody-mentionsWrapper > .FormControl.Composer-flexible')
                .should('have.value', '')
                .type(test.information);
            cy.get('.item-submit > .Button').click();
            cy.reload()
        })
    })
});