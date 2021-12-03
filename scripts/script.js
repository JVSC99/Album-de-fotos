let token = '563492ad6f917000010000013e4f5fa79ed3499d8952c6d21a645d90'; // key de autorização ao fazer requisição no API pexels
let urlAuth; //url da API
let foto = document.querySelectorAll('.sub_img'); //dados das imagens do carrossel
let containeSubImg = document.querySelector('#container-sub_img');//dados do container do carrossel
let imgBig = document.querySelector('#img-big'); // dados da tag p responsável por armazenar o nome do album
let capaAlbum = document.querySelector('#capaAlbum'); //dados do container da foto
let galeria = document.querySelector('#galeria');
let containerLoading = document.querySelector('#loading');
let autor = new Array(); // vetor para armazenar o nome dos autores
let urlAutor= new Array(); // vetor para armazenar a url dos perfil pexel dos autores
var vetorFoto = new Array(); // vetor para armazenar os dados das fotos que a API retornou
let flag=0; // controla o numero de requisições que vão ser feita por pesquisa
let position=0; // controla o tamanho do deslocamento das páginas do carrossel.
let pag=1; // controla em qual página o carrossel se localiza

let campoBusca = document.querySelector("#campoBusca");//dados do campo de digitação

//função inicial e responsável por chamar a fução que faz a requisição na API
function criarLista(){
    
    if(campoBusca.value){
        containeSubImg.style.visibility = 'hidden';
        document.querySelector("#legend-img").style.display = "none";
        let width = tamdaTela(galeria);
        width = tamTelaInt(width);
        containerLoading.style.visibility ='visible';
        pag=1;
        $('#galeria').animate({
            scrollLeft: '0px' 
        }, 1000);
        flag=0;
        imgBig.style.visibility = 'hidden';
        capaAlbum.textContent = campoBusca.value;
        capaAlbum.style.visibility = 'hidden';
        urlAuth = "https://api.pexels.com/v1/search?query="+campoBusca.value;
        geraAuthToken(urlAuth);
    }
    
    
}

//Função para fazer autenticação/requisição na API e armazenamento dos dados Json. exemplo autores e urls. 
function geraAuthToken(urlAuthToken){
    let request = new XMLHttpRequest();

    if(flag<=5){ //resposavel por controlar o número de requisições feitas;

        request.open('GET',urlAuthToken, true);     //definindo a requisição como um GET
        request.setRequestHeader('Authorization', token); // setando o header do Json e inserindo a nossa key da API

        request.onload = function(e){               //carrego a requisição, esse método ficará funcionando por trás da aplicação processando o retorno da api
            if(request.readyState === 4){           //verifica se a conexão está ativa
                if(request.status === 200){         //verifica se a requisição foi um sucesso
                        
                    let jsonObj = request.response; // Variavel json para receber os dados retornado da api
                        vetorFoto[flag] = jsonObj.photos[0]; //alocando no vetor os dados do objeto Json relacionado a chave photos
                        let newUrl = jsonObj.next_page; // atribuindo a url da proxima foto para a variavel newUrl para fazer a requisição da proxima imagem.
                        inserirSubImg(vetorFoto[flag].src.large,flag); //chamando a função responsável por inserir fotos no carrossel
                        flag++;
                        geraAuthToken(newUrl);//chamar a função de requisição novamente

                }else{
                    alert('Erro ao receber os dados: '+request.statusText);  //em caso de erro exibe a msg
                    location.reload();
                }
            }
        };
        request.onerror = function(e){           //verifica se a criação da requisição não ocorreu erro
            alert('Digite outro tema'+request.statusText);
            location.reload();
        }
        
        request.responseType = 'json';  //solicito a api que os dados que eu preciso seja um json
        request.send(null);             // envio a requisição        
    }else{
        capaAlbum.style.visibility = 'visible';
        containerLoading.style.visibility = 'hidden';
        containeSubImg.style.visibility = 'visible';
        return;
    }
                  
}


//carregando fotos para carrossel
function inserirSubImg(src,img){
    
    foto = document.querySelector("#img"+img); 
    foto.setAttribute('src',src);  
    autor[img] = vetorFoto[img].photographer;
    urlAutor[img] = vetorFoto[img].photographer_url;
}

//definindo a foto selecionada no carrossel como a imagem principal
function colocarNaBig(img){
    document.querySelector("#legend-img").style.display = "block";
    capaAlbum.style.visibility = 'hidden';
    imgBig.style.visibility = 'visible';
    foto = document.querySelector("#img"+img);
    let src = foto.getAttribute('src');
    document.querySelector('#legend-img').innerHTML = "<a id='link-autor' href='"+urlAutor[img]+"'target='_blank'>Autor:<br>"+autor[img]+"</a>";

    imgBig.setAttribute('src',src);

}


function tamdaTela(container){
    return window.getComputedStyle(container).getPropertyValue('width');
}


//função responsavel pela paginação e controle das páginas
function paginacao(action){
    let width = tamdaTela(galeria);
    let totalFotos;
    totalFotos = (flag);

    let fotosPagina = numFotos(width);

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

//função responsável por alterar o tamanho do deslocamento do scroll e o numero de fotos em cada pagina de acordo 
//com o tamanho do container das imagens do carrossel.

function numFotos(width){
    if(width==='270px'){
        position=272;
        return fotosPagina = 3;
    }
    if(width==='660px'){
        position=660;
        return fotosPagina = 7;
    }
    if(width==='893px'){
        position=893;
        return fotosPagina = 7;
    }
    if(width==='1200px'){
        position=1200;
        return fotosPagina = 10;
    }    
}

function tamTelaInt(width){
    if(width==='270px'){
        return 270;
    }
    if(width==='660px'){
        return 660;
    }
    if(width==='893px'){
        return position=893;
    }
    if(width==='1200px'){
        return position=1200;
    }  
}