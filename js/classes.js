console.log("Trabalho")
console.log("")

class Pessoa{
    constructor(nome, cpf, idade, nomeSocial, email, discord){
        this.nome = nome;
        this.cpf = cpf;
        this.idade = idade;
        this.nomeSocial = nomeSocial;
        this.email = email
        this.discord = discord
        this.alunos = []
        this.professsores=[]
        }
        mostrarNome(){
            return this.nome + this.nomeSocial
        }
        mostrarIdade(){
            return ' Idade: ' + this.idade 
        }
        mostrarCPF(){
            return 'CPF: ' + this.cpf; 
        }
        mostrarDiscord(){
            return 'Discord: ' + this.discord; 
        }
        mostrarEmail(){
            return 'Email: ' + this.email; 
        }
        addAluno(alu){
            this.alunos.push(alu);
            console.log(this.alunos)
        }
        addProf(prof){
            this.professsores.push(prof);
        }
        excluirAluno(alu){
            var item = this.alunos.indexOf(alu)
            console.log(alu.nome + " excluído!")
            this.alunos.splice(item,1)
        }
        excluirProf(prof){
            var item = this.professsores.indexOf(prof)
            console.log(prof.nome + " excluído!")
            this.prof.splice(item,1)
        }
       
    }

    class Aluno extends Pessoa{
        constructor( nome, idade,cpf,nomeSocial,email,discord, curso, matricula, ano){
            super(nome,idade,cpf,nomeSocial,email,discord);
            this.curso = curso;
            this.matricula = matricula;
            this.ano = ano;
        }
        mostrarNome(){
            super.mostrarNome()
            if(this.nomeSocial==' ' || this.nomeSocial==false){
                return ' Olá, Aluno(a) ' + this.nome + ' seja bem vindo(a)!'
                }
                else{
                    return ' Olá, Aluno(a) ' + this.nomeSocial + ' seja bem vindo(a)!'
                }
            
        }
        mostrarCurso(){
            return 'Curso: ' + this.curso; 
        }
        mostrarMatricula(){
            return 'Matrícula: ' + this.matricula; 
        }
        mostrarAno(){
            return 'Ano: ' + this.ano; 
        }
    }

    class Professsor extends Pessoa{
        constructor(nome, cpf, idade, nomeSocial, email, discord){
            super(nome, cpf, idade, nomeSocial, email, discord)
            this.disciplina = []
    }
     mostrarNome(){
            super.mostrarNome()
            if(this.nomeSocial==' ' || this.nomeSocial==false){
            return ' Olá, Aluno(a) ' + this.nome + ' seja bem vindo(a)!'
            }
            else{
                return ' Olá, Aluno(a) ' + this.nomeSocial + ' seja bem vindo(a)!'
            }
        
    }
        addDisciplina(dis){
                this.disciplina.push(dis);
        }
        mostrarDisciplina(){
            var mostra = '';
            this.disciplina.forEach(item=>{
                mostra += item.nome + " , ";
            });
            return"Disciplinas de "+  this.nome + " : " +mostra
        }
        
    }

    class Matricula{
    constructor(id){
        this.id = id
        this.alunos=[]
    }
    addAluno(alu){
        this.alunos.push(alu);
    }
    mostrarCodAluno(alu){
        var item = this.alunos.indexOf(alu)
        console.log(alu.nome + " codigo: " + item)

    }

    }

    class NotaAluno{
        constructor(){
            this.provas = []
        }
        aprovado(){
            var media = 0;
            var soma = 0;
            this.provas.forEach(function(item){
                soma += parseInt(item.nota);
            });
            media = soma/this.provas.length
            if(media >= 6){
                return 'aprovado ' + media.toFixed(2) 
                
            }
            else{
                return "reprovado: "+ media 
            }
        }
        addProva(prov){
            this.provas.push(prov);
        }
    }

    class Plataforma{
        constructor(nome, link){
            this.nome = nome
            this.link = link
            this.disciplina = []
        }
        mostraNome(){
            return 'Plataforma ' + this.nome
        }
        mostraLink(){
            return 'Link' + this.link
        }
        mostrarDisciplinas(dis){
            this.disciplina.push(dis);
                return this.disciplina
        }
    }

    class Concluido{
        constructor(localEntrega, feito){
            this.entrega = localEntrega
            this.feito = feito
            this.tarefas = []
        }
        entrega(){
            return 'Entregue na plataforma' + localEntrega
        }
        isFeito(){
            var qtd = 0
            if(this.feito == false){
                qtd++
                return 'Tarefa atrasada, você tem ' + qtd + 'tarefas atrasadas'
            }
            if(this.feito == true){
                return 'tarefa feita, parabéns :)'
            }
        }
    }

    class Disciplina{
        constructor(id,nome, nivelDifi, media){
            this.id = id
            this.nome = nome
            this.nivelDifi = nivelDifi
            this.media = media
            this.professsores = []
            this.tarefas=[]
        }
       mostraNome(){
           return this.nome
       }
       mostraDifi(){
           return this.nivelDifi
       }
       mostraMedia(){
           return this.media
       }
       mostraProfessores(prof){
        this.professsores.push(prof);
        var mostra = '';
        this.professsores.forEach(item=>{
            mostra += item.nome + " , ";
        });
        return("Professores da disciplina "+  this.nome + " : " +mostra)
    }
    listarTarefas(tar){
        this.tarefas.push(tar);
        var mostra = '';
        this.tarefas.forEach(item=>{
            mostra += item.nome + " , ";
        });
        return("Tarefas de "+  this.nome + " : " +mostra)
    }
    }

    class Tarefas{
        constructor(id,nome, prazo, localEntrega){
            this.id = id
            this.nome = nome
            this.prazo = prazo
            this.localEntrega = localEntrega
        }
        mostraTitulo(){
            return this.nome
        }
        mostraPrazo(){
            return this.prazo
        }
        prioridade(atual){
            var tempo = this.prazo - atual;
            if(tempo==0){
                return 'Hoje é dia de entrega'
            }
            if(tempo<=3){
                return 'Priorize está tarefa, você tem apenas ' +tempo + ' dias para fazer'
            }
            else{
                return ' Você ainda tem ' + tempo + ' dias para você fazer a tarefa)'
            }
        
        }
        editar(){
            var nNome = prompt('Insira aqui o titulo da tarefa')
            var nPrazo = prompt('Insira aqui o prazo da tarefa')
            var nEntrega = prompt('Insira aqui o local de entrega da tarefa')
            this.nome = nNome
            this.prazo = nPrazo
            this.localEntrega = nEntrega
            return this.nome + this.prazo + this.localEntrega;
        }
    }

    class Aulas{
        constructor(link, hora, dia){
            this.link = link
            this.hora = hora
            this.dia = dia
            this.disciplina = []
        }
        mostraLink(){
            return this.link
        }
        mostraHoraDia(x){
            this.disciplina.push(x)
            return ' Aula dia '+this.dia+" as " + this.hora 
        }
    }

    class AulaAssistida extends Aulas{
        constructor(assisti, data){
            this.assisti = assisti
            this.data = data
        }
        isAssistido(atual){
            var qtd = 0
            var tempo = data - atual
            if(tempo == 0){
                return 'Aula Hoje'
            }
            if( tempo < 0 && this.assisti == false){
                qtd ++
                return ' Aula atrasada, você tem ' + qtd + ' aulas atrasadas'

            }
            if(tempo< 0 && this.assisti == true){
                return "Aula assistida"
            }
        }
    }
    
    class Meteriais{
        constructor(tipo, titulo,localArmazena){
        this.tipo = tipo
        this.titulo = titulo
        this.localArmazena = localArmazena
    }
        mostraTipo(){
            return this.tipo
        }
        mostraTitulo(){
            return this.titulo
        }
    }

    class Provas{
        constructor(data,peso, hora,minuto, nota){
            this.data=data
            this.peso=peso
            this.hora=hora
            this.minuto=minuto
            this.nota=nota
        }
        mostraDataeHora(atual){
            var tempo = this.data - atual;
            if(tempo==0){
                return ' O dia da sua prova chegou e será as ' + this.horas + ':' + this.minutos + 'horas'
            }
            else{
                return ' Você ainda tem ' + tempo + ' dias para você estudar, aproveite :)'
            }
        }
    }
    