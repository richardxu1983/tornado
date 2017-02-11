/**
 * Created by 95 on 2016/3/7.
 */

var GB = {

    title_ui : null,
    fun_ui : null,
    op_ui : null,

    init:function()
    {
        GB.title_ui = $('<div>').addClass('gtitle').appendTo(".gboard");
        GB.fun_ui = $('<div>').addClass('gfun').appendTo(".gboard");
        GB.op_ui = $('<div>').addClass('gop').appendTo(".gboard");
    },

    refreshUI:function()
    {
        GB.refreshTitle()
    },

    refreshTitle:function()
    {
        txt=""
        if(Place.belong!=0)
        {
            if(Place.self==1)
            {
                txt+=getString(37)
            }
            else
            {
                txt+=Place.belongTo
            }
        }

        txt+=placeGetTitle(Place.type)
        GB.title_ui.text(txt)
    },
}