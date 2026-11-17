# // UCR — Remedyverso (Universo Conectado da Remedy)

Aplicação Web One Page (SPA) desenvolvida como Projeto Final da unidade curricular de Front-end. O site apresenta de forma interativa e responsiva o universo conectado dos jogos da *Remedy Entertainment* (*Alan Wake* e *Control*), adotando uma identidade visual inspirada nos arquivos confidenciais e na estética do *Departamento Federal de Controle (DFC)*.

*Link do Projeto Publicado (Deploy):* https://github.com/davi-gogo/Remedyverso

---

## Tema e Proposta do Projeto
O projeto tem como objetivo reunir informações, conceitos narrativos, exposição de jogos/expansões, linha do tempo cronológica e um canal de registro de manifestações Paranaturais do Universo Conectado da Remedy (UCR) em uma interface única, fluida e acessível em qualquer dispositivo.

---

## Tecnologias Utilizadas
* **HTML5 Semântico:** Estruturação das seções (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) e formulários.
* **CSS3 Personalizado:** Estilização temática escura, gradientes sobre imagens de fundo, animações (`@keyframes`), barras de rolagem customizadas nos cards e construção da linha do tempo em serpentina (*S-curve*) responsiva.
* **JavaScript (ES6+):** Manipulação do DOM, carregamento modular assíncrono, destaque dinâmico de navegação e validação de formulário.
* **Bootstrap v5+:** Sistema de grid responsivo, Navbar fixa com menu hambúrguer mobile, Badges, Cards e Accordions.

---

## Recursos Dinâmicos em JavaScript Implementados
1. **Arquitetura Modular via `fetch()`:** O `index.html` atua como carregador principal, injetando dinamicamente os módulos (`criador.html`, `jogos.html`, `conceitos.html`, `linha-tempo.html` e `contato.html`) por meio de atributos `data-include`.
2. **Destaque Dinâmico de Navegação (*ScrollSpy*):** Monitora a rolagem da página e atualiza automaticamente o link ativo na barra de navegação conforme a seção exibida na tela.
3. **Validação e Envio Assíncrono do Formulário de Registro de EAM:** Checagem em tempo real dos 4 campos obrigatórios (*Nome do Informante*, *E-mail para Contato*, *Evento Paranatural Observado* e *Descrição do Acontecimento*), exibição de feedback visual de erro/sucesso e envio direto para e-mail via **Formspree** sem recarregar a página.

---

## Estrutura de Arquivos
Site Remedyverso/
├── index.html          # Página principal (carregador da SPA)
├── style.css           # Folha de estilos personalizada
├── script.js           # Lógica de modularização, ScrollSpy e validação
├── criador.html        # Módulo: Diretor Criativo dos Jogos e Criador do Projeto-
├── jogos.html          # Módulo: Catálogo de jogos e expansões
├── conceitos.html      # Módulo: Ficheiro confidencial dos Conceitos (Accordions FBC)
├── linha-tempo.html    # Módulo: Cronologia em serpentina
├── contato.html        # Módulo: Formulário de Registro de manifestações Paranaturais e rodapé
├── Eu.jpg              # Imagem do Criador do Projeto
└── README.md           # Documentação do projeto
