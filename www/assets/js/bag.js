/**
 * Created by 95 on 2016/3/7.
 */

var Bag = {

    ui : null,
    cells : null,
    desc : null,
    title_txt : getString(15)+" [ 0/16 ]",

    init : function(options)
    {
        Bag.ui = $('<div>').addClass('bagwrap').attr('id','BagPanel').appendTo("#box");
        $('<div>').addClass('titlewrap').text(Bag.title_txt).appendTo(Bag.ui);
        Bag.cells = $('<div>').addClass('bagcells').appendTo('.bagwrap');
        $('<div>').addClass('descwrap').attr('id','Bagdewr').appendTo('.bagwrap');
        Bag.desc = $('<div>').addClass('bagdesc').appendTo('#Bagdewr');
        Bag.hide()
    },

    hide : function()
    {
        Bag.ui.hide()
    },

    show : function()
    {
        Bag.ui.show()
    },
}

var Weapon = {

    ui : null,
    cells : null,
    desc : null,
    title_txt : getString(17),

    init : function(options)
    {
        Weapon.ui = $('<div>').addClass('bagwrap').attr('id','WeaponPanel').appendTo("#box");
        $('<div>').addClass('titlewrap').text(Weapon.title_txt).appendTo(Weapon.ui);
        Weapon.cells = $('<div>').addClass('bagcells').appendTo('#WeaponPanel');
        $('<div>').addClass('descwrap').attr('id','Weapondewr').appendTo('#WeaponPanel');
        Weapon.desc = $('<div>').addClass('bagdesc').appendTo('#Weapondewr');
        Weapon.hide()
    },

    hide : function()
    {
        Weapon.ui.hide()
    },

    show : function()
    {
        Weapon.ui.show()
    },
}

var Equip = {

    ui : null,
    cells : null,
    desc : null,
    title_txt : getString(16),

    init : function(options)
    {
        Equip.ui = $('<div>').addClass('bagwrap').attr('id','EquipPanel').appendTo("#box");
        $('<div>').addClass('titlewrap').text(Equip.title_txt).appendTo(Equip.ui);
        Equip.cells = $('<div>').addClass('bagcells').appendTo('#EquipPanel');
        $('<div>').addClass('descwrap').attr('id','Equipdewr').appendTo('#EquipPanel');
        Equip.desc = $('<div>').addClass('bagdesc').appendTo('#Equipdewr');
        Equip.hide()
    },

    hide : function()
    {
        Equip.ui.hide()
    },

    show : function()
    {
        Equip.ui.show()
    },
}