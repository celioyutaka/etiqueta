/* URL DA REQUISIÇÃO */
var url = 'pimaco.json';
/* JSON - CONTEUDO DA ETIQUETA - PODE COLOCAR HTML, POREM PRECISAR DE SCAPES*/
var jsonString = '{"0":"PASTEL","1":"CHURROS","2":"SONHO","3":"<div style=\'color: red;\'>PIMENTA</div>"}';
			
var Etiqueta = function () {
	var thisItens = {
		'w_folha':'22cm',
		'h_folha':'27.9cm',
		'pLeft_folha':'0.4cm',
		'pRight_folha':'0cm',
		'pTop_folha':'1.3cm',
		'pBottom_folha':'0cm',
		'w_etiqueta':'6.67cm',
		'h_etiqueta':'2.54cm',
		'mTop_etiqueta':'0cm',
		'mBottom_etiqueta':'0cm',
		'mLeft_etiqueta':'0.35cm',
		'mRight_etiqueta':'0cm',
		'qtd_coluna':'3',
		'qtd_linha':'10',
	};
	for (var v in thisItens){
		this[v] = thisItens[v];
		document.getElementById(v).value = thisItens[v];
	}
	
	this.qtd_etiqueta = this.qtd_coluna * this.qtd_linha;
};

Etiqueta.prototype.imprimir = function()
{
	var qtd_linha = this.qtd_linha;
	var qtd_etiqueta = this.qtd_etiqueta;
	var qtd_coluna = this.qtd_coluna;

	document.getElementById('folha').innerHTML = '';
	var lista_etiquetas = JSON.parse(jsonString);

	var coluna = 1;
	var linha = 0;
	var qtdTotal = Object.keys(lista_etiquetas).length;

	var strHtml = '';

	var i = 0;
	var qtdPorFolha = 0;

	var qtdBranca = qtd_etiqueta-qtdTotal%qtd_etiqueta;
	if (qtdBranca == qtd_etiqueta){
		qtdBranca = 0;
	}

	for (var x=0; x < qtdBranca; x++){
		var addIndex = qtdTotal+x+1;
		lista_etiquetas[addIndex] = 'BRANCO';
	}

	for (var conteudo in lista_etiquetas){
		var strEtiqueta = lista_etiquetas[conteudo];
		i++;
		qtdPorFolha++;
		if (qtdPorFolha == 1){
			strHtml += '<div class="linha canto-top canto-left canto-right" style="page-break-inside: avoid">';
		}
		else if (qtdPorFolha == (qtd_etiqueta - qtd_coluna + 1)){
			strHtml += '<div class="linha canto-left canto-right canto-bottom">';
		}
		else if (coluna == 1){
			strHtml += '<div class="linha canto-left canto-right">';
		}


		if (coluna == 1){//primeiro
			strHtml += 
			'<div class="etiqueta  e-top " id="etiqueta_'+i+'" ondragover="allowDrop(event)" ondrop="drop(event)">';

			linha ++;
		}
		else if (coluna == qtd_coluna){//ultimo
			strHtml +=
			'<div class="etiqueta  e-top e-left" id="etiqueta_'+i+'" ondragover="allowDrop(event)" ondrop="drop(event)" >';
		}
		else{//meio
			strHtml += 
			'<div class="etiqueta e-left e-top " id="etiqueta_'+i+'" ondragover="allowDrop(event)" ondrop="drop(event)" >';
		}
		strHtml += '<span class="no-print">('+linha+','+coluna+') Nº: '+i+' (Arraste uma etiqueta)</span>';
		
		if (strEtiqueta != 'BRANCO'){
			strHtml += '<div class="conteudo-etiqueta" id="cetiqueta_'+i+'" onddraggable="true" ondragstart="drag(event)" draggable="true" >'+strEtiqueta+'</div>';
		}

		strHtml += '</div>';

		if (coluna == qtd_coluna){
			strHtml += '</div>';
		}


		coluna ++;

		if (coluna > qtd_coluna){
			coluna = 1;
		}

		if (qtdPorFolha >= qtd_etiqueta){
			qtdPorFolha = 0;
		}
	}


	document.getElementById('folha').innerHTML = strHtml;
};

/*atualizarValores - ATUALIZA O VALOR DO OBJ COM OS DO INPUT*/
Etiqueta.prototype.atualizarValores = function(){

	this.w_folha = document.getElementById('w_folha').value;
	this.h_folha = document.getElementById('h_folha').value;
	this.pLeft_folha = document.getElementById('pLeft_folha').value;
	this.pRight_folha = document.getElementById('pRight_folha').value;
	this.pTop_folha = document.getElementById('pTop_folha').value;
	this.pBottom_folha = document.getElementById('pBottom_folha').value;
	this.w_etiqueta = document.getElementById('w_etiqueta').value;
	this.h_etiqueta = document.getElementById('h_etiqueta').value;
	this.mTop_etiqueta = document.getElementById('mTop_etiqueta').value;
	this.mBottom_etiqueta = document.getElementById('mBottom_etiqueta').value;
	this.mLeft_etiqueta = document.getElementById('mLeft_etiqueta').value;
	this.mRight_etiqueta = document.getElementById('mRight_etiqueta').value;
	this.qtd_coluna = document.getElementById('qtd_coluna').value;
	this.qtd_linha = document.getElementById('qtd_linha').value;
	
	this.qtd_coluna = document.getElementById('qtd_coluna').value;
	this.qtd_linha = document.getElementById('qtd_linha').value;
	this.qtd_etiqueta = this.qtd_coluna * this.qtd_linha;

	etiqueta.imprimir();
	atualizarValoresEtiqueta();
}

/*INICIALIZAR*/
var lista_perfil = {"6089":{"pTop_folha":"1.27cm","pLeft_folha":"1.45cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.31cm","mRight_etiqueta":"0.31cm","h_etiqueta":"1.69cm","w_etiqueta":"4.44cm","qtd_coluna":"4","qtd_linha":"15","h_folha":"27.9cm","w_folha":"21.59cm"},"6092":{"pTop_folha":"1.69cm","pLeft_folha":"1.30cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"1.19cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"1.21cm","mRight_etiqueta":"1.21cm","h_etiqueta":"1.70cm","w_etiqueta":"1.70cm","qtd_coluna":"7","qtd_linha":"9","h_folha":"27.9cm","w_folha":"21.59cm"},"6094":{"pTop_folha":"1.67cm","pLeft_folha":"1.90cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"1.75cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"2.40cm","mRight_etiqueta":"2.40cm","h_etiqueta":"4.85cm","w_etiqueta":"4.35cm","qtd_coluna":"3","qtd_linha":"4","h_folha":"27.9cm","w_folha":"21.59cm"},"6095":{"pTop_folha":"2.12cm","pLeft_folha":"1.70cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"1.06cm","mRight_etiqueta":"1.06cm","h_etiqueta":"5.93cm","w_etiqueta":"8.57cm","qtd_coluna":"2","qtd_linha":"4","h_folha":"27.9cm","w_folha":"21.59cm"},"8098":{"pTop_folha":"1.27cm","pLeft_folha":"1.27cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"1.27cm","mRight_etiqueta":"1.27cm","h_etiqueta":"4.23cm","w_etiqueta":"8.89cm","qtd_coluna":"2","qtd_linha":"6","h_folha":"27.9cm","w_folha":"21.59cm"},"3080/3180":{"pTop_folha":"1.27cm","pLeft_folha":"0.48cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.31cm","mRight_etiqueta":"0.31cm","h_etiqueta":"2.54cm","w_etiqueta":"6.67cm","qtd_coluna":"3","qtd_linha":"10","h_folha":"27.9cm","w_folha":"21.59cm"},"3081/3181":{"pTop_folha":"1.27cm","pLeft_folha":"0.40cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.52cm","mRight_etiqueta":"0.52cm","h_etiqueta":"2.54cm","w_etiqueta":"10.16cm","qtd_coluna":"2","qtd_linha":"10","h_folha":"27.9cm","w_folha":"21.59cm"},"3082/3182":{"pTop_folha":"2.12cm","pLeft_folha":"0.40cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.52cm","mRight_etiqueta":"0.52cm","h_etiqueta":"3.39cm","w_etiqueta":"10.16cm","qtd_coluna":"2","qtd_linha":"7","h_folha":"27.9cm","w_folha":"21.59cm"},"5580A/5580M/5580V":{"pTop_folha":"1.27cm","pLeft_folha":"0.48cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.31cm","mRight_etiqueta":"0.31cm","h_etiqueta":"2.54cm","w_etiqueta":"6.67cm","qtd_coluna":"3","qtd_linha":"10","h_folha":"27.9cm","w_folha":"21.59cm"},"6080/6180/ 6280/62580":{"pTop_folha":"1.27cm","pLeft_folha":"0.48cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.31cm","mRight_etiqueta":"0.31cm","h_etiqueta":"2.54cm","w_etiqueta":"6.67cm","qtd_coluna":"3","qtd_linha":"10","h_folha":"27.9cm","w_folha":"21.59cm"},"6081/6181/6281/62581":{"pTop_folha":"1.27cm","pLeft_folha":"0.40cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.52cm","mRight_etiqueta":"0.52cm","h_etiqueta":"2.54cm","w_etiqueta":"10.16cm","qtd_coluna":"2","qtd_linha":"10","h_folha":"27.9cm","w_folha":"21.59cm"},"6082/6182/6282/62582":{"pTop_folha":"2.12cm","pLeft_folha":"0.40cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.52cm","mRight_etiqueta":"0.52cm","h_etiqueta":"3.39cm","w_etiqueta":"10.16cm","qtd_coluna":"2","qtd_linha":"7","h_folha":"27.9cm","w_folha":"21.59cm"},"6083/6183/6283":{"pTop_folha":"1.27cm","pLeft_folha":"0.40cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.52cm","mRight_etiqueta":"0.52cm","h_etiqueta":"5.08cm","w_etiqueta":"10.16cm","qtd_coluna":"2","qtd_linha":"5","h_folha":"27.9cm","w_folha":"21.59cm"},"6084/6184/6284":{"pTop_folha":"1.27cm","pLeft_folha":"0.40cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.52cm","mRight_etiqueta":"0.52cm","h_etiqueta":"8.47cm","w_etiqueta":"10.16cm","qtd_coluna":"2","qtd_linha":"3","h_folha":"27.9cm","w_folha":"21.59cm"},"6085/6185/6285":{"pTop_folha":"0.00cm","pLeft_folha":"0.00cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"1.59cm","mRight_etiqueta":"21.59cm","h_etiqueta":"27.94cm","w_etiqueta":"21.59cm","qtd_coluna":"1","qtd_linha":"1","h_folha":"27.9cm","w_folha":"21.59cm"},"6086/6286":{"pTop_folha":"0.16cm","pLeft_folha":"0.16cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"1.27cm","mRight_etiqueta":"21.27cm","h_etiqueta":"13.81cm","w_etiqueta":"21.27cm","qtd_coluna":"1","qtd_linha":"2","h_folha":"27.9cm","w_folha":"21.59cm"},"6087/6187/6287":{"pTop_folha":"1.27cm","pLeft_folha":"1.45cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.31cm","mRight_etiqueta":"0.31cm","h_etiqueta":"1.27cm","w_etiqueta":"4.44cm","qtd_coluna":"4","qtd_linha":"20","h_folha":"27.9cm","w_folha":"21.59cm"},"6088/6288":{"pTop_folha":"0.16cm","pLeft_folha":"0.16cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.00cm","mRight_etiqueta":"0.00cm","h_etiqueta":"13.81cm","w_etiqueta":"10.64cm","qtd_coluna":"2","qtd_linha":"2","h_folha":"27.9cm","w_folha":"21.59cm"},"6093/6293":{"pTop_folha":"1.51cm","pLeft_folha":"1.45cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"1.67cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"2.10cm","mRight_etiqueta":"2.10cm","h_etiqueta":"2.74cm","w_etiqueta":"3.10cm","qtd_coluna":"4","qtd_linha":"6","h_folha":"27.9cm","w_folha":"21.59cm"},"8096/8196/8296":{"pTop_folha":"1.27cm","pLeft_folha":"0.32cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.64cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.00cm","mRight_etiqueta":"0.00cm","h_etiqueta":"6.98cm","w_etiqueta":"6.98cm","qtd_coluna":"3","qtd_linha":"3","h_folha":"27.9cm","w_folha":"21.59cm"},"8099F":{"pTop_folha":"2.33cm","pLeft_folha":"2.72cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.60cm","mRight_etiqueta":"0.60cm","h_etiqueta":"4.66cm","w_etiqueta":"7.78cm","qtd_coluna":"2","qtd_linha":"5","h_folha":"27.9cm","w_folha":"21.59cm"},"8099L":{"pTop_folha":"1.27cm","pLeft_folha":"3.41cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.00cm","mRight_etiqueta":"0.00cm","h_etiqueta":"1.69cm","w_etiqueta":"14.76cm","qtd_coluna":"1","qtd_linha":"15","h_folha":"27.9cm","w_folha":"21.59cm"},"A4048/A4248/A4348":{"pTop_folha":"1.25cm","pLeft_folha":"0.70cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.20cm","mRight_etiqueta":"0.20cm","h_etiqueta":"1.70cm","w_etiqueta":"3.10cm","qtd_coluna":"6","qtd_linha":"16","h_folha":"29.7cm","w_folha":"21.0cm"},"A4049/A4249/A4349":{"pTop_folha":"1.35cm","pLeft_folha":"0.80cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.20cm","mRight_etiqueta":"0.20cm","h_etiqueta":"1.50cm","w_etiqueta":"2.60cm","qtd_coluna":"7","qtd_linha":"18","h_folha":"29.7cm","w_folha":"21.0cm"},"A4050/A4250/A4350":{"pTop_folha":"0.90cm","pLeft_folha":"0.47cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.26cm","mRight_etiqueta":"0.26cm","h_etiqueta":"5.58cm","w_etiqueta":"9.90cm","qtd_coluna":"2","qtd_linha":"5","h_folha":"29.7cm","w_folha":"21.0cm"},"A4051/A4251/A4351":{"pTop_folha":"1.07cm","pLeft_folha":"0.45cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.25cm","mRight_etiqueta":"0.25cm","h_etiqueta":"2.12cm","w_etiqueta":"3.82cm","qtd_coluna":"5","qtd_linha":"13","h_folha":"29.7cm","w_folha":"21.0cm"},"A4054/A4254/A4354/A4054R":{"pTop_folha":"0.88cm","pLeft_folha":"0.47cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.26cm","mRight_etiqueta":"0.26cm","h_etiqueta":"2.54cm","w_etiqueta":"9.90cm","qtd_coluna":"2","qtd_linha":"11","h_folha":"29.7cm","w_folha":"21.0cm"},"A4055/A4255/A4355":{"pTop_folha":"0.90cm","pLeft_folha":"0.72cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.26cm","mRight_etiqueta":"0.26cm","h_etiqueta":"3.10cm","w_etiqueta":"6.35cm","qtd_coluna":"3","qtd_linha":"9","h_folha":"29.7cm","w_folha":"21.0cm"},"A4056/A4256/A4356/A4056R":{"pTop_folha":"0.88cm","pLeft_folha":"0.72cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.26cm","mRight_etiqueta":"0.26cm","h_etiqueta":"2.54cm","w_etiqueta":"6.35cm","qtd_coluna":"3","qtd_linha":"11","h_folha":"29.7cm","w_folha":"21.0cm"},"A4060/A4260/A4360":{"pTop_folha":"1.52cm","pLeft_folha":"0.72cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.26cm","mRight_etiqueta":"0.26cm","h_etiqueta":"3.81cm","w_etiqueta":"6.35cm","qtd_coluna":"3","qtd_linha":"7","h_folha":"29.7cm","w_folha":"21.0cm"},"A4261/A4361":{"pTop_folha":"0.91cm","pLeft_folha":"0.72cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.26cm","mRight_etiqueta":"0.26cm","h_etiqueta":"4.65cm","w_etiqueta":"6.35cm","qtd_coluna":"3","qtd_linha":"6","h_folha":"29.7cm","w_folha":"21.0cm"},"A4062/A4262/A4362":{"pTop_folha":"1.29cm","pLeft_folha":"0.47cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.26cm","mRight_etiqueta":"0.26cm","h_etiqueta":"3.39cm","w_etiqueta":"9.90cm","qtd_coluna":"2","qtd_linha":"8","h_folha":"29.7cm","w_folha":"21.0cm"},"A4063/A4263/A4363/A4063R":{"pTop_folha":"1.52cm","pLeft_folha":"0.47cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.26cm","mRight_etiqueta":"0.26cm","h_etiqueta":"3.81cm","w_etiqueta":"9.90cm","qtd_coluna":"2","qtd_linha":"7","h_folha":"29.7cm","w_folha":"21.0cm"},"A4264/A4364":{"pTop_folha":"0.47cm","pLeft_folha":"0.72cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.26cm","mRight_etiqueta":"0.26cm","h_etiqueta":"7.19cm","w_etiqueta":"6.35cm","qtd_coluna":"3","qtd_linha":"4","h_folha":"29.7cm","w_folha":"21.0cm"},"A4265/A4365":{"pTop_folha":"1.30cm","pLeft_folha":"0.47cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.26cm","mRight_etiqueta":"0.26cm","h_etiqueta":"6.78cm","w_etiqueta":"9.90cm","qtd_coluna":"2","qtd_linha":"4","h_folha":"29.7cm","w_folha":"21.0cm"},"A4067/A4267/A4367":{"pTop_folha":"0.43cm","pLeft_folha":"0.50cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.00cm","mRight_etiqueta":"0.00cm","h_etiqueta":"28.85cm","w_etiqueta":"20.00cm","qtd_coluna":"1","qtd_linha":"1","h_folha":"29.7cm","w_folha":"21.0cm"},"A4268/A4368":{"pTop_folha":"0.51cm","pLeft_folha":"0.51cm","pBottom_folha":"0cm","pRight_folha":"0cm","mTop_etiqueta":"0.00cm","mBottom_etiqueta":"0.00cm","mLeft_etiqueta":"0.00cm","mRight_etiqueta":"0.00cm","h_etiqueta":"14.34cm","w_etiqueta":"19.99cm","qtd_coluna":"1","qtd_linha":"2","h_folha":"29.7cm","w_folha":"21.0cm"}};
var etiqueta = new Etiqueta();

etiqueta.atualizarValores();
atualizarValoresEtiqueta();

/*CARREGA LISTA DE MODELOS */
	//DIRETO DA PAGINA
	loadSelectModelo(lista_perfil);
	//COM REQUISIÇÃO AJAX
	//carregarPerfil();



function loadSelectModelo(lista_perfil){
	json = lista_perfil;
	var x = document.getElementById("select_modelo");
    document.getElementById("select_modelo").innerHTML = '';

    for (perfil in json){
    	lista_perfil[perfil] = json[perfil];
		var option = document.createElement("option");
		option.text = perfil;
		option.value = perfil;
		x.add(option);
    }

	//trocarModelo();
	etiqueta.atualizarValores();
	atualizarValoresEtiqueta();
}

function carregarPerfil() {
    var xhttp = new XMLHttpRequest();
    var codperfiletiqueta = 0;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            json = JSON.parse(this.responseText);
            
            loadSelectModelo(lista_perfil)
            
			trocarModelo();
			etiqueta.atualizarValores();
			atualizarValoresEtiqueta();
			
       }
    };
    xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("");
} 

function trocarModelo(){
	var perfilSelecionado = document.getElementById("select_modelo").value;

	document.getElementById('pLeft_folha').value = lista_perfil[perfilSelecionado].pLeft_folha;
	//document.getElementById('pRight_folha').value = lista_perfil[perfilSelecionado].pRight_folha;
	document.getElementById('pTop_folha').value = lista_perfil[perfilSelecionado].pTop_folha;
	//document.getElementById('pBottom_folha').value = lista_perfil[perfilSelecionado].pBottom_folha;
	document.getElementById('h_folha').value = lista_perfil[perfilSelecionado].h_folha;
	document.getElementById('w_folha').value = lista_perfil[perfilSelecionado].w_folha;
	document.getElementById('mLeft_etiqueta').value = lista_perfil[perfilSelecionado].mLeft_etiqueta;
	//document.getElementById('mRight_etiqueta').value = lista_perfil[perfilSelecionado].mRight_etiqueta;
	document.getElementById('mTop_etiqueta').value = lista_perfil[perfilSelecionado].mTop_etiqueta;
	//document.getElementById('mBottom_etiqueta').value = lista_perfil[perfilSelecionado].mBottom_etiqueta;
	document.getElementById('h_etiqueta').value = lista_perfil[perfilSelecionado].h_etiqueta;
	document.getElementById('w_etiqueta').value = lista_perfil[perfilSelecionado].w_etiqueta;
	document.getElementById('qtd_coluna').value = lista_perfil[perfilSelecionado].qtd_coluna;
	document.getElementById('qtd_linha').value = lista_perfil[perfilSelecionado].qtd_linha;

	etiqueta.atualizarValores();
	atualizarValoresEtiqueta();
}


function atualizarValoresEtiqueta(){
	
	/* FOLHA LEFT */
	var cols = document.getElementsByClassName('canto-left');
	var novoValor = document.getElementById('pLeft_folha').value;
	var i = 0;
	for(i=0; i<cols.length; i++) {
		cols[i].style.paddingLeft = novoValor;
	}

	/* FOLHA RIGHT */
	/*var cols = document.getElementsByClassName('canto-right');
	var novoValor = document.getElementById('pRight_folha').value;
	for(i=0; i<cols.length; i++) {
		cols[i].style.paddingRight = novoValor;
	}*/

	/* FOLHA TOP */
	var cols = document.getElementsByClassName('canto-top');
	var novoValor = document.getElementById('pTop_folha').value;
	for(i=0; i<cols.length; i++) {
		cols[i].style.paddingTop = novoValor;
	}

	/* FOLHA BOTTOM */
	/*var cols = document.getElementsByClassName('canto-bottom');
	var novoValor = document.getElementById('pBottom_folha').value;
	for(i=0; i<cols.length; i++) {
		cols[i].style.paddingBottom = novoValor;
	}*/

	/* ALTURA FOLHA */
	var cols = document.getElementsByClassName('folha');
	var novoValor = document.getElementById('h_folha').value;
	for(i=0; i<cols.length; i++) {
		cols[i].style.height = novoValor;
	}

	/* LARGURA FOLHA */
	var cols = document.getElementsByClassName('folha');
	var novoValor = document.getElementById('w_folha').value;
	for(i=0; i<cols.length; i++) {
		cols[i].style.width = novoValor;
	}


	/* ETIQUETA */

	/* ETIQUETA LEFT */
	var cols = document.getElementsByClassName('e-left');
	var novoValor = document.getElementById('mLeft_etiqueta').value;
	for(i=0; i<cols.length; i++) {
		cols[i].style.marginLeft = novoValor;
	}

	/* ETIQUETA RIGHT */
	/*var cols = document.getElementsByClassName('e-right');
	var novoValor = document.getElementById('mRight_etiqueta').value;
	for(i=0; i<cols.length; i++) {
		cols[i].style.marginRight = novoValor;
	}*/

	/* ETIQUETA TOP */
	var cols = document.getElementsByClassName('e-top');
	var novoValor = document.getElementById('mTop_etiqueta').value;
	for(i=0; i<cols.length; i++) {
		cols[i].style.marginTop = novoValor;
	}

	/* ETIQUETA BOTTOM */
	/*var cols = document.getElementsByClassName('e-bottom');
	var novoValor = document.getElementById('mBottom_etiqueta').value;
	for(i=0; i<cols.length; i++) {
		cols[i].style.marginBottom = novoValor;
	}*/

	/* LARGURA ALTURA ETIQUETA */
	var cols = document.getElementsByClassName('etiqueta');
	var novoValorW = document.getElementById('w_etiqueta').value;
	var novoValorH = document.getElementById('h_etiqueta').value;
	for(i=0; i<cols.length; i++) {
		cols[i].style.width = novoValorW;
		cols[i].style.height = novoValorH;
	}

	/* LARGURA ALTURA NOPRINT */
	var cols = document.getElementsByClassName('no-print');
	var novoValorW = document.getElementById('w_etiqueta').value;
	var novoValorH = document.getElementById('h_etiqueta').value;
	for(i=0; i<cols.length; i++) {
		cols[i].style.width = novoValorW;
		cols[i].style.height = novoValorH;
	}
}


function adicionarCorFundo(){
	
	var folha = document.getElementById("folha");

	if (folha.style.backgroundColor == ""){
		folha.style.backgroundColor = "red";
	}
	else{
		folha.style.backgroundColor = "";
	}
	
	
}

function atualizarConteudo(){
	conteudo = document.getElementById("conteudo");
	conteudo = conteudo.value.split("\n");
	
	// make the conteudo like this format '{"0":"PASTEL","1":"CHURROS","2":"SONHO","3":"PIMENTA"}';
	conteudo = JSON.stringify(conteudo);

	jsonString = conteudo;

	etiqueta.atualizarValores();

}