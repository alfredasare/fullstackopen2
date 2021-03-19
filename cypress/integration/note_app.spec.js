describe('Note app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        const user = {
            name: 'Alfred Asare',
            username: 'alfredasare',
            password: 'plusultra'
        };
        cy.request('POST', 'http://localhost:3001/api/users', user);
        cy.visit('http://localhost:3000');
    });

    it('front page can be opened', function () {
        cy.contains('Notes');
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2020');
    });

    it('user can log in', function () {
        cy.contains('login').click();
        cy.get('#username').type('alfredasare');
        cy.get('#password').type('plusultra');
        cy.get('#login-button').click();
        cy.contains('Alfred Asare logged in');
    });

    describe('when logged in', function () {
        beforeEach(function () {
            cy.contains('login').click();
            cy.get('#username').type('alfredasare');
            cy.get('#password').type('plusultra');
            cy.get('#login-button').click();
            // cy.contains('Alfred Asare logged in');
        });

        it('a new note can be created', function () {
            cy.contains('new note').click();
            cy.get('input').type('a note created by cypress');
            cy.contains('save').click();
            cy.contains('a note created by cypress');
        });

        describe('and a note exists', function () {
            beforeEach(function () {
                cy.contains('new note').click();
                cy.get('input').type('another cypress note');
                cy.contains('save').click();
            });

            it('can be made important', function () {
                cy
                    .contains('another cypress note')
                    .contains('make important')
                    .click();

                cy
                    .contains('another cypress note')
                    .contains('make not important');
            });
        });
    });
});