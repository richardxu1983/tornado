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
                        url:"//127.0.0.1:8000",
                        type:'POST',
                        data:{
                            session:document.session,
                            action:'text'
                        },
                        dataType:'json',
                        success:function(data,status,xhr){
                            alert('success');
                            text01.text(data['data']);
                        },
                        error:function(XMLHttpRequest, textStatus, errorThrown){
                             alert(XMLHttpRequest.status);
                             alert(XMLHttpRequest.readyState);
                             alert(XMLHttpRequest.responseText);
                             alert(XMLHttpRequest.statusText);
                             alert(textStatus);
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