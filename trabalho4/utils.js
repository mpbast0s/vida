// Arquivo auxiliar para o index.html

// Lista de matérias do curso de BCC
const MATERIAS_BCC = [
  ["CI068", "CI210", "CI212", "CI215", "CI162", "CI163", "CI221", "OPT 1"],
  ["CI055", "CI056", "CI057", "CI062", "CI065", "CI165", "CI211", "OPT 2"],
  ["CM046", "CI067", "CI064", "CE003", "CI059", "CI209", "OPT 3", "OPT 4"],
  ["CM045", "CM005", "CI237", "CI058", "CI061", "CI218", "OPT 5", "OPT 6"],
  ["CM201", "CM202", "CI166", "CI164", "SA214", "CI220", "TG I", "TG II"]
];
// Variável para armazenar o número de optativas já adicionadas
var NUM_OPTS = 0;

// Função para gerar a tabela de optativas restantes com base nas matérias do aluno
function geraTabelaOptativasrestantes(outras_materias, optativas) {
  if (outras_materias == undefined)
    return "";
  const chaves = Object.keys(outras_materias).slice(6);
  
  var num_chaves = chaves.length;

  var codigo = "";
  var l_materias = null;

  let num_linhas = Math.ceil(num_chaves / 4);
  // Criação da tabela de outras matérias com 8 matérias por linha
  for (let i = 0; i < num_linhas; i++) {
    codigo += "<tr>";
    var j = 0;
    for (; i * 4 + j < num_chaves && j < 4; j++) {
      let cod_mat = chaves[i * 4 + j];
      l_materias = outras_materias[cod_mat];
      let classe;
      if(l_materias.at(-1).sigla == "Disp. c/nt"){
        classe = "dispensa";
      } else if(l_materias.at(-1).sigla == "Cancelado"){
        classe = "cancelado"
      } else {
        classe = classeMateria(l_materias.at(-1).sigla);
      }
      let id = l_materias.at(-1).cod_ativ_curric;
      codigo += `<td class="optativas ${classe} celula" id="${id}"> ${id} </td>`;
    }
    // Colspan se sobrarem colunas para manter o formato da tabela
    if (j < 4 && i > 0) {
      let spam = 4 - j;
      codigo += `<td colspan="${spam}">  </td>`;
    }
    codigo += "</tr>";
  }
  optativas.html(codigo);
}

// Função para ler um arquivo XML
function leArquivo(arquivo, input, alunos) {
  var reader = new FileReader();
  reader.readAsText(arquivo);

  reader.onloadend = function () {
    parser = new DOMParser();
    var xmlDoc = parser.parseFromString(reader.result, "text/xml");
    x = xmlDoc.documentElement.childNodes;
    alunos.limpa();
    // Converte as entradas XML em objetos
    for (var item of x) {
      if (item.nodeType == 1) {
        var obj = {};
        for (var i of item.children) {
          var campo = i.tagName.toLowerCase();
          obj[campo] = i.textContent;
        }
        alunos.insere(obj);
      }
    }
    atualizaSeletor(input, alunos);
    alunos.ordena();
  };
}

// Função para determinar a classe CSS de uma matéria com base na sua situação
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

// Função para gerar o código HTML de uma célula da tabela de matérias obrigatórias
function geraCelulaObrig(codigo, materias) {
  var l_materias = null;
  var classe = "";

  if (codigo.match(/^OPT/)) {
    codigo1 = 'OPT'
    
  }else {
    codigo1 = codigo 
  }

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
  if (l_materias != null && l_materias.length > 0) {
    //classe += classeMateria(l_materias.at(-1).sigla);
    if(l_materias.at(-1).sigla == "Disp. c/nt"){
      classe += "dispensa";
    } else if(l_materias.at(-1).sigla == "Cancelado"){
      classe += "cancelado"
    } else if(l_materias.at(-1).sigla == "TrancAdm"){
      classe += "trancadm"
    } else {
      classe += classeMateria(l_materias.at(-1).sigla);
    }
    let id = classe == "" ? "" : l_materias.at(-1).cod_ativ_curric;

    return `<td class="${classe} celula" id="${id}" style="z-index:2;"> ${codigo} </td>`;
  }
  return `<td> ${codigo} </td>`;
}

// Função para gerar o código HTML da tabela de outras matérias
function geraTabelaOutras(outras_materias) {
  if (outras_materias == undefined)
    return "";
  const chaves = Object.keys(outras_materias);
  var num_chaves = chaves.length;

  var codigo = "";
  var l_materias = null;

  let num_linhas = Math.ceil(num_chaves / 8);
  // Criação da tabela de outras matérias com 8 matérias por linha
  for (let i = 0; i < num_linhas; i++) {
    codigo += "<tr>";
    var j = 0;
    for (; i * 8 + j < num_chaves && j < 8; j++) {
      let cod_mat = chaves[i * 8 + j];
      l_materias = outras_materias[cod_mat];
      let classe;
      if(l_materias.at(-1).sigla == "Disp. c/nt"){
        classe = "dispensa";
      } else if(l_materias.at(-1).sigla == "Cancelado"){
        classe = "cancelado"
      } else if(l_materias.at(-1).sigla == "TrancAdm"){
        classe = "trancadm"
      } else {
        classe = classeMateria(l_materias.at(-1).sigla);
      }
      
      let id = l_materias.at(-1).cod_ativ_curric;

      codigo += `<td class="outras ${classe} celula" id="${id}"> ${id} </td>`;
    }
    // Colspan se sobrarem colunas para manter o formato da tabela
    if (j < 8 && i > 0) {
      let spam = 8 - j;
      codigo += `<td colspan="${spam}">  </td>`;
    }
    codigo += "</tr>";
  }
  return codigo;
}

// Função para desenhar as grades de matérias obrigatórias e outras
function desenhaGrade(obrigatorias, outras, materias = null) {
  var celulas_obg = "";
  var celulas_outras = "";
  NUM_OPTS = 0;
  // Constrói a grade curricular colorida apenas se houver matérias
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

// Função para atualizar as opções de seleção de GRRs com base nos alunos criados
function atualizaSeletor(seletor, alunos) {
  var opcoes = "";
  const listaGRR = alunos.getGRRs();
  for (let grr of listaGRR) {
    opcoes += `<option value="${grr}">${grr}</option>`;
  }
  if (opcoes == "") {
    opcoes += '<option value="Carregue um arquivo">';
  }
  seletor.html(opcoes);
}
