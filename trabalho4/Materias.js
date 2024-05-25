// Lista de códigos das matérias optativas
const MATERIAS_OPTATIVAS = ["CI069", "CI084", "CI085", "CI086", "CI087", "CI088", "CI089", "CI090", "CI091", "CI092", "CI093", "CI094", "CI095", "CI097", "CI167", "CI168", "CI169", "CI170", "CI171", "CI172", "CI173", "CI174", "CI204", "CI205", "CI214", "CI301", "CI302", "CI303", "CI304", "CI305", "CI306", "CI309", "CI310", "CI311", "CI312", "CI313", "CI314", "CI315", "CI316", "CI317", "CI318", "CI320", "CI321", "CI337", "CI338", "CI339", "CI340", "CI350", "CI351", "CI355", "CI358", "CI359", "CI360", "CI361", "CI362", "CI363", "CI364", "CI365", "CI366", "CI367", "CI394", "CI395", "CI396", "ET082", "CE211", "CM043", "HL077", "SA017", "SC003", "SC202", "SC203"];

// Lista de códigos das matérias obrigatórias
const MATERIAS_OBRIGATORIAS = ["CE003", "CI055", "CI056", "CI057", "CI058", "CI059", "CI061", "CI062", "CI064", "CI065", "CI067", "CI068", "CI162", "CI163", "CI164", "CI165", "CI166", "CI209", "CI210", "CI211", "CI212", "CI215", "CI218", "CI220", "CI221", "CI237", "CM005", "CM045", "CM046", "CM201", "CM202", "SA214"];

// Lista de códigos das matérias de TG1
const MATERIAS_TG1 = ["CI070", "CI072", "CI074", "CI076", "CI078", "CI080", "CI082", "CI098", "CI250", "CI252", "CI254", "CI256", "CI258", "CI260"]

// Lista de códigos das matérias de TG2
const MATERIAS_TG2 = ["CI071", "CI073", "CI075", "CI077", "CI079", "CI081", "CI083", "CI099", "CI251", "CI253", "CI255", "CI257", "CI259", "CI261"];

// Classe para armazenar as matérias de cada aluno
class Materias {
  // Cada aluno terá matérias obrigatórias, optativas, TGs e "outras"
  constructor() {
    this.obrigatorias = {}; // Matérias obrigatórias
    this.optativas = {}; // Matérias optativas
    this.outras = {}; // Outras matérias que não se encaixam em obrigatórias nem optativas
    this.tg1 = []; // Matérias de TG1
    this.tg2 = []; // Matérias de TG2
  }
  
  // Método para inserir dados de uma matéria
  insere(dados) {
    var materias = {};

    const atividade = dados["cod_ativ_curric"];
    // Verifica o tipo de matéria
    if (MATERIAS_OBRIGATORIAS.includes(atividade)) {
      materias = this.obrigatorias;
    } else if (MATERIAS_OPTATIVAS.includes(atividade)) {
      materias = this.optativas;
    } else if (MATERIAS_TG1.includes(atividade)) {
      this.tg1.push(dados); // Adiciona à lista de TG1
      return;
    } else if (MATERIAS_TG2.includes(atividade)) {
      this.tg2.push(dados); // Adiciona à lista de TG2
      return;
    } else {
      materias = this.outras; // Se não se encaixar em nenhum dos tipos acima, considera como "outras"
    }
    // Cada matéria terá um vetor para cada vez que é feita
    if (!(atividade in materias)) {
      materias[atividade] = []; 
    }
    materias[atividade].push(dados);
  }

  // Função para arrumar cada matéria de uma categoria
  arrumaCategoria(categoria) {
    categoria.sort(function (a, b) {
      var diff = parseInt(a.ano) - parseInt(b.ano); // arruma pelo ano
      if (diff == 0) {
        diff = parseInt(a.periodo[0]) - parseInt(b.periodo[0]); // Se o ano for o mesmo, arruma pelo período
      }
      return diff;
    })

  }

  // arruma todas as matérias armazenadas
  arruma() {
    let lista_arruma = [this.obrigatorias, this.optativas, this.outras];
    for (let item of lista_arruma) {
      const cod_materias = Object.keys(item);
      for (let materia of cod_materias) {
        this.arrumaCategoria(item[materia]);
      }
    }
  }

  arredondaNumero(numeroTexto, casasDecimais) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
    var numero = parseFloat(numeroTexto.replace(',', '.'));
    
    // Arredonda o número para a quantidade especificada de casas decimais
    var numeroArredondado = numero.toFixed(casasDecimais);
    
    // Converte o número arredondado de volta para string e substitui o ponto por vírgula
    var numeroComVirgula = numeroArredondado.replace('.', ',');
    
    return numeroComVirgula;
  }

}
