var dbug =
{
    sendResetAttr:function()
    {
        var data =
        {
            session:document.session,
            action:'resetAttr',
        };
        jQuery.postJSON("./debug",data,dbug.resetAttrBack,Engine.onUpdateError)
    },

    resetAttrBack:function(data)
    {
        Role.AttrInit(data.attr)
    },
}