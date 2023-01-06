var botao = document.getElementById("botao");
var limpar = document.getElementById("limpar");
var vetorTarefas = []; // armazenar os objetos da classe Tarefa
var linha = "";

function submeterForm() {
    // criar objeto tarefa
    var tarefa = new Tarefas(criarId(), document.getElementById("nome").value,
        document.getElementById("prazo").value,
        document.getElementById("localEntrega").value);
    if (document.getElementById("nome").value == '') {
        alert("Campo nome não pode ser vazio")
    } else if (document.getElementById("prazo").value == '') {
        alert("Campo prazo não pode ser vazio")
    } else if (document.getElementById("localEntrega").value == '') {
        alert("Campo Local entrega não pode ser vazio")
    } else {
        if (linha == "") { // incluir tarefa
            adicionaLinha(tarefa); // adiciona linha na tabela com os dados da tarefa
            vetorTarefas.push(tarefa); // adiciona tarefa ao vetor
        } else { // alterar tarefa
            alterarTarefa(tarefa);
        }
        gravarNavegador(); // chama função para gravar dados no navegador
        limparCampos(); // limpar o form
        linha = "";
    }
}

function alterarTarefa(tarefa) {
    // alterara dados da tabela html
    linha.cells[0].innerHTML = tarefa.nome;
    linha.cells[1].innerHTML = tarefa.prazo;
    linha.cells[2].innerHTML = tarefa.localEntrega;
    var ind = linha.rowIndex - 1;
    vetorTarefas[ind] = tarefa; // atualiza dados no vetor     
}


function gravarNavegador() {
    var dados = JSON.stringify(vetorTarefas); // converte vetor para string 
    console.log(dados);
    localStorage.setItem("tarefas", dados); // grava no navegadr com a chave "tarefa"
}

function pegarNavegador() {

    if (localStorage.hasOwnProperty("tarefas")) { // se existir chave tarefas no localstorage
        vetorTarefas = JSON.parse(localStorage.getItem("tarefas"));
        // converte de string para Json
        console.log("dados carregados do navegador");
        console.log(vetorTarefas);
    }
}

function adicionaLinha(tarefa) {

    var tabela = document.getElementById("lista").getElementsByTagName("tbody")[0];

    var linha = document.createElement("tr"); // criar linha
    var campoNome = document.createElement("td");
    var campoPrazo = document.createElement("td");
    var campoLocalEntrega = document.createElement("td");
    var botaoAlterar = document.createElement("td");
    var botaoExcluir = document.createElement("td");
    campoNome.innerHTML = tarefa.nome;
    campoPrazo.innerHTML = tarefa.prazo;
    campoLocalEntrega.innerHTML = tarefa.localEntrega;
    // criar os botões
    var btnAlterar = document.createElement("IMG");
    btnAlterar.src = "img/lapis.svg";
    btnAlterar.style.width = "16px";
    btnAlterar.style.height = "16px";
    btnAlterar.style.color = "#222831";
    var btnExcluir = document.createElement("IMG");
    btnExcluir.src = "img/cruz.svg";
    btnExcluir.style.width = "16px";
    btnExcluir.style.height = "16px";
    btnExcluir.style.color = "#222831";
    btnAlterar.addEventListener("click", alterar);
    btnExcluir.addEventListener("click", excluir);

    // acrescentar os botões nas colunas
    botaoAlterar.appendChild(btnAlterar);
    botaoExcluir.appendChild(btnExcluir)
        // acrescentar as colunas na linha
    linha.appendChild(campoNome);
    linha.appendChild(campoPrazo);
    linha.appendChild(campoLocalEntrega);
    linha.appendChild(botaoAlterar);
    linha.appendChild(botaoExcluir);

    tabela.appendChild(linha);
}

function alterar() {
    console.log("clicou no alterar");
    linha = this.parentElement.parentElement;
    document.getElementById("nome").value = linha.cells[0].innerHTML;
    document.getElementById("prazo").value = linha.cells[1].innerHTML;
    document.getElementById("localEntrega").value = linha.cells[2].innerHTML;
}

function excluir() {
    console.log("clicou no excluir");
    if (confirm("Confirma exclusão?")) { // confirmou
        var lin = this.parentElement.parentElement; // pega a linha (tr)
        console.log(">>> " + lin.innerHTML);
        var ind = lin.rowIndex; //pega o índice da linha
        console.log("indice: " + ind);
        // excluir do vetor
        vetorTarefas.splice(ind - 1, 1);
        //excluir da tabela html
        document.getElementById("lista").deleteRow(ind);
        // atualizar dados no navegador
        gravarNavegador();
    }
}

function limparCampos() {
    console.log("limpando form");
    document.getElementById("form").reset(); // limpar form;
}

function mostrarTabela() {

    pegarNavegador();
    /// limpar tabela
    document.getElementById("lista").getElementsByTagName("tbody").innerHTML = "";
    vetorTarefas.forEach(function(tarefa) {
        adicionaLinha(tarefa);
    });
}

function criarId() {
    var id = 0;
    vetorTarefas.forEach(function(tarefa) {
        if (tarefa.id > id)
            id = tarefa.id
    });
    return id + 1;
}

mostrarTabela();
botao.addEventListener("click", submeterForm);
limpar.addEventListener("click", limparCampos);