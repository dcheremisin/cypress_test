## Cypress Automated testing

Automated 2 test cases for https://discuss.flarum.org.
Type your configurable values like login / password in a `fixtures/test.json` file.

####Test 1 Change user profile on front-end only:
Using the stubs to avoid changing the actual live forum.
1. Open discuss.flarum.org as a logged-in user (using relevant Cypress functions)
2. Open user profile
3. Change information about yourself. Verify new information is actually present in the relevant request.
4. Open forum home page
5. Open user profile
6. Verify new information is displayed

####Test 2 Post a reply
1. Open discuss.flarum.org as a logged-in user (using relevant Cypress functions)
2. Open discuss.flarum.org/t/sandbox
3. Open title with a certain title (should be configurable)
4. Reply
5. Refresh page
6. Verify the reply is displayed


###Start
Clone the repo https://github.com/dcheremisin/cypress_test.git

Install packages `$ npm install`

Run `$ npm run cypress:open` to open cypress and start tests.
You can also run all the tests with `$ npm run cypress:start`.
