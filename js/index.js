define(['jquery','../lib/swiper','../tpl/movie','../lib/template-native','../lib/template'],function ($,Swiper,tplFile,tpl,stpl) {
    var req = $.ajax({
        url:'data/data.json'
    });

    var textArea = $('#mtpl');

    req.done(function (data) {
        var movieList = data.data.movie_data;

        var render = tpl.compile(tplFile);
        var html = render({imgList:movieList});

        var render2 = stpl.compile(textArea.val());
        var html2 = render2({lists:movieList});

        $('.nav').html(html);
        $('.all-lists').html(html2);

        $('.info-list').each(function (idx,val) {
            $(this).find('table').eq(0).siblings().addClass('deep-hide');
        });

        var slides=null;
        var wrapper = $('.info-area');
        var mySwiper = new Swiper('.nav',{
            slidesPerView: 'auto',
            spaceBetween: 10,
            freeMode: true,
            onTap:function (s, e) {
                //控制电影海报区域的高亮效果
                if(!slides) slides = document.querySelector('.nav').querySelectorAll('.swiper-slide');
                for(var i=0; i<slides.length; i++){
                    slides[i].className = slides[i].className.replace(' active','')
                }
                var str = s.clickedSlide && s.clickedSlide.className;
                if(str && str.indexOf(' active')==-1){
                    s.clickedSlide.className = str + ' active';
                }
                //调用实例化的swiper组件的slideTo方法，控制swipe组件滑动到点击的图片
                mySwiper.slideTo(s.clickedIndex,300,function () {
                });
                //根据点击图片的索引控制不同article的显示和隐藏
                wrapper.eq(s.clickedIndex).removeClass('hide').siblings().addClass('hide');

                //根据点击图片的索引获取当前的日期列表dom
                var swipeTarget = wrapper.eq(s.clickedIndex).find('.movie-date');
                //获取当前显示的article下的所有table
                var tables = wrapper.eq(s.activeIndex).find('table');
                //为避免swipe组件未知bug，在确保日期列表display属性为block时，进行实例化
                var dtSwiper = new Swiper(swipeTarget[0],{
                    freeMode:true,
                    slidesPerView:'auto',
                    onTap:function (t) {
                        swipeTarget.find('li').eq(t.clickedIndex).addClass('self-active').siblings().removeClass('self-active');
                        dtSwiper.slideTo(t.clickedIndex,300,function () {

                        });

                        //tables.eq(t.clickedIndex).removeClass('deep-hide').siblings().addClass('deep-hide');
                    }
                });

            },
            onInit:function (s) {
                var slides = document.querySelector('.nav').querySelectorAll('.swiper-slide');
                slides[0].className += ' active';
                //在初始化swipe组件时，默认给第一个日期列表添加swipe功能
                var swipeTarget = wrapper.eq(s.activeIndex).find('.movie-date');
                var tables = wrapper.eq(s.activeIndex).find('table');
                var dtSwiper = new Swiper(swipeTarget[0],{
                    freeMode:true,
                    slidesPerView:'auto',
                    onTap:function (t) {
                        swipeTarget.find('li').eq(t.clickedIndex).addClass('self-active').siblings().removeClass('self-active');
                        dtSwiper.slideTo(t.clickedIndex,300,function () {

                        });

                        //tables.eq(t.clickedIndex).removeClass('deep-hide').siblings().addClass('deep-hide')
                    }
                })
            }
        });


    });

    $(document).on('click','.date-item',function (e) {
        var index = $(this).index();
        var tables = $(this).parents('.time-lists').next().find('table');
        tables.addClass('deep-hide');
        tables.eq(index).removeClass('deep-hide');
    })


});