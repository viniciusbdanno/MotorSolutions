const formulario = document.querySelector(".form-contato");
if (formulario) {
    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();
        const dados = {
            nome: document.querySelector("#nome").value,
            email: document.querySelector("#email").value,
            empresa: document.querySelector("#empresa").value,
            interesse: document.querySelector("#interesse").value,
            mensagem: document.querySelector("#mensagem").value
        };
        try {
            const resposta = await fetch("http://localhost:3000/api/contato", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });
            const resultado = await resposta.json();
            if (resultado.sucesso) {
                alert("Mensagem enviada com sucesso!");
                formulario.reset();
            } else {
                alert("Não foi possível enviar a mensagem.");
            }
        } catch (erro) {
            console.error(erro);
            alert("Erro ao conectar com o servidor.");
        }
    });
}
/*------------------------------------------------------------------------------------------------*/
/* EFEITO DE DIGITAÇÃO DO HERO */
const texto = document.getElementById("texto-digitando");
if (texto) {
    const palavras = [
        "Monitore.",
        "Analise.",
        "Previna."
    ];
    let palavraAtual = 0;
    let letraAtual = 0;
    let apagando = false;
    function escrever() {
        const palavra = palavras[palavraAtual];
        if (!apagando) {
            texto.textContent = palavra.substring(0, letraAtual + 1);
            letraAtual++;
            if (letraAtual === palavra.length) {
                apagando = true;
                setTimeout(escrever, 1500);
                return;
            }
            setTimeout(escrever, 120);
        } else {
            if (letraAtual <= 1) {
                apagando = false;
                palavraAtual++;
                if (palavraAtual === palavras.length) {
                    palavraAtual = 0;
                }
                letraAtual = 0;
                setTimeout(escrever, 300);
                return;
            }
            letraAtual--;
            texto.textContent = palavra.substring(0, letraAtual);
            setTimeout(escrever, 70);
        }
    }
    escrever();
}
/*------------------------------------------------------------------------------------------------*/
/* ROLAGEM PARA CONTATO */
const botaoContato = document.getElementById("btn2");
const heroContato = document.getElementById("heroContato");
const secaoContato = document.getElementById("contato");
function irParaContato() {
    if (secaoContato) {
        secaoContato.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}
if (botaoContato) {
    botaoContato.addEventListener("click", irParaContato);
}
if (heroContato) {
    heroContato.addEventListener("click", irParaContato);
}
/*------------------------------------------------------------------------------------------------*/
/* SERVIÇOS */
const servicos = {
    motor: {
        legenda: "MONITORAMENTO",
        titulo: "Motor 01",
        dado1Nome: "Temperatura",
        dado1Valor: "68°",
        dado2Nome: "Vibração",
        dado2Valor: "2.4 mm/s",
        barra1: "68%",
        barra2: "48%",
        grafico: "Desempenho"
    },
    vibracao: {
        legenda: "ANÁLISE DE VIBRAÇÃO",
        titulo: "Vibração",
        dado1Nome: "Vibração",
        dado1Valor: "2.4 mm/s",
        dado2Nome: "Frequência",
        dado2Valor: "58 Hz",
        barra1: "52%",
        barra2: "61%",
        grafico: "Comportamento"
    },
    temperatura: {
        legenda: "MONITORAMENTO TÉRMICO",
        titulo: "Temperatura",
        dado1Nome: "Temperatura",
        dado1Valor: "68°",
        dado2Nome: "Limite",
        dado2Valor: "85°",
        barra1: "68%",
        barra2: "80%",
        grafico: "Temperatura"
    },
    dados: {
        legenda: "DADOS EM TEMPO REAL",
        titulo: "Dados",
        dado1Nome: "Leituras",
        dado1Valor: "1.248",
        dado2Nome: "Alertas",
        dado2Valor: "03",
        barra1: "82%",
        barra2: "22%",
        grafico: "Dados coletados"
    }
};
const itensServico = document.querySelectorAll(".servico-item");
itensServico.forEach((item) => {
    item.addEventListener("click", () => {
        const tipo = item.dataset.servico;
        const dados = servicos[tipo];
        if (!dados) return;
        itensServico.forEach((outro) => {
            outro.classList.remove("ativo");
        });
        item.classList.add("ativo");
        const titulo = document.getElementById("painel-titulo");
        const legenda = document.getElementById("painel-legenda");
        const dado1Nome = document.getElementById("dado-1-nome");
        const dado1Valor = document.getElementById("dado-1-valor");
        const dado2Nome = document.getElementById("dado-2-nome");
        const dado2Valor = document.getElementById("dado-2-valor");
        const barra1 = document.getElementById("barra-1");
        const barra2 = document.getElementById("barra-2");
        const graficoNome = document.getElementById("grafico-nome");
        if (legenda) legenda.textContent = dados.legenda;
        if (titulo) titulo.textContent = dados.titulo;
        if (dado1Nome) dado1Nome.textContent = dados.dado1Nome;
        if (dado1Valor) dado1Valor.innerHTML = dados.dado1Valor.includes(" ") ? dados.dado1Valor.split(" ")[0] + " <small>" + dados.dado1Valor.split(" ")[1] + "</small>" : dados.dado1Valor;
        if (dado2Nome) dado2Nome.textContent = dados.dado2Nome;
        if (dado2Valor) dado2Valor.innerHTML = dados.dado2Valor.includes(" ") ? dados.dado2Valor.split(" ")[0] + " <small>" + dados.dado2Valor.split(" ")[1] + "</small>" : dados.dado2Valor;
        if (barra1) barra1.style.width = dados.barra1;
        if (barra2) barra2.style.width = dados.barra2;
        if (graficoNome) graficoNome.textContent = dados.grafico;
    });
});
/*------------------------------------------------------------------------------------------------*/
/* SOLUÇÕES */
const dadosSolucoes = {
    motor: {
        etapa: "ETAPA 01",
        titulo: "Motor",
        letra: "M",
        dado1: "ROTAÇÃO",
        valor1: "1.780",
        dado2: "STATUS",
        valor2: "NORMAL",
        descricao: "Tudo começa no equipamento. A solução acompanha o comportamento do motor e cria uma base contínua de informações sobre sua operação.",
        progresso: "20%"
    },
    sensores: {
        etapa: "ETAPA 02",
        titulo: "Sensores",
        letra: "S",
        dado1: "TEMPERATURA",
        valor1: "68°C",
        dado2: "VIBRAÇÃO",
        valor2: "2.4 mm/s",
        descricao: "Sensores instalados no equipamento coletam informações importantes como temperatura, vibração e outros indicadores de funcionamento.",
        progresso: "40%"
    },
    conexao: {
        etapa: "ETAPA 03",
        titulo: "IoT",
        letra: "I",
        dado1: "CONEXÃO",
        valor1: "ATIVA",
        dado2: "PACOTES",
        valor2: "1.248",
        descricao: "Os dados coletados são enviados por uma camada de comunicação IoT, permitindo acompanhar os equipamentos sem depender de verificações manuais.",
        progresso: "60%"
    },
    dados: {
        etapa: "ETAPA 04",
        titulo: "Dados",
        letra: "D",
        dado1: "LEITURAS",
        valor1: "1.248",
        dado2: "ALERTAS",
        valor2: "03",
        descricao: "As informações chegam à plataforma e são organizadas para que sua equipe consiga visualizar o comportamento dos equipamentos com clareza.",
        progresso: "80%"
    },
    decisao: {
        etapa: "ETAPA 05",
        titulo: "Decisão",
        letra: "✓",
        dado1: "RISCO",
        valor1: "BAIXO",
        dado2: "AÇÃO",
        valor2: "PREVENIR",
        descricao: "Com informações claras em mãos, sua equipe pode identificar anomalias, antecipar problemas e tomar decisões antes que uma falha afete a operação.",
        progresso: "100%"
    }
};
const etapasSolucao = document.querySelectorAll(".solucao-etapa");
const solucaoStatus = document.getElementById("solucao-status");
const solucaoTitulo = document.getElementById("solucao-titulo");
const visualLetra = document.getElementById("visual-letra");
const visualDado1 = document.getElementById("visual-dado-1");
const visualValor1 = document.getElementById("visual-valor-1");
const visualDado2 = document.getElementById("visual-dado-2");
const visualValor2 = document.getElementById("visual-valor-2");
const solucaoDescricao = document.getElementById("solucao-descricao");
const solucaoProgresso = document.getElementById("solucao-progresso");
const painelSolucao = document.querySelector(".solucoes-painel");
function atualizarSolucao(tipo) {
    const dados = dadosSolucoes[tipo];
    if (!dados) return;
    etapasSolucao.forEach((etapa) => {
        etapa.classList.remove("ativa");
    });
    const etapaAtual = document.querySelector(`.solucao-etapa[data-solucao="${tipo}"]`);
    if (etapaAtual) {
        etapaAtual.classList.add("ativa");
    }
    if (painelSolucao) {
        painelSolucao.classList.remove("solucao-trocando");
        void painelSolucao.offsetWidth;
        painelSolucao.classList.add("solucao-trocando");
    }
    if (solucaoStatus) solucaoStatus.textContent = dados.etapa;
    if (solucaoTitulo) solucaoTitulo.textContent = dados.titulo;
    if (visualLetra) visualLetra.textContent = dados.letra;
    if (visualDado1) visualDado1.textContent = dados.dado1;
    if (visualValor1) visualValor1.textContent = dados.valor1;
    if (visualDado2) visualDado2.textContent = dados.dado2;
    if (visualValor2) visualValor2.textContent = dados.valor2;
    if (solucaoDescricao) solucaoDescricao.textContent = dados.descricao;
    if (solucaoProgresso) solucaoProgresso.style.width = dados.progresso;
}
etapasSolucao.forEach((etapa) => {
    etapa.addEventListener("click", () => {
        atualizarSolucao(etapa.dataset.solucao);
    });
});