// classe para armazenar os dados de todos os aluninhs
class Alunos {
  //campos pertencentes ao aluno
  campos_aluno = [
    "cod_curso",
    "conceito",
    "id_curso_aluno",
    "id_estrutura_cur",
    "id_local_dispensa",
    "id_versao_curso",
    "matr_aluno",
    "nome_aluno",
    "nome_curso"
  ];

  // consrutor que inicializa a estrutura para armaznar os alunos
  constructor() {
    this.alunos = {};
  }

  // Método para inserir dados de um aluno
  insere(dados) {
    var matr_aluno = dados["matr_aluno"];
    var materia = {};
    var aluno = {};

    // separa os dados da matéria (campos que não pertencem ao alunso)
    for (let key of Object.keys(dados)) {
      if (!(this.campos_aluno.includes(key))) {
        materia[key] = dados[key];
      }
    }

    // noa entrada : se ele ainda não estiver cadastrado
    if (!(matr_aluno in this.alunos)) {
      for (let campo of this.campos_aluno) {
        aluno[campo] = dados[campo];
        console.log("aluno - 2")
      }
      aluno["materias"] = new Materias(); // Inicializa as matérias do aluno
      this.alunos[matr_aluno] = aluno; // Adiciona o aluno ao registro de alunos
    }

    // Adiciona a matéria ao registro de matérias do aluno
    this.alunos[matr_aluno]["materias"].insere(materia);
    console.log("aluno - 1")
  }

  // limpa limpa limpa
  limpa() {
    this.alunos = {};
  }

  // Mobter todos os GRRs salvicados
  getGRRs() {
    console.log("aluno - 3 - chamou")
    return Object.keys(this.alunos);
    
  }

  // ordenar as matérias dos alunos de acordo com semestre/ano cursado
  ordena() {
    console.log("aluno - AAAAAAAAAAAAA");
    const listaGRR = this.getGRRs();
    for (let grr of listaGRR) {
      this.alunos[grr]["materias"].ordena();
    }
  }

  // otber  dados de um aluno com GRR
  getAluno(GRR) {
    return this.alunos[GRR];
  }

  //  acessar o conceito de um aluno específico
  getConceito(GRR) {
    const aluno = this.alunos[GRR];
    if (aluno) {
      console.log("aluno - 77554", aluno.conceito);
      return aluno.conceito;
    } else {
      return null; // R null se  não for encontrado
    }
  }
}
