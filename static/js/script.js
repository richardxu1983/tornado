/**
 * Created by 95 on 2016/3/7.
 */


var Engine = {

        btn : null,
        text01: null,

        init : function()
        {
            text01 = $('<div>').addClass('text').attr('id', 'text').appendTo('div#area');
            btn = $('<div>').addClass('clickArea').attr('id', 'click').text('click').appendTo('div#area');

            btn.click(
                function(){
                    text01.text(Math.floor(Math.random() * 100));
                    btn.css('background-color','#ff9999');
                    btn.animate({backgroundColor:'#6495ed'},100);
                }
            );
        }
    };

$(
    function()
    {
        Engine.init();
    }
);