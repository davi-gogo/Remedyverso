document.addEventListener("DOMContentLoaded", async () => {
    const elementosInclude = document.querySelectorAll("[data-include]");

    for (const el of elementosInclude) {
        const arquivo = el.getAttribute("data-include");
        try {
            const resposta = await fetch(arquivo);
            if (resposta.ok) {
                el.innerHTML = await resposta.text();
            } else {
                console.error(`Erro ao carregar ${arquivo}: ${resposta.status}`);
            }
        } catch (erro) {
            console.error(`Falha ao buscar ${arquivo}:`, erro);
        }
    }

    configurarMenuAtivoScroll();
    configurarFormularioEAM();
});

// RECURSO JS 1: Destaque dinâmico do link ativo na Navbar ao rolar a página
function configurarMenuAtivoScroll() {
    const secoes = document.querySelectorAll("section[id]");
    const linksMenu = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", () => {
        let secaoAtual = "";
        secoes.forEach(secao => {
            const topoSecao = secao.offsetTop - 120;
            if (window.scrollY >= topoSecao) {
                secaoAtual = secao.getAttribute("id");
            }
        });

        linksMenu.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${secaoAtual}`) {
                link.classList.add("active");
            }
        });
    });
}

// RECURSO JS 2: Validação e Envio Assíncrono do Formulário de Registro de EAM
function configurarFormularioEAM() {
    const form = document.getElementById('form-registro-eam');
    if (!form) return;

    const inputNome = document.getElementById('nome-agente');
    const inputEmail = document.getElementById('email-contato');
    const selectEvento = document.getElementById('evento-observado');
    const inputDescricao = document.getElementById('descricao-eam');
    const feedback = document.getElementById('feedback-formulario');
    const btnEnviar = document.getElementById('btn-enviar-eam');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        [inputNome, inputEmail, selectEvento, inputDescricao].forEach(campo => {
            campo.classList.remove('campo-invalido', 'is-invalid');
        });
        feedback.classList.add('d-none');

        let formularioValido = true;

        if (inputNome.value.trim().length < 3) {
            mostrarErroCampo(inputNome, 'erro-nome', 'Informe um nome válido (mínimo 3 caracteres).');
            formularioValido = false;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(inputEmail.value.trim())) {
            mostrarErroCampo(inputEmail, 'erro-email', 'Insira um endereço de e-mail válido.');
            formularioValido = false;
        }

        if (!selectEvento.value) {
            mostrarErroCampo(selectEvento, 'erro-evento', 'Selecione o tipo de Evento Paranatural observado.');
            formularioValido = false;
        }

        if (inputDescricao.value.trim().length < 15) {
            mostrarErroCampo(inputDescricao, 'erro-descricao', 'Descreva o acontecimento com mais detalhes (mínimo 15 caracteres).');
            formularioValido = false;
        }

        if (!formularioValido) {
            exibirFeedback('danger', 'ERRO DE PROTOCOLO: Verifique os campos destacados antes de transmitir.');
            return;
        }

        btnEnviar.disabled = true;
        btnEnviar.textContent = 'TRANSMITINDO DADOS...';

        try {
            const dadosForm = new FormData(form);
            const resposta = await fetch(form.action, {
                method: 'POST',
                body: dadosForm,
                headers: { 'Accept': 'application/json' }
            });

            if (resposta.ok) {
                exibirFeedback('success', 'TRANSMISSÃO CONCLUÍDA: Relatório de EAM registrado e enviado à central do DFC.');
                form.reset();
            } else {
                exibirFeedback('danger', 'FALHA NA TRANSMISSÃO: Não foi possível conectar ao servidor de e-mail.');
            }
        } catch (erro) {
            exibirFeedback('danger', 'ERRO DE REDE: Verifique sua conexão com a internet e tente novamente.');
        } finally {
            btnEnviar.disabled = false;
            btnEnviar.textContent = 'Transmitir Relatório // FBC';
        }
    });

    function mostrarErroCampo(elemento, idMensagem, texto) {
        elemento.classList.add('campo-invalido', 'is-invalid');
        const divErro = document.getElementById(idMensagem);
        if (divErro) divErro.textContent = texto;
    }

    function exibirFeedback(tipo, mensagem) {
        feedback.className = `alert alert-${tipo} font-monospace small mb-0`;
        feedback.textContent = mensagem;
        feedback.classList.remove('d-none');
    }
}