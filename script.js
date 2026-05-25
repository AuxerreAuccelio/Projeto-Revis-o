const form = document.querySelector('form');

let escutador = form.addEventListener('submit', function(e){
    e.preventDefault();
    const pokemon = document.querySelector("input");   //aqui devolve um objeto apontando para o HTML
    const id_pokemon = (pokemon.value.toLowerCase().trim());   // aqui devolve uma string - pouco tipada então passa como number
    clean_validate(pokemon, id_pokemon);
        
} );

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
    h2.innerText = `${id_pokemon} - ${pokemon_tratado.name.toUpperCase()}`;
    

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
                data(id_atual);
            }    
        }
        catch(erro) {
            
            console.error("Erro na busca: ", erro);
            alert('Pokémon não encontrado! Por favor verifique o nome ou o ID !');
            
        }
         finally{
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

// 2. Simplifique a lógica do monitoramento (Botão Voltar)
function monitoramento(id_recebido) {
    const elemento_voltar = document.querySelector('#voltar');
    const novo_botao = elemento_voltar.cloneNode(true);
    elemento_voltar.parentNode.replaceChild(novo_botao, elemento_voltar);

    novo_botao.addEventListener('click', () => {        
        let id_atual = id_recebido - 1;

        // Lógica de Loop: se for menor que 1, volta para o último Pokémon conhecido
        if (id_atual < 1) {
            id_atual = 1025;
        }
        
        data(id_atual);
    });
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


