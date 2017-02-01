/**
 * Created by 95 on 2016/3/7.
 */

var Bag = {

    ui : null,

    cells : null,

    desc : null,

    title_txt : "背包 [ 0/16 ]",

    init : function(options)
    {
        ui = $('<div>').addClass('bagwrap').appendTo("#box");
        $('<div>').addClass('titlewrap').text(Bag.title_txt).appendTo('.bagwrap');
        cells = $('<div>').addClass('bagcells').appendTo('.bagwrap');
        $('<div>').addClass('descwrap').appendTo('.bagwrap');
        desc = $('<div>').addClass('bagdesc').appendTo('.descwrap');
    },
}