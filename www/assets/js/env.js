/**
 * Created by 95 on 2016/3/7.
 */

var Env = {

    time_ui : null,
    pos_ui : null,
    time_txt : "1001年 , 第1天 , 白天 [ 春天 - 晴朗 ]",
    pos_txt : "奥丁城郊外 [12,35] - 自己的家",
    year:null,
    season : null,
    week : null,
    day : 0,
    hour : 0,
    last_hour : 0,
    season_txt : null,
    day_txt:null,

    init : function(options)
    {
        Env.time_ui = $('<div>').addClass('wrd').css("left","8px").appendTo(".topBar");
        Env.pos_ui = $('<div>').addClass('wrd').text(Env.pos_txt).css("right","18px").appendTo(".topBar");
        Env.time_ui.text(Env.time_txt);
    },

    setTime : function(year,season,week,day,hour)
    {
        Env.year = year
        Env.season = season
        Env.week = week
        Env.day = day
        Env.hour = hour
        Env.season_txt = getString(3 + Env.season)
        if(hour>=6&&hour<=18)
        {
            Env.day_txt = getString(11)
        }
        else
        {
            Env.day_txt = getString(12)
        }
        Env.time_txt = Env.year+getString(3)+" , "+Env.season_txt+" , "+Env.week+getString(9)+" , "+Env.day+getString(10)+ " , "+Env.day_txt
        if(Env.hour==19&&Env.last_hour==18)
        {
            GameInfo.print(getString(13))
        }
        if(Env.hour==6&&Env.last_hour==5)
        {
            GameInfo.print(getString(14))
        }
        Env.last_hour = Env.hour
        Env.setTimeTxt()
    },

    setTimeTxt : function()
    {
        Env.time_ui.text(Env.time_txt);
    },

    setPosTxt : function(str)
    {
        Env.pos_ui.text(str);
    },
}