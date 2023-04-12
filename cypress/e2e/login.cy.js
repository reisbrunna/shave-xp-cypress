import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'


describe('login', () => {

    context('quando submeto o formulario', () => {

        it('deve logar com sucesso', () => {

            const user = {
                name: 'Teste',
                email: 'qax@mailinator.com',
                password: 'teste123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('senha incorreta', () => {

            const user = {
                name: 'Teste',
                email: 'qax@mailinator.com',
                password: 'senhaerrada'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('email nao cadastrado', () => {

            const user = {
                name: 'Teste',
                email: 'qax@404.com',
                password: 'senhaerrada'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('campos obrigatorios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })

        context('senha muito curta', () => {
            const passwords = [
                '1',
                '12',
                '123',
                '1234',
                '12345'
            ]

            passwords.forEach((p) => {
                it(`nao deve logar com a senha: ${p}`, () => {
                    loginPage.submit('qax@mailinator.com', p)
                    loginPage.alertShouldBe('Pelo menos 6 caracteres')

                })
            })
        })

        context('email no formato incorreto', () => {
            const emails = [
                'qax&mailinator.com',
                'qax.com',
                '@',
                '123456',
                '!@#$%',
                'abc123'
            ]

            emails.forEach((e) => {
                it(`nao deve logar com o email: ${e}`, () => {
                    loginPage.submit(e, 'teste123')
                    loginPage.alertShouldBe('Informe um email válido')
                })
            })
        })

    })


})


