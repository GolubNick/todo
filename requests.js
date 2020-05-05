// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
// let result = null;
// xhr.onload = function () {
//     xhr.readyState;//0,1,2,3,4
//     result = JSON.parse(xhr.response);
// };
// xhr.send();

// let result = null;
//
// let promise = new Promise((resolve, reject) => {
//     let button = document.querySelector('#button');
//     button.addEventListener('click', () => {
//         resolve('dataPromise');
//     })
//
//     setTimeout(() => {
//         reject(new Error('WHOOPS!!!'));
//     }, 3000);
// });
//
// promise.then(data => {
//     result = data;
//     console.log('CLICK');
// }).catch(error => {
//     console.log(error);
// }).finally(() => {
//     console.log('FINALLY');
// });

class FuturamaInfo {
    constructor() {
        this.init();
    }

    init() {
        let dataPromise = FuturamaInfo.request(FuturamaInfo.CHARACTERS_API_URL);
        dataPromise.then(response => {
            response.json().then(data => {
                this.futuramaData = data;
                this.parseData();
            });
        })
    }

    parseData() {
        console.log(this.futuramaData);
        let charactersBlock = document.querySelector('#charactersBlock');
        this.futuramaData.forEach(character => {
            charactersBlock.innerHTML = charactersBlock.innerHTML + `
                <div class="card" style="width: 18rem;">
                    <img src="${character.PicUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${character.Name}</h5>
                        <p class="card-text">FirstAppearance: ${character.FirstAppearance}</p>
                        <p class="card-text">Age: ${character.Age}</p>
                        <p class="card-text">Planet: ${character.Planet}</p>
                        <p class="card-text">Species: ${character.Species}</p>
<!--                        <a href="#" class="btn btn-primary">Go somewhere</a>-->
                    </div>
                </div>
            `
        })
    }


    static request(url, method, body, headers) {
        return fetch(url, {
            method,
            body,
            headers
        })
    }

}


FuturamaInfo.CHARACTERS_API_URL = 'http://futuramaapi.herokuapp.com/api/v2/characters';

new FuturamaInfo();