
var topic_elems = document.getElementsByClassName('topic-item');
//Add click listener dynamically to each tobip navigation element
for(var i = 0; i < topic_elems.length; i++){
    topic_elems[i].addEventListener('click', function(e){
        loadData(e.target.innerHTML);
    });
}

