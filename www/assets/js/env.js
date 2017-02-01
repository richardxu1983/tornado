/**
 * Created by 95 on 2016/3/7.
 */

var Env = {

    time_ui : null,

    pos_ui : null,

    time_txt : "1001年 , 第1天 , 白天 [ 春天 - 晴朗 ]",

    pos_txt : "奥丁城郊外 [12,35] - 自己的家",

    day : 0,

    hour : 0,

    init : function(options)
    {
        time_ui = $('<div>').addClass('wrd').text(Env.time_txt).css("left","8px").appendTo(".topBar");
        pos_ui = $('<div>').addClass('wrd').text(Env.pos_txt).css("right","18px").appendTo(".topBar");
    },

    setTimeTxt : function(str)
    {
        Env.time_ui.text(str);
    },

    setPosTxt : function(str)
    {
        Env.pos_ui.text(str);
    },
}