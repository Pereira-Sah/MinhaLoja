class Produto{

    constructor(){
        this.id = 1;
        this.arrayProduto = [];
    }

    salvar(){
        let produto = this.lerDados();
        if(this.validarCampo(produto)){
            if (this.idEditando != null) {
                this.atualizar(this.idEditando, produto);
            } else {
                this.adicionar(produto);
            }
        }
        this.listaTabela();
        this.limparCampos();
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';
        for(let i = 0; i < this.arrayProduto.length; i++){
            let tr = tbody.insertRow();
            
            let td_id = tr.insertCell();
            let td_img = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProduto[i].idProduto;
            let img = document.createElement('img');
            img.src = this.arrayProduto[i].imgProduto;
            td_img.appendChild(img);
            td_produto.innerText = this.arrayProduto[i].nomeProduto;
            td_preco.innerText = this.arrayProduto[i].precoProduto;


            let imgDelet = document.createElement('img');
            imgDelet.src = 'img/excluir.png';

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';

            td_acoes.appendChild(imgDelet);
            td_acoes.appendChild(imgEdit);

            imgDelet.setAttribute("onclick", "produto.deletar("+ this.arrayProduto[i].idProduto+")");
            imgEdit.setAttribute("onclick", "produto.editar("+ this.arrayProduto[i].idProduto+")");
        }
    }

    adicionar(produto){
        this.arrayProduto.push(produto);
        this.id++;
    }
    lerDados(){
        let produto = {}

      produto.idProduto = this.id;
      produto.imgProduto = document.getElementById('imagem').value;
      produto.nomeProduto = document.getElementById('produto').value;
      produto.precoProduto = document.getElementById('preco').value;


      return produto;
    }

    validarCampo(produto){
        let msg = '';
        if(produto.nomeProduto == ''){
            msg += 'Informe o nome do prpoduto \n';
        }
        if(produto.precoProduto == ''){
            msg += 'Informe o preço do prpoduto \n';
        }
        if(produto.imgProduto == ''){
            msg += 'Informe a url da imagem do prpoduto \n';
        }
        if(msg != ''){
            alert(msg);
            return false
        }
        return true;
    }
    cancelar(){
        alert('item cancelado');
    }

    editar(id) {
        if (confirm('Deseja realmente editar o produto ID: ' + id + '?')) {
            for (let i = 0; i < this.arrayProduto.length; i++) {
                if (this.arrayProduto[i].idProduto == id) {
                    let produto = this.arrayProduto[i];
                    document.getElementById('imagem').value = produto.imgProduto;
                    document.getElementById('produto').value = produto.nomeProduto;
                    document.getElementById('preco').value = produto.precoProduto;
                    
                    this.idEditando = id;
    
                    break;
                }
            }
        }
    }
    deletar(id){
        if(confirm('Deseja realmente deletar o produto ID: ' + id   )){
        let tbody = document.getElementById('tbody');

        for(let i = 0; i < this.arrayProduto.length; i++){
            if(this.arrayProduto[i].idProduto == id){
                this.arrayProduto.splice(i, 1);
                tbody.deleteRow(i);
                }
            }
        }
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProduto.length; i++) {
            if (this.arrayProduto[i].idProduto == id) {
                this.arrayProduto[i].nomeProduto = produto.nomeProduto;
                this.arrayProduto[i].precoProduto = produto.precoProduto;
                this.arrayProduto[i].imgProduto = produto.imgProduto;
            }
        }
        this.idEditando = null;
    }
}

var produto = new Produto();