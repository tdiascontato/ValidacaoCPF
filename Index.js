function ValidaCPF(cpf){
    Object.defineProperty(this, 'cpfRecebido', {
        enumerable: true,
        get: function() { 
            return cpf.replace(/\D+/g, '');}
    });
}
ValidaCPF.prototype.validacao = function(){
    if(typeof this.cpfRecebido === 'undefined') return false;
    if(this.cpfRecebido.length !== 11) return false;
    if(this.sequencia()) return false;
    const Digitos = this.cpfRecebido.slice(0,-2);
    const digitone = this.criacaoDEdigitos(Digitos);
    const digitotwo = this.criacaoDEdigitos(Digitos+digitone);
    //novo cpf com os digitos novos
    const novoCPF = Digitos + digitone + digitotwo;
    return novoCPF ===this.cpfRecebido;
    return true;
};
ValidaCPF.prototype.criacaoDEdigitos = function(cpfzinho){
    const cpfArray = Array.from(cpfzinho);
    //cálculo para a conta bb
    let regressao = cpfArray.length + 1;
    let contaDigito = cpfArray.reduce((acumulador, valor) => {
        acumulador += (regressao*Number(valor));
        regressao--;
        return acumulador;
    }, 0);
    //cálculo da conta final
    const contaFinal = 11 - (contaDigito % 11);
    return contaFinal > 9 ? '0' : String(contaFinal);
};
ValidaCPF.prototype.sequencia = function(){
    const seq = this.cpfRecebido[0].repeat(this.cpfRecebido.length);
    return seq === this.cpfRecebido;
};
const Buttoon = document.querySelector('.Botao');
const Input = document.querySelector('.InputCPF');
function limparInput(){
    Input.value = '';
    Input.focus();
}
Buttoon.addEventListener('click', function(e){
    const cpf = new ValidaCPF(Input.value);
    if(cpf.validacao()){
        alert('O CPF e Valido!');
        limparInput();
    }else{
        alert('O CPF nao e valido!');
        limparInput();
    }
});