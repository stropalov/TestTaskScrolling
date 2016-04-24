$(document).ready(function() {
    $('#load').on('click', addMoreData);
    $('#scroll').on('click', onScroll);
});

function onScroll(){
   $('#load').prop('disabled', function(i, v) { return !v; });
    
    if(!this.isScrolling){
        this.isScrolling = true;
        $(window).scroll(function(){
            if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                addMoreData();
            }
        });
    }else{
        this.isScrolling = false;
        $(window).unbind('scroll');
    }

}

function addMoreData(){
    $.get('/data/items.json', function (data) {
        appendToList(data);    
	});
}

function appendToList(data){
    var items = [],
        item;
	for ( var i = 0; i < data.length ; i++) {
        item =  '<li>'+
                '<img src="' + data[i].image + '">' +
                '<div class="stars">'+
                '    <span class="star star-active"></span>'+
                '    <span class="star star-active"></span>'+
                '    <span class="star star-active"></span>'+
                '    <span class="star star-inactive"></span>'+
                '    <span class="star star-inactive"></span>'+
                '</div>'+
                '<div class="text-wrap">'+
                '    <h1>' + data[i].title + '</h1>'+
                '    <p>' + data[i].paragraph + '</p>'+
                '</div>'+
            '</li>';	
        items.push(item);
	}

	$('.slides').append( items.join( "" ) );
}