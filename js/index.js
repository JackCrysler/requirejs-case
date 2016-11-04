define(['jquery','../lib/swiper','movie','../lib/template-native'],function ($,Swiper,tplFile,tpl) {
    console.log(tpl);
    console.log(tplFile);

    var req = $.ajax({
        url:'data/data.json'
    });

    req.done(function (data) {

        var movieList = data.data.movie_data;
        console.log(movieList);

        var render = tpl.compile(tplFile);
        var html = render({imgList:movieList});
        console.log(html);
        $('.nav').html(html);


        var mySwiper = new Swiper('.nav',{
            slidesPerView: 'auto',
            spaceBetween: 10,
            freeMode: true,
            onTap:function (s, e) {
                var slides = document.querySelectorAll('.swiper-slide');
                for(var i=0; i<slides.length; i++){
                    slides[i].className = slides[i].className.replace('active','')
                }

                /*console.log(s.clickedSlide);
                 console.log(e);*/

                /*$('.m-item').each(function (i,item) {
                 $(this).removeClass('active')
                 });*/
                var str = s.clickedSlide && s.clickedSlide.className;
                if(str && str.indexOf('active')==-1){
                    s.clickedSlide.className = str + ' active';
                }

                mySwiper.slideTo(s.clickedIndex,300,function (a) {
                    console.log(a)
                })
            }
        })
    });




});