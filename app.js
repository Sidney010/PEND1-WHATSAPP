'use strict'


const numero = '11987876567'
async function contatosDisponiveis(numero) {

    const url = `https://missao04-backend-hiperlegal.onrender.com/v1/whatsapp/contato/dadosUser/${numero}`
    const pathImg = './img/'

    try {
        const response = await fetch(url)
        const dados = await response.json()
        const contatos = dados.dados_conversas

        const containerPrincipal = document.querySelector('.area-meio')


        contatos.forEach(contato => {

            const containerPessoas = document.createElement('div')
            containerPessoas.classList.add('pessoas')

            const divConfig = document.createElement('div')
            divConfig.classList.add('config')

            const perfilContatos = document.createElement('div')
            perfilContatos.classList.add('perfil-contatos')

            const img = document.createElement('img')
            img.src = pathImg + contato.foto

            perfilContatos.appendChild(img)

            const nomeDescricao = document.createElement('div')
            nomeDescricao.classList.add('nome-contato-descricao')

            const spanNome = document.createElement('span')
            spanNome.textContent = contato.nome

            const spanDescricao = document.createElement('span')
            spanDescricao.textContent = contato.descricao

            nomeDescricao.appendChild(spanNome)
            nomeDescricao.appendChild(spanDescricao)

            divConfig.appendChild(perfilContatos)
            divConfig.appendChild(nomeDescricao)

            containerPessoas.appendChild(divConfig)        
            containerPrincipal.appendChild(containerPessoas)
            

            containerPessoas.addEventListener('click', () => {
                const nomeArquivo = contato.foto
                const nomeSemExtensao = nomeArquivo.replace(/\.[^.]+$/, '') 
                chamandoConversa(numero, nomeSemExtensao, contato)
            })
            
        })

    } catch (erro) {
        console.error("Erro ao carregar contatos:", erro)
    }
}

async function chamandoConversa(number, contatoNumber, contato) {
    const url = `https://missao04-backend-hiperlegal.onrender.com/v1/whatsapp/contato/conversa/?userNumber=${number}&contatoNumber=${contatoNumber}`

    try {
        const response = await fetch(url)
        const dados = await response.json()
        const mensagens = dados.conversas
        const perfilImg = document.querySelector('#perfil-conversa-destinatario img')
        perfilImg.src = `./img/${contato.foto}`

        document.querySelector('#nome span').textContent = contato.nome
        document.querySelector('#number span').textContent = contatoNumber

        const chatContainer = document.querySelector('.conversa-medio')
        chatContainer.innerHTML = ''

        mensagens.forEach(msg => {
            if (msg.remetente === 'me') {

                const msgRemetente = document.createElement('div')
                msgRemetente.classList.add('menssager-remetente')

                const msgDiv = document.createElement('div')
                msgDiv.classList.add('mensagem')

                const conteudoDiv = document.createElement('div')
                conteudoDiv.classList.add('conteudo')

                const spanTexto = document.createElement('span')
                spanTexto.textContent = msg.conteudo
                conteudoDiv.appendChild(spanTexto)

                const horarioDiv = document.createElement('div')
                horarioDiv.classList.add('horario')

                const spanHora = document.createElement('span')
                spanHora.textContent = msg.horario
                horarioDiv.appendChild(spanHora)

                msgDiv.appendChild(conteudoDiv)
                msgDiv.appendChild(horarioDiv)

                const espacamento = document.createElement('div')
                espacamento.classList.add('espacamento')

                msgRemetente.appendChild(msgDiv)
                msgRemetente.appendChild(espacamento)

                chatContainer.appendChild(msgRemetente)

            } else {
                const msgDestinatario = document.createElement('div')
                msgDestinatario.classList.add('menssager-destinatario')

                const espacamento = document.createElement('div')
                espacamento.classList.add('espacamento')

                const msgDiv = document.createElement('div')
                msgDiv.classList.add('mensagem')

                const conteudoDiv = document.createElement('div')
                conteudoDiv.classList.add('conteudo')

                const spanTexto = document.createElement('span')
                spanTexto.textContent = msg.conteudo
                conteudoDiv.appendChild(spanTexto)

                const horarioDiv = document.createElement('div')
                horarioDiv.classList.add('horario')

                const spanHora = document.createElement('span')
                spanHora.textContent = msg.horario
                horarioDiv.appendChild(spanHora)

                msgDiv.appendChild(conteudoDiv)
                msgDiv.appendChild(horarioDiv)

                msgDestinatario.appendChild(espacamento)
                msgDestinatario.appendChild(msgDiv)

                chatContainer.appendChild(msgDestinatario)
            }
        })

    } catch (erro) {
        console.error("Erro ao carregar conversa:", erro)
    }
}

contatosDisponiveis(numero)

