define([],function () {
    return '<ul class="item-lists clearfix swiper-wrapper">'+
        '<% for( var i = 0; i<imgList.length; i++ ){ %>' +
        '<li class="m-item swiper-slide"><img src="<%= imgList[i].movie_img_url %>" alt=""></li>'+
        '<% } %>'+
        '</ul>'
});