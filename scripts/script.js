let token = '563492ad6f917000010000013e4f5fa79ed3499d8952c6d21a645d90';
let urlAuth= "https://api.pexels.com/v1/search?query=baby";
let foto = document.querySelectorAll('.sub_img');
let containeSubImg = document.querySelector('#container-sub_img');
let foto2 = document.querySelector('#img-big');
let capaAlbum = document.querySelector('#capaAlbum');
let autor = new Array();
let urlAutor= new Array();
var vetorFoto = new Array();
let flag=0;
let position=0;
let pag=1;
let fotosPagina=0;

let campoBusca = document.querySelector("#campoBusca");

function criarLista(){
    pag=1;
    $('#galeria').animate({
        scrollLeft: '0px' // aqui introduz o numero de px que quer no scroll, neste caso é a altura da propria div, o que faz com que venha para o fim
    }, 1000);
    flag=0;
    foto2.style.visibility = 'hidden';
    capaAlbum.textContent = campoBusca.value;
    capaAlbum.style.visibility = 'visible';
    urlAuth = "https://api.pexels.com/v1/search?query="+campoBusca.value;
    geraAuthToken(urlAuth);
    
}

//Função para retornar o token de autenticação para acessar o url de retorno de dados
function geraAuthToken(urlAuthToken){
    let request = new XMLHttpRequest();

    if(flag<=19){

        request.open('GET',urlAuthToken, true);
        request.setRequestHeader('Authorization', token);

        request.onload = function(e){             //carrego a requisição, esse método ficará funcionando por trás da aplicação processando o retorno da api
            if(request.readyState === 4){         //verifica se a conexão está ativa
                if(request.status === 200){       //verifica se a requisição foi um sucesso
                    if(flag<=19){
                        let jsonObj = request.response;// crio uma variavel json para receber os dados retornado da api
                        vetorFoto[flag] = jsonObj.photos[0];
                        let id1 = jsonObj.next_page;
                        inserirSubImg(vetorFoto[flag].src.large,flag);
                        flag++;
                        geraAuthToken(id1);
                    }
                    
                
                }else{
                    alert('Erro ao receber os dados: '+request.statusText);  //em caso de erro exibe a msg
                }
            }
        };
        request.onerror = function(e){           //verifica se a criação da requisição não ocorreu erro
            alert('Erro: '+request.statusText);
        }
        
        request.responseType = 'json';  //solicito a api que os dados que eu preciso seja um json
        request.send(null);             // envio a requisição        
    }else{
        containeSubImg.style.visibility = 'visible';
        return;
    }
                  
}


//carregando fotos para carrossel
function inserirSubImg(src,img){
    
    foto = document.querySelector("#img"+img); 
    foto.style.visibility = 'visible';
    foto.setAttribute('src',src);  
    autor[img] = vetorFoto[img].photographer;
    urlAutor[img] = vetorFoto[img].photographer_url;
}

//definindo a foto selecionada no carrossel como a imagem principal
function colocarNaBig(img){
    capaAlbum.style.visibility = 'hidden';
    foto2.style.visibility = 'visible';
    foto = document.querySelector("#img"+img);
    let src = foto.getAttribute('src');
    document.querySelector('#legend-img').innerHTML = "Autor:<a id='link-autor' href='"+urlAutor[img]+"'target='_blank'>"+autor[img]+"</a>";

    foto2.setAttribute('src',src);

}

function paginacao(action){
    let a = document.querySelector('#galeria');
    let width = window.getComputedStyle(a).getPropertyValue('width')
    let totalFotos;
    totalFotos = (flag);

    tamdaTela(width);

    if(action===1){
        if(pag*fotosPagina<totalFotos){
            $('#galeria').animate({
                scrollLeft: (pag*position)+'px' // aqui introduz o numero de px que quer no scroll, neste caso é a altura da propria div, o que faz com que venha para o fim
            }, 1000); 
            pag++;
        }    
    }
    if(action===0){
        if(pag>1){
            pag--;
            $('#galeria').animate({
                scrollLeft: (pag*position - position)+'px' // aqui introduz o numero de px que quer no scroll, neste caso é a altura da propria div, o que faz com que venha para o fim
            }, 1000);
        }
        
    }
    
}

function tamdaTela(width){
    if(width==='270px'){
        position=272;
        fotosPagina = 3;

    }
    if(width==='660px'){
        position=660;
        fotosPagina = 7;
    }
    if(width==='893px'){
        position=893;
        fotosPagina = 7;
    }
    if(width==='1200px'){
        position=1200;
        fotosPagina = 10;
    }    
}