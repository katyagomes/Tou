var botao = document.getElementById("botao");
var limpar = document.getElementById("limpar");
var botaoTarefa = document.getElementById("botaoTarefa");
var selecTarefa = document.getElementById("tarefas")
var vetor = [];
var obj = null;
var linha = null;
var vTodaTarefas = [];
var vTarefasDisc =[];


function SubmeterForm() {
    var obj = criarDisc();
    var nome = document.getElementById("nome");
    var nivelDifi = document.getElementById("dificuldade");
    var media = document.getElementById("media");
    if (nome.value == "" || nivelDifi.value == "" || media.value == "") {
        alert("Campo inválido!");
    }else {if (linha == null) {
        adicionaLinha(obj);
        vetor.push(obj);
    } else
        salvarDisc(obj);
    limparCampos();
    setDados();}
}

function criarDisc() {
    var disc = new Disciplina(criarId(), document.getElementById("nome").value,
        document.getElementById("dificuldade").value, document.getElementById("media").value);
        disc.tarefas = vTarefasDisc;
        console.log("teste");
        console.log(disc);

        return disc;

}
function alterar() {
    linha = this.parentElement.parentElement;
    document.getElementById("nome").value = linha.cells[0].innerHTML;
    document.getElementById("dificuldade").value = linha.cells[1].innerHTML;
    document.getElementById("media").value = linha.cells[2].innerHTML;
    var ind = linha.rowIndex -1;
    vTarefasDisc = vetor[ind].tarefas;
    mostrarTarefasDisc()

}
function mostrarTarefasDisc(){
    var caixa = document.getElementById('tarefas');
    caixa.innerHTML = '';
    vTarefasDisc.forEach(function (tarefa){
        var op = document.createElement('option');
        op.value = tarefa.id;
        op.text = tarefa.nome;
        caixa.add(op)
    })
}
function salvarDisc(disciplina) {
    linha.cells[0].innerHTML = disciplina.nome;
    linha.cells[1].innerHTML = disciplina.nivelDifi;
    linha.cells[2].innerHTML = disciplina.media;
    var ind = linha.rowIndex - 1;
    vetor[ind].nome = disciplina.nome;
    vetor[ind].nivelDifi = disciplina.nivelDifi;
    vetor[ind].media = disciplina.media;
    vetor[ind].tarefas = vTarefasDisc;

}

function excluirLinha() {
    if (confirm('Confirma exclusão ?')) {
        lin = this.parentElement.parentElement;
        vetor.splice(lin.rowIndex - 1, 1);
        document.getElementById("lista").deleteRow(lin.rowIndex);
        document.getElementById("form").reset();
        setDados();
    }
}

function setDados() {
    var dados = JSON.stringify(vetor);
    localStorage.setItem("disciplina", dados);
}

function getDados() {

    if (localStorage.hasOwnProperty("disciplina"))
        vetor = JSON.parse(localStorage.getItem("disciplina"))
}


function mostrarTabela() {
    getDados();
    document.getElementById("lista").getElementsByTagName('tbody').innerHTML = "";
    vetor.forEach(function (disciplina) {
        adicionaLinha(disciplina);
    });
}


function adicionaLinha(disciplina) {
    var table = document.getElementById("lista").getElementsByTagName('tbody')[0];

    var linha = document.createElement("tr");
    var campoNome = document.createElement("td");
    var campoNivelDifi = document.createElement("td");
    var campoMedia = document.createElement("td");
    var btn1 = document.createElement("td");
    var btn2 = document.createElement("td");
    campoNome.innerHTML = disciplina.nome;
    campoNivelDifi.innerHTML = disciplina.nivelDifi;
    campoMedia.innerHTML = disciplina.media;
    var btnEditar = document.createElement("IMG");
    btnEditar.src = "img/lapis.svg";
    btnEditar.style.width = "16px";
    btnEditar.style.height = "16px";
    btnEditar.style.color ="#222831";
    var btnExcluir = document.createElement("IMG");
    btnExcluir.src = "img/cruz.svg";
    btnExcluir.style.width = "16px";
    btnExcluir.style.height = "16px";
    btnExcluir.style.color ="#222831";
    btnEditar.addEventListener("click", alterar);
    btnExcluir.addEventListener("click", excluirLinha);
    btn1.appendChild(btnEditar);
    btn2.appendChild(btnExcluir);
    linha.appendChild(campoNome);
    linha.appendChild(campoNivelDifi);
    linha.appendChild(campoMedia);
    linha.appendChild(btn1);
    linha.appendChild(btn2);
    table.appendChild(linha);

}

function limparCampos() {
    document.getElementById("tarefas").innerHTML = "";
    document.getElementById("form").reset();
    linha = null;
    vTarefasDisc = [];
}


function criarId() {
    var id = 0;
    vetor.forEach(function (disc) {
        if (disc.id > id)
            id = disc.id
    });
    return id + 1;
}
function mostrarTodosTarefas(){
    if(localStorage.hasOwnProperty("tarefas")){
        vTodaTarefas = JSON.parse(localStorage.getItem("tarefas"))
        var caixa = document.getElementById("listTarefas");
        caixa.innerHTML =''

        vTodaTarefas.forEach(function(tarefas){
            var op = document.createElement('option');
            op.text = tarefas.nome;
            op.value = tarefas.id;
            caixa.add(op)
        })
        console.log(vTarefasDisc);
    }
}
function addTarefa(){
    var id = document.getElementById("listTarefas").value
    console.log("id " + id)
    if(verificaTarefa(id)){
        alert("Tarefa já existe na lista da disciplina")
        return
    }
    vTodaTarefas.forEach(function (tarefas){
        if (tarefas.id == id){
            vTarefasDisc.push(tarefas);
            var caixa = document.getElementById("tarefas")
            var op = document.createElement('option');
            op.value = id;
            op.text = tarefas.nome;
            caixa.add(op)
        }
    })
}
function retiraTarefa(){
    var ind = selecTarefa.selectedIndex;
    selecTarefa.options[ind].remove();
    vTarefasDisc.splice(ind,1)
}

function verificaTarefa(id){
    var log = 0 
    vTarefasDisc.forEach(function (tarefas){
        if (tarefas.id == id)
        log = 1
    })
    if (log ==1)
    return true
    else
    return false
}
addTarefa();
mostrarTabela();
mostrarTodosTarefas();
botao.addEventListener("click", SubmeterForm);
limpar.addEventListener("click", limparCampos);
botaoTarefa.addEventListener("click", addTarefa)
selecTarefa.addEventListener("dblclick", retiraTarefa)