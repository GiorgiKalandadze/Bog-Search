// URLS
const url_trending = "https://api.giphy.com/v1/gifs/trending?";
var query_url = "https://api.giphy.com/v1/gifs/search?";

var api_key = '&api_key=aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB&fmt=json';
var topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];


class Config {
    constructor(list, query_url){
        this.list = list;
        this.query_url = query_url;
        this.initTopics();
    }
    initTopics(){
        for(let i = 0; i < this.list.length; i++){
            let li = document.createElement('li');
            li.className = 'topic-item';
            li.innerHTML = this.list[i];
            document.querySelector('.topic-items').appendChild(li);
        }
    }
    redrawTopics(){
        let t_items = document.querySelectorAll('.topic-item');
        for(let i = 0; i < this.list.length; i++){
            t_items[i].innerHTML = this.list[i];
        }
    }
    append(topic){
        this.list.shift();
        this.list.push(topic);
    }
    getURL(topic){
        if(!this.list.includes(topic) && topic != url_trending){
            this.append(topic);
            this.redrawTopics();
        }
        let url = this.query_url + 'q=' + topic + api_key;
        return url;
    }
}

class Catalog extends Config{
    render(data){
        document.querySelector('.list').innerHTML = '';
        data.forEach(elem => {
            let newNode = this.generator(elem);
            this.appendNode(newNode);
        });
    }
    generator(elem){
        let img = document.createElement('img');
        img.className = 'gif';
        img.src = elem.images.downsized.url;
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
    if(topic.length < 1) return;
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

