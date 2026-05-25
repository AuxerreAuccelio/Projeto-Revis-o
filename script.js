// const url = `https://pokeapi.co/api/v2/pokemon/`; //url retirada do site
//const url = `https://pokeapi.co/api/v2/pokemon/4`;


const form = document.querySelector('form');

let escutador = form.addEventListener('submit', function(e){
    e.preventDefault();
    let pokemon = document.querySelector("input");   //aqui devolve um objeto apontando para o HTML
    let id_pokemon = normalize_text(pokemon);   // aqui devolve uma string - pouco tipada então passa como number
    clean_validate(pokemon, id_pokemon);
        
} );

function normalize_text(pokemon){
    let id_pokemon = (pokemon.value.toLowerCase());
    id_pokemon = id_pokemon.replace(/\s+/g, '').trim().replace(/^0+/, '');
    console.log(id_pokemon);
    return id_pokemon;
}

function clean_validate(pokemon, id_pokemon){
    pokemon.value = ""; // limpa a entrada no input
    if(id_pokemon){
        data(id_pokemon);
    }
}

async function data(id_pokemon){ /* console.log(`${id_pokemon} aqui noutra funcao`);  */
    const url = `https://pokeapi.co/api/v2/pokemon/${id_pokemon}`;   //atribui-se o nome ou o id ao final da url
    await metadados(url, id_pokemon);
}

async function metadados(url, id_pokemon){
    const url2 = await fetch(url);   // a url string é transformada em objeto e fala sobre
                                     // a trasmissão do status 200 ok ou 404 not found
    const url_json = await url2.json();   // a url objeto mostra os metadados de fato da API
    refresh_screen(url_json, id_pokemon);
}


function refresh_screen(pokemon_tratado, id_pokemon){
    const img = document.querySelector('section img');
    img.src = pokemon_tratado.sprites.other['official-artwork'].front_shiny;

    const h2 = document.querySelector('h2');
    h2.innerText = `${pokemon_tratado.id} - ${pokemon_tratado.name.toUpperCase()}`;
    

    const elemento_habilidade = document.querySelector('#habilidade');
    let array_habilidades = pokemon_tratado.abilities.map( (habilidade) => { return habilidade.ability.name.toUpperCase(); } );
    array_habilidades = array_habilidades.join(' / ');    
    // console.log(array_habilidades);
    elemento_habilidade.innerHTML = `<span style="color: blue;"> HABILIDADE:</span> <span style="color: yellow;">${array_habilidades}</span>`;
    elemento_habilidade.style.display = "inline-block";

    const elemento_movimento = document.querySelector('#movimento');
    let array_movimentos = pokemon_tratado.moves.slice(0, 3).map( (movimento) => { return movimento.move.name.toUpperCase(); } );
    array_movimentos = array_movimentos.join(' / ');
    elemento_movimento.innerHTML = `<span style="color: blue;">MOVIMENTOS:</span> <span style="color: yellow;">${array_movimentos}</span>`;
    elemento_movimento.style.display = "inline-block";

    const elemento_tipo = document.querySelector('#tipo');    
    let array_tipos = pokemon_tratado.types.map( (tipo) => { return tipo.type.name.toUpperCase() ;} );
    array_tipos = array_tipos.join(' / ');
    elemento_tipo.innerHTML = `<span style="color: blue;">TIPO:</span> <span style="color: yellow;">${array_tipos}</span>`;
    elemento_tipo.style.display = "inline-block";

    const elemento_peso = document.querySelector('#peso');
    let peso_em_kg = pokemon_tratado.weight / 10;    
    elemento_peso.innerHTML = `<span style="color: blue;">PESO:</span> <span style="color: yellow;">${peso_em_kg} Kg</span>`;
    elemento_peso.style.display = "inline-block";
   
    monitoramento(pokemon_tratado.id);

}


function monitoramento(pokemon_tratado){
    let elemento_voltar = document.querySelector('#voltar');

    const novo_botao = elemento_voltar.cloneNode(true);
    elemento_voltar.parentNode.replaceChild(novo_botao, elemento_voltar);

    novo_botao.addEventListener('click', () => {        
        let id_atual = (Number(pokemon_tratado - 1) );
      
            if(id_atual > 0 && id_atual < 1026){
                data(id_atual);
            }   else {
                    if(id_atual <= 0){
                    id_atual = 1025;
                    data(id_atual);
                }
         }                   
        
    } );
}




/*


// 1. Centralize o tratamento de erro onde a rede é consultada
async function metadados(url, id_pokemon) {
    try {
        const resposta = await fetch(url);
        
        // Se a API retornar 404 ou erro, pula direto para o catch
        if (!resposta.ok) throw new Error("Pokémon não encontrado");

        const url_json = await resposta.json();
        refresh_screen(url_json, id_pokemon);
    } catch (erro) {
        console.error("Erro na busca: ", erro);
        alert('Pokémon não encontrado! Verifique o nome ou ID.');
    }
}


*/






/*


async function metadados(url) {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error("Pokémon não encontrado");
        
        const url_json = await resposta.json();
        refresh_screen(url_json);
    } catch (erro) {
        alert("Erro: Pokémon não encontrado ou falha na conexão.");
        console.error(erro);
    }
}


*/
