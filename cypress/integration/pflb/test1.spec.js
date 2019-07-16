context('Test 1', () => {
    let userId;
    let apiUsersRes;
    let test;
    let resInfo;
    let userInfoRes;
    beforeEach(() => {
        cy.server({
            method: 'POST',
            delay: 1000,
            status: 200,
            response: {}
        });
        cy.fixture('test.json')
            .then((data) => {
                test = data;
                cy.login(test.login, test.password)
            })
            .then((res) => {
                userId = res.body.userId;
                cy.request('GET', `/u/${test.login}`)
                    .then((response) => {
                        userInfoRes = response.body;
                    });
                cy.request(`/api/users/${userId}`)
                    .then((response) => {
                        apiUsersRes = JSON.parse(response.body);
                    });
                cy.visit('/');
            });
    });

    describe('Test 1', () => {
        it('change information', () => {
            cy.route(`/u/${test.login}`, () => {
                return userInfoRes
            });
            cy.get('.item-session > .ButtonGroup > .Dropdown-toggle').click();
            cy.get('.item-profile > .hasIcon').click();
            cy.get('.UserBio-content').click();
            cy.request(`/api/posts?filter[user]=${userId}&filter[type]=comment&page[limit]=20&sort=-createdAt`)
                .then((response) => {
                    resInfo = JSON.parse(response.body);
                });
            cy.route(`/api/users/${userId}`, () => {
                apiUsersRes.data.attributes.bio = test.information;
                if (resInfo.included) {
                    resInfo.included[0] = apiUsersRes.data
                } else {
                    resInfo.included = [apiUsersRes.data]
                }
                return (apiUsersRes)
            }).as('userInfo');
            cy.route('GET', `/api/posts?filter[user]=${userId}&filter[type]=comment&page[limit]=20&sort=-createdAt`, () => {
                return ({data: resInfo.data ? resInfo.data : [], included: resInfo.included,})
            }).as('postsInfo');
            cy.get('.UserBio > .FormControl')
                .clear()
                .should('have.value', '')
                .type(test.information)
                .blur();
            cy.wait('@userInfo');
            cy.visit('/');
            cy.get('.item-session > .ButtonGroup > .Dropdown-toggle').click();
            cy.get('.item-profile > .hasIcon').click();
            cy.wait('@postsInfo')
                .then((res) => {
                    expect(res.response.body.included[0].attributes.bio).to.eql(test.information)
                });
            cy.get('.UserBio-content').contains(test.information)
        })
    })
});