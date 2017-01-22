/**
 * Created by 95 on 2016/3/7.
 */

var Notif = {

    init : function(options)
    {
        if( Debug ==false)
        {
            return;
        }
        $('<div>').addClass('devInfo').appendTo("body");
        $('<div>').addClass('devBack').appendTo("div.devInfo");
    },

    options : {},

    print : function(text){
        if( Debug ==false)
        {
            return;
        }
        if(typeof text == 'undefined') return;
        //if(text.slice(-1) != ".") text += ".";
        Notif.printMessage(text);
    },

    clearHidden : function(){
        var bottom = $('div.devBack').position().top + $('div.devBack').outerHeight(true);
        $('.devInfoTxt').each(function () {
            if($(this).position().top > bottom){
                $(this).remove();
            }
        })
    },

    printMessage : function(t)
    {
        var text = $('<div>').addClass('devInfoTxt').css('opacity',0).text(t).prependTo('div.devBack');
        text.animate({opacity:1} , 500 , 'linear' , function(){
            Notif.clearHidden();
        });
    },
};

/**
 * Created by 95 on 2016/3/7.
 */

var Debug = true;

var Engine = {

        btn : null,
        text01: null,

        init : function()
        {
            text01 = $('<div>').addClass('text').attr('id', 'text').appendTo('div#area');
            btn = $('<div>').addClass('clickArea').attr('id', 'click').text('click').appendTo('div#area');

            Notif.init();

            //session
            document.session = $("#session").val();

            btn.click(
                function(){
                    text01.text('wait...');
                    btn.css('background-color','#ff9999');
                    btn.animate({backgroundColor:'#6495ed'},100);

                    //ajax
                    jQuery.ajax({
                        url:"./",
                        type:'POST',
                        data:{
                            session:document.session,
                            action:'text'
                        },
                        dataType:'json',
                        success:function(data,status,xhr){
                            text01.text(data['data']);
                        },
                        error:function(XMLHttpRequest, textStatus, errorThrown){
                             Notif.print("XMLHttpRequest.status="+XMLHttpRequest.status);
                             Notif.print("XMLHttpRequest.readyState="+XMLHttpRequest.readyState);
                             Notif.print("XMLHttpRequest.responseText="+XMLHttpRequest.responseText);
                             Notif.print("XMLHttpRequest.statusText="+XMLHttpRequest.statusText);
                             Notif.print("XtextStatus="+textStatus);
                        },
                        complete: function(XMLHttpRequest, textStatus) {
                            // 调用本次AJAX请求时传递的options参数
                        }
                    })
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