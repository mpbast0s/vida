// Arquivo auziliar para o index.html
const MATERIAS_BCC = [
  ["CI068", "CI210", "CI212", "CI215", "CI162", "CI163", "CI221", "OPT 1"],
  ["CI055", "CI056", "CI057", "CI062", "CI065", "CI165", "CI211", "OPT 2"],
  ["CM046", "CI067", "CI064", "CE003", "CI059", "CI209", "OPT 3", "OPT 4"],
  ["CM045", "CM005", "CI237", "CI058", "CI061", "CI218", "OPT 5", "OPT 6"],
  ["CM201", "CM202", "CI166", "CI164", "SA214", "CI220", "TG I", "TG II"]
];
// salva o número de optativas já adicionadas
var NUM_OPTS = 0;

// com base em https://stackoverflow.com/questions/20853219/how-to-read-xml-file-using-filereader-javascript
function leArquivo(arquivo, input, alunos) {
  var reader = new FileReader();
  reader.readAsText(arquivo);

  reader.onloadend = function () {
    parser = new DOMParser();
    var xmlDoc = parser.parseFromString(reader.result, "text/xml");
    x = xmlDoc.documentElement.childNodes;
    alunos.limpa();
    // pega as entradas do xml e as transforma em objeto
    for (var item of x) {
      if (item.nodeType == 1) {
        var obj = {};
        for (var i of item.children) {
          var campo = i.tagName.toLowerCase(); // só pq não gosto dos campos em maiúsculo
          obj[campo] = i.textContent;
        }
        alunos.insere(obj);
      }
    }
    atualizaSeletor(input, alunos);
    alunos.ordena();
  };
  console.log(alunos)
}

// dado o campo da situacao da matéria, retorna a classe para deixar colorido
// retorna a classe 
function classeMateria(situacao) {
  var str = situacao.toLowerCase();

  if (str.includes("aprovado")) {
    return "aprovado";
  } else if (str.includes("repr")) {
    return "reprovado";
  } else if (str.includes("matrícula") || str.includes("matricula")) {
    return "matriculado";
  } else if (str.includes("equivale")) {
    return "equivalencia";
  } else if (str.includes("tr. total")) {
    return "trancamento";
  }
  return "";
}

// retorna código HTML de cada uma das células da tabela de matérias
// parâmetros:
// codigo: código da matéria (em MATERIAS_BCC) 
// materias: Materias do aluno
// retorna o código HTML gerado
function geraCelulaObrig(codigo, materias) {
  var l_materias = null;
  // o primeiro campo de classe determina qual "tipo" de Materia teremos
  // (definido na construção da classe Materia) 
  var classe = "";

  if (codigo.match(/^OPT/)) {
    codigo1 = 'OPT'
    
  }else {
    codigo1 = codigo 
  }
  //console.log(codigo1)

  switch (codigo1) {
    case 'OPT':
      const chaves = Object.keys(materias.optativas);
      if (NUM_OPTS < chaves.length) {
        var cod = chaves.at(NUM_OPTS)
        l_materias = materias.optativas[cod];
        NUM_OPTS += 1;
        classe = "optativas ";
      }
      break;
    case "TG I":
      l_materias = materias.tg1;
      classe = "tg1 ";
      break;
    case "TG II":
      l_materias = materias.tg2;
      classe = "tg2 ";
      break;
    default:
      l_materias = materias.obrigatorias[codigo];
      classe = "obrigatorias ";
  }
  // se a matéria é encontrada... 
  if (l_materias != null && l_materias.length > 0) {
    classe += classeMateria(l_materias.at(-1).sigla);
    let id = classe == "" ? "" : l_materias.at(-1).cod_ativ_curric;
    return `<td class="${classe} celula" id="${id}" style="z-index:2;"> ${codigo} </td>`;
  }
  return `<td> ${codigo} </td>`;
}

// Cria o código HTML de toda a tabela de "Outras matérias"
// parâmetros:
// outras_materias: Objeto de tipo "outras" de Materias
// retorna o código HTML gerado
function geraTabelaOutras(outras_materias) {
  if (outras_materias == undefined)
    return "";
  const chaves = Object.keys(outras_materias);
  var num_chaves = chaves.length;

  var codigo = "";
  var l_materias = null;

  let num_linhas = Math.ceil(num_chaves / 8);
  // matemática maluca pra fazer a tabela de outras 
  // com 8 matérias por linha
  for (let i = 0; i < num_linhas; i++) {
    codigo += "<tr>";
    var j = 0;
    for (; i * 8 + j < num_chaves && j < 8; j++) {
      let cod_mat = chaves[i * 8 + j];
      l_materias = outras_materias[cod_mat];
      let classe = classeMateria(l_materias.at(-1).sigla);
      let id = l_materias.at(-1).cod_ativ_curric;
      codigo += `<td class="outras ${classe} celula" id="${id}"> ${id} </td>`;
    }
    // colspan se sobrarem colunas e deixar minimamente mais bonito
    if (j < 8 && i > 0) {
      let spam = 8 - j;
      codigo += `<td colspan="${spam}">  </td>`;
    }
    codigo += "</tr>";
  }
  return codigo;
}

// Desenha as grades de matérias obrigatórias e outras
// parâmetros:
// obrigatorias: objeto jQuery da tabela "Obrigatórias"
// outras: objeto jQuery da tabela "Outras Disciplinas"
// materias: objeto Materias 
function desenhaGrade(obrigatorias, outras, materias = null) {
  var celulas_obg = "";
  var celulas_outras = "";
  NUM_OPTS = 0;
  // construir a grade curricular colorida só se tiver matérias
  if (materias == null || materias == undefined) {
    for (let l_materias of MATERIAS_BCC) {
      celulas_obg += "<tr>";
      for (let materia of l_materias) {
        celulas_obg += `<td style="z-index:2;"> ${materia} </td>`;
      }
      celulas_obg += "</tr>";
    }
  }
  else {
    for (let l_materias of MATERIAS_BCC) {
      celulas_obg += "<tr>";
      for (let materia of l_materias) {
        celulas_obg += geraCelulaObrig(materia, materias);
      }
      celulas_obg += "</tr>";
    }
    celulas_outras = geraTabelaOutras(materias.outras);
  }
  obrigatorias.html(celulas_obg);
  outras.html(celulas_outras);
  
}

// Atualiza as opções de seleção de GRRs com base nos alunos criados 
// parâmetros:
// seletor: objeto jQuery do dropdown de opções de GRR
function atualizaSeletor(seletor, alunos) {
  var opcoes = "";
  const listaGRR = alunos.getGRRs();
  for (let grr of listaGRR) {
    opcoes += `<option value="${grr}">${grr}</option>`;
  }
  // não foi criado o novo html...
  if (opcoes == "") {
    opcoes += '<option value="Carregue um arquivo">';
  }
  seletor.html(opcoes);
}


function geraTabelaOptativasrestantes(outras_materias, optativas) {
  console.log(outras_materias)
  if (outras_materias == undefined)
    return "";
  const chaves = Object.keys(outras_materias).slice(6);
  
  var num_chaves = chaves.length;

  var codigo = "";
  var l_materias = null;

  let num_linhas = Math.ceil(num_chaves / 4);
  // matemática maluca pra fazer a tabela de outras 
  // com 8 matérias por linha
  for (let i = 0; i < num_linhas; i++) {
    codigo += "<tr>";
    var j = 0;
    for (; i * 4 + j < num_chaves && j < 4; j++) {
      let cod_mat = chaves[i * 4 + j];
      l_materias = outras_materias[cod_mat];
      let classe = classeMateria(l_materias.at(-1).sigla);
      let id = l_materias.at(-1).cod_ativ_curric;
      codigo += `<td class="optativas ${classe} celula" id="${id}"> ${id} </td>`;
    }
    // colspan se sobrarem colunas e deixar minimamente mais bonito
    if (j < 4 && i > 0) {
      let spam = 4 - j;
      codigo += `<td colspan="${spam}">  </td>`;
    }
    codigo += "</tr>";
  }
  optativas.html(codigo);
}


