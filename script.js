// const url = `https://pokeapi.co/api/v2/pokemon/`; //url retirada do site
// //const url = `https://pokeapi.co/api/v2/pokemon/4`;

async function get_willing(e){
    e.preventDefault();
    const pokemon = document.querySelector("#top input");   //aqui devolve um objeto apontando para o HTML
    // console.log(pokemon);
    const id_pokemon = (pokemon.value.toLowerCase().trim());   // aqui devolve um number
    // console.log(id_pokemon);

    if(id_pokemon)
        await data(id_pokemon);
} 

document.querySelector('form').addEventListener('submit', get_willing );


async function data(id_pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${id_pokemon}`;   //atribui-se o id ao final da url
    // console.log(url);
    await metadados(url);
}

async function metadados(url){
    const url2 = await fetch(url);   // a url string é transformada em objeto e fala sobre
                                     // a trasmissão do status 200 ok ou 404 not found
    // console.log(url2);
    const url_json = await url2.json();   // a url objeto mostra os metadados de fato da API
    //console.log(url_json); 
    refresh_screen(url_json);
}


function refresh_screen(pokemon_tratado){
    const img = document.querySelector('section img');
    img.src = pokemon_tratado.sprites.other['official-artwork'].front_shiny;

    const h2 = document.querySelector('h2');
    h2.innerText = pokemon_tratado.name.toUpperCase();
    

    const elemento_habilidade = document.querySelector('#habilidade');
    elemento_habilidade.innerHTML = `<span style="color: blue;"> HABILIDADE:</span> <span style="color: yellow;">${pokemon_tratado.abilities[0].ability.name.toUpperCase()}</span>`;
    elemento_habilidade.style.display = "inline-block";

    const elemento_movimento = document.querySelector('#movimento');
    elemento_movimento.innerHTML = `<span style="color: blue;">MOVIMENTOS:</span> ${pokemon_tratado.moves[0].move.name.toUpperCase()}`;
    elemento_movimento.style.display = "inline-block";

    const elemento_tipo = document.querySelector('#tipo');    
    elemento_tipo.innerHTML = `<span style="color: blue;">TIPO:</span> ${pokemon_tratado.types[0].type.name.toUpperCase()}`;
    elemento_tipo.style.display = "inline-block";

    const elemento_peso = document.querySelector('#peso');
    elemento_peso.innerHTML = `<span style="color: blue;">PESO:</span> <span style="color: yellow;">${pokemon_tratado.weight}</span>`;
    elemento_peso.style.display = "inline-block";
   
    monitoramento(pokemon_tratado.id);

}


function monitoramento(pokemon_tratado){
    let elemento_voltar = document.querySelector('#voltar');

    const novo_botao = elemento_voltar.cloneNode(true);
    elemento_voltar.parentNode.replaceChild(novo_botao, elemento_voltar);

    novo_botao.addEventListener('click', () => {        
        let id_atual = (Number(pokemon_tratado - 1) );

        try{
            if(id_atual > 0 && id_atual < 1026){
                console.log(id_atual);
                data(id_atual);
            }    
        }
        catch(erro) {
            
            // console.error("Erro na busca: ", erro);            
            alert('Pokémon não encontrado! Por favor verifique o nome ou o ID !');
            
        }
         finally{
            if(id_atual <= 0){
            console.log(id_atual);
            id_atual = 1025;
            data(id_atual);
            }
         }                   
        
    } );
}












// Faltas 

// Logica de Programação 7 - max 25
// Redes 10 - max 25
// SO 5 -  max 25
