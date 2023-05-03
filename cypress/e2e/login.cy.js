import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

import data  from '../fixtures/users-login.json'


describe('login', () => {

    context('quando submeto o formulario', () => {

        it('deve logar com sucesso', () => {

            const user = data.success
            loginPage.submit(user.email, user.password)
            cy.wait(5000)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('senha incorreta', () => {

            const user = data.invpass

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('email nao cadastrado', () => {

            const user = data.email404
            

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('campos obrigatorios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })

        context('senha muito curta', () => {
        
            data.shortpass.forEach((p) => {
                it(`nao deve logar com a senha: ${p}`, () => {
                    loginPage.submit('qax@mailinator.com', p)
                    loginPage.alertShouldBe('Pelo menos 6 caracteres')

                })
            })
        })

        context('email no formato incorreto', () => {
           

            data.invemails.forEach((e) => {
                it(`nao deve logar com o email: ${e}`, () => {
                    loginPage.submit(e, 'teste123')
                    loginPage.alertShouldBe('Informe um email válido')
                })
            })
        })

    })


})


