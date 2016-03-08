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

            //session
            document.session = $("#session").val();

            btn.click(
                function(){
                    text01.text('wait...');
                    btn.css('background-color','#ff9999');
                    btn.animate({backgroundColor:'#6495ed'},100);

                    //ajax
                    jQuery.ajax({
                        url:"//localhost:8000",
                        type:'POST',
                        data:{
                            session:document.session,
                            action:'text'
                        },
                        dataType:'json',
                        success:function(data,status,xhr){
                            text01.text(data['data']);
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