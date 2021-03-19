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

    it('login fails with wrong password', function () {
        cy.contains('login').click();
        cy.get('#username').type('alfredasare');
        cy.get('#password').type('wrong');
        cy.get('#login-button').click();

        cy.get('.error').should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid');

        cy.get('html').should('not.contain', 'Alfred Asare logged in');
    });

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({username: 'alfredasare', password: 'plusultra'});

            // cy.contains('login').click();
            // cy.get('#username').type('alfredasare');
            // cy.get('#password').type('plusultra');
            // cy.get('#login-button').click();
            // cy.contains('Alfred Asare logged in');
        });

        it('a new note can be created', function () {
            cy.createNote({
                content: 'a note created by cypress',
                important: false
            });
            cy.contains('a note created by cypress');
        });

        describe.only('and a note exists', function () {
            beforeEach(function () {
                cy.createNote({ content: 'first note', important: false });
                cy.createNote({ content: 'second note', important: false });
                cy.createNote({ content: 'third note', important: false });
            });

            it('can be made important', function () {
                cy.contains('second note').parent().find('button').as('theButton');
                cy.get('@theButton').click();
                cy.get('@theButton').should('contain', 'make not important');
            });
        });
    });
});