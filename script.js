// const url = `https://picsum.photos/v2/list`; //url retirada do site
// //const url = `https://picsum.photos/200`;

// //const main_html = document.querySelector('main');

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

