
var topic_elems = document.getElementsByClassName('topic-item');
//Add click listener dynamically to each tobip navigation element
for(var i = 0; i < topic_elems.length; i++){
    topic_elems[i].addEventListener('click', function(e){
        deatcivate('topic-item', 'active');
        loadData(e.target.innerHTML);
        e.target.classList.toggle('active');
    });
}
//Deactivate given class for elements
function deatcivate(className, toggle){
    let nodes = document.getElementsByClassName(className);
    Array.from(nodes).forEach((elem) => {
        elem.classList.remove(toggle);
    });  
}


//Submit
document.getElementById('submit').addEventListener('click', function(e){
    deatcivate('topic-item', 'active');
    let new_topic = document.getElementById("search").value;
    loadData(new_topic);
});

// Trending
document.getElementById('trending').addEventListener('click', function(e){
    deatcivate('topic-item', 'active');
    loadData(url_trending);
});

