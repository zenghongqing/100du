/**
 * Created by zenghongqing on 16/8/29.
 */
$(document).ready(function () {
    //搜索切换
    (function () {
        var aLi = $("#menu li");
        var arrText = [
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        var oText = $("#search").find(".form .text");
        var iNow = 0;
        oText.val(arrText[iNow]);
        aLi.each(function(index){
            $(this).click(function () {
                aLi.attr("class","gradient");
                $(this).attr("class","active");
                iNow = index;
                oText.val(arrText[iNow]);

            })
        })
        oText.focus(function () {
            if($(this).val() == arrText[iNow]){
                $(this).val('');
            }
        });
        oText.blur(function () {
            if($(this).val() == ''){
                oText.val(arrText[iNow]);
            }
        })
    })();
    //update文字滚动
    (function () {
        var oDiv = $(".update");
        var arrData = [
            { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
            { 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
            { 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
            { 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
            { 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
            { 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
        ];
        var oUl = $(".update ul");
        var str = '';
        for(var i = 0;i < arrData.length;i++){
            str += '<li><a href="'+ arrData[i].url +'"><strong>'+ arrData[i].name +'</strong> <span>'+ arrData[i].time +'分钟前</span> 写了一篇新文章：'+ arrData[i].title +'…</a></li>';
        }
        oUl.html(str);
        var iH = oUl.find("li").height();
        var timer = null;
        var oBtnUp = $("#updateUpBtn");
        var oBtnDown = $("#updateDownBtn");
        var iNow = 0;
        oBtnUp.click(function () {
            doMove(-1);
        });
        oBtnDown.click(function () {
            doMove(1);
        });
        var timer = setInterval(function () {
            autoPlay();
        },2000);
        function autoPlay(){
            doMove(-1);
        }

        function doMove(num){
            iNow += num;
            if(Math.abs(iNow) > arrData.length - 1){
                iNow = 0;
            }
            if(iNow > 0){
                iNow = -(arrData.length - 1);
            }
            oUl.stop().animate({"top":iNow * iH},2200,"elasticOut");
        }

        oDiv.hover(function () {
            clearInterval(timer);
        }, autoPlay);
        //oUl.animate({"top":-iH},2200,"elasticOut");
    })();

    //选项卡
    (function () {
        fnTab($(".tabNav1"),$(".tabCon1"));
        fnTab($(".tabNav2"),$(".tabCon2"));
        function fnTab(oNav,aCon) {
            var aElem = oNav.children();
            aCon.hide().eq(0).show();
            aElem.each(function (index) {
                $(this).click(function(){
                    aElem.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');
                    aElem.find('a').attr('class','triangle_down_grey');
                    $(this).find('a').attr('class','triangle_down_red');
                    aCon.hide().eq(index).show();
                })
            });
        }
    })();
    //自动播放焦点图
    (function () {
        var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
        var oDiv = $("#fade");
        var aUlLi = oDiv.find("ul li");
        var aOlLi = oDiv.find("ol li");
        var oP = oDiv.find("p");
        var iNow = 2;
        var timer = null;
        fnFade();
        aOlLi.click(function () {
            iNow = $(this).index();
            fnFade();
        });
        autoPlay();
        oDiv.hover(function () {
            clearInterval(timer);
        },autoPlay);
        function autoPlay(){
            timer = setInterval(function () {
                iNow++;
                iNow %= arr.length;
                fnFade();
            },2000);
        }
        function fnFade(){
            aUlLi.each(function (index) {
                if(index != iNow){
                    aUlLi.eq(index).fadeOut().css('zIndex',1);
                    aOlLi.eq(index).removeClass('active');
                }
                else{
                    aUlLi.eq(index).fadeIn().css('zIndex',2);
                    aOlLi.eq(index).addClass('active');
                }
                oP.text(arr[iNow]);
            })
        }
    })();
    //日历提示
    (function () {
        var aSpan = $(".calender h3 span");
        var aImg = $(".calender .img");
        var oPrompt = $(".today_info");
        var oImg = oPrompt.find('img');
        var oStrong = oPrompt.find('strong');
        var oP = oPrompt.find('p');
        aImg.hover(function () {
            var iTop = $(this).parent().position().top - 30;
            var iLeft = $(this).parent().position().left + 48;
            var index = $(this).parent().index() % aSpan.size();
            oPrompt.show().css({'left':iLeft,'top':iTop});
            oP.text($(this).attr("info"));
            oImg.attr("src",$(this).attr('src'));
            oStrong.text(aSpan.eq(index).text());
        }, function () {
            oPrompt.hide();
        })
    })();

    //BBS论坛高亮
    (function () {
        $(".bbs ol li").mouseover(function () {
            $(".bbs ol li").removeClass('active').eq($(this).index()).addClass('active');
        })
    })();

    //鼠标半透明提示
    (function () {
        $('.hot_area li').mouseover(function () {
            if($(this).index() == 0) return;
            $('.hot_area li p').remove();
            var arr = [
                '',
                '用户1<br />人气1',
                '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
                '用户3<br />人气3',
                '用户4<br />人气4',
                '用户5<br />人气5',
                '用户6<br />人气6',
                '用户7<br />人气7',
                '用户8<br />人气8',
                '用户9<br />人气9',
                '用户10<br />人气10'
            ];
            $(this).append('<p style="width: '+($(this).width() - 12) + 'px;height: '+($(this).height() - 12) + 'px">'+arr[$(this).index()]+'</p>');


        });
    })();
});