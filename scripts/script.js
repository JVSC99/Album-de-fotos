let token = '563492ad6f917000010000013e4f5fa79ed3499d8952c6d21a645d90';
let urlAuth= "https://api.pexels.com/v1/search?query=baby";
let foto = document.querySelectorAll('.sub_img');
let foto2 = document.querySelector('#img-big');
let id1;
let flag=0;
var vetorFoto = new Array();

document.querySelector('#conectar').onclick = function(){
    geraAuthToken(urlAuth);
}

//Função para retornar o token de autenticação para acessar o url de retorno de dados
function geraAuthToken(urlAuthToken){
    let request = new XMLHttpRequest();
    request.open('GET',urlAuthToken, true);
                                                               //método GET para retornar dados, a url da api e defino que o método é assincrono (true)
                                                             //defino para a api que o arquivo é um json
    request.setRequestHeader('Authorization', token);

    request.onload = function(e){             //carrego a requisição, esse método ficará funcionando por trás da aplicação processando o retorno da api
        if(request.readyState === 4){         //verifica se a conexão está ativa
            if(request.status === 200){       //verifica se a requisição foi um sucesso
                if(flag<2){
                    let jsonObj = request.response;// crio uma variavel json para receber os dados retornado da api
                    vetorFoto = vetorFoto.concat(jsonObj.photos[0])
                    id1 = jsonObj.next_page;
                    mudarImg(vetorFoto[flag].src.medium,1);
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
}

function mudarImg(src,img){
    if(img===1){
        foto.setAttribute('src',src);  
    }else{
        foto2.setAttribute('src',src);
    }
    
}