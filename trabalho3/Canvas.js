class Canvas {
    linhas = []; // Array para armazenar as linhas desenhadas no canvas

    constructor(canvas, ctx) {
        // Armazena o elemento canvas e o contexto 2D
        this.canvas = canvas;
        this.ctx = ctx;
    }

    // Desenha todas as linhas armazenadas na classe
    desenha() {
        // Limpa o canvas antes de desenhar as linhas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Itera sobre todas as linhas e as desenha no canvas
        for (const linha of this.linhas) {
            // Define a cor da linha
            this.ctx.strokeStyle = linha.cor;
            // Desenha a linha
            this.ctx.stroke(linha.path);
            
            // Exibe uma mensagem de log indicando que a linha foi desenhada
            console.log("Linha desenhada:", linha);
        }
    }
}
