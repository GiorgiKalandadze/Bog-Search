// URLS
const url_trending = "https://api.giphy.com/v1/gifs/trending?";
var query_url = "https://api.giphy.com/v1/gifs/search?";

var api_key = '&api_key=aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB&fmt=json';
var topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];

class Config {
    constructor(list, query_url){
        this.list = list;
        this.query_url = query_url;
        this.addTopics();
    }
    addTopics(){
        for(let i = 0; i < this.list.length; i++){
            let li = document.createElement('li');
            li.className = 'topic-item';
            li.innerHTML = this.list[i];
            document.querySelector('.topic-items').appendChild(li);
        }
    }
    append(topic){
        this.list.shift();
        this.list.push(elem);
    }
    getURL(topic){
        let url = this.query_url + 'q=' + topic + api_key;
        return url;
    }

}

class Catalog extends Config{
    render(data){
        data.forEach(elem => {
            let newNode = this.generator(elem);
            this.appendNode(newNode);
        });
    }
    generator(elem){
        let img = document.createElement('img');
        img.className = 'gif';
        img.src = elem.url;
        let div = document.createElement('div');
        div.className = 'box';
        div.appendChild(img);
        return div;
    }
    appendNode(newNode){
        document.querySelector('.list').appendChild(newNode);
    }
}

const catalog = new Catalog(topics,query_url);

async function loadData(topic){
    try{        
        let url = catalog.getURL(topic);
    
        const request = await fetch(url, {method: 'GET'});
        if(request.status === 404){
            document.querySelector('.list').innerHTML = "Couldn't fetch data";
            return;
        }
        const list = await request.json();
        catalog.render(list.data);
    } catch(error) {
        console.log(error);
    }
}

