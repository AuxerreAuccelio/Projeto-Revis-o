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
    console.log(url_json); 
    refresh_screen(url_json);
}


function refresh_screen(pokemon_tratado){
    const img = document.querySelector('section img');
    img.src = pokemon_tratado.sprites.other['official-artwork'].front_shiny;
}













































// const url = `https://picsum.photos/v2/list`; 

// async function data(){
//     const dados = await fetch(url);
//     // console.log(data);
//     const metadados = await dados.json();

//     meta(metadados);
// }

// data();

// function meta(metadados){
//       //console.table(metadados);
//       metadados.forEach(
//         foto => {
//             //Crie a tag semãntica
//             const response = document.createElement('div');
            
//             //Preencha a tag semântica com o conteúdo
//             response.innerHTML = `
//                 <img src="${foto.download_url}" width="300">
//                 <h4>Autor: ${foto.author}</h4>
//                 <h3>ID: ${foto.id}</h3>
//             `
        
//             //Pendure a tag semântica com o conteúdo
//             document.querySelector('main').appendChild(response);
//         }
        
//       );
// }

