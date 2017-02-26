/**
 * Created by 95 on 2016/3/7.
 */

var GFun = {
    funClick:function(event)
    {
        alert(event.data.msg)
    },
}

function createMapTile(x,y)
{
    var el = $('<div>').addClass('mapTile')
    .appendTo(GB.map)
    .css("left",(x - Place.x + 4)*49+"px")
    .css("bottom",(y - Place.y + 4)*49+"px")
    .attr("id",x+"p"+y)
    .attr("x",x)
    .attr("y",y)
    .click({x:x,y:y},GB.OnClickMapTile)
    return el;
}

var GB = {

    title_ui : null,
    fun_ui : null,
    op_ui : null,
    lastOM: null,
    mapTileSel:{},

    init:function()
    {
        GB.createPlaceUI()
        GB.createMapUI()
    },
    createMapUI:function()
    {
        GB.map_ui = $('<div>').addClass('gmap').appendTo(".gboard").hide();
        GB.map = $('<div>').addClass('map').appendTo( GB.map_ui)
        CreateBtn({
        text:getString(1),
        click:GB.CloseMap,
        },GB.map_ui).css("position","absolute").css("right","5px").css("top","12px")
        GB.desc = $('<div>').addClass('mapDesc').appendTo(GB.map_ui)
    },
    createPlaceUI:function()
    {
        GB.title_ui = $('<div>').addClass('gtitle').appendTo(".gboard");
        GB.fun_ui = $('<div>').addClass('gfun').appendTo(".gboard");
        GB.op_ui = $('<div>').addClass('gop').appendTo(".gboard");
    },
    closePlaceUI:function()
    {
        GB.title_ui.remove()
        GB.fun_ui.remove()
        GB.op_ui.remove()
    },
    refreshPlaceUI()
    {
        GB.refreshUI()
    },
    CloseMap:function()
    {
        GB.map_ui.hide();
    },
    OnClickMapTile:function(event)
    {
        var str;
        if(GB.mapTileSel!=undefined)
        {
            $("#"+GB.mapTileSel.x+"p"+GB.mapTileSel.y).removeClass('mapSel')
        }
        GB.mapTileSel.x = event.data.x
        GB.mapTileSel.y = event.data.y
        str=placeGetTitle(Place.tiles[GB.mapTileSel.x+":"+GB.mapTileSel.y]["type"])
        str+=" ( "+GB.mapTileSel.x+","+GB.mapTileSel.y+" )"
        GB.desc.text(str)
        $("#"+GB.mapTileSel.x+"p"+GB.mapTileSel.y).addClass('mapSel')
    },
    ShowMap:function()
    {
        GB.map_ui.show();
        if(GB.lastOM==undefined)
        {
            var d = new Date();
            GB.lastOM = d.getTime();
            jQuery.postJSON("./omap",{},GB.onRecvMap,Engine.onSignError);
        }
        else
        {
            var d = new Date();
            if((d.getTime() - GB.lastOM)>3000)
            {
                jQuery.postJSON("./omap",{},GB.onRecvMap,Engine.onSignError);
                GB.lastOM = d.getTime();
            }
            else
            {
                GB.openExist()
            }
        }
    },
    openExist:function()
    {
        GB.map.empty();
        for(var i=Place.x-4;i<Place.x+5;i++)
        {
            for(var j=Place.y-4;j<Place.y+5;j++)
            {
                var el = createMapTile(i,j)
                if(Place.tiles[i+":"+j]!=undefined)
                {
                    el.text(placeGetTitle(Place.tiles[i+":"+j]["type"]))
                    if(Place.tiles[i+":"+j]["self"]==1)
                    {
                        el.addClass('selfm')
                    }
                }
            }
        }
    },
    onRecvMap:function(data)
    {
        GB.map.empty();
        for(var i=Place.x-4;i<Place.x+5;i++)
        {
            for(var j=Place.y-4;j<Place.y+5;j++)
            {
                var el = createMapTile(i,j)
                el.text(placeGetTitle(data[i+":"+j]["type"]))
                if(data[i+":"+j]["self"]==1)
                {
                    el.addClass('selfm')
                }
                Place.tiles[i+":"+j] = {}
                Place.tiles[i+":"+j]["type"] = data[i+":"+j]["type"]
                Place.tiles[i+":"+j]["self"] = data[i+":"+j]["self"]
                Place.tiles[i+":"+j]["belongTo"] = data[i+":"+j]["belongTo"]
            }
        }
    },
    refreshUI:function()
    {
        if(Role.status==1){return;}
        GB.refreshTitle();
        GB.refreshFun();
    },
    refreshFun:function()
    {
        GB.fun_ui.empty();
        var tab = _jData["Place"][Place.type]["function"]
        for(v in tab)
        {
            CreateBtn({
            text:funGetText(tab[v]["type"]),
            click:GFun.funClick,
            param:tab[v]["type"],
            },GB.fun_ui).css("float","left").css("margin-right","30px")
        }
        CreateBtn({
        text:getString(47),
        click:GB.ShowMap,
        },GB.fun_ui).css("right","0px").css("float","right")
    },

    refreshTitle:function()
    {
        txt="";
        if(Place.belong!==0)
        {
            if(Place.self==1)
            {
                txt+=getString(37);
            }
            else
            {
                txt+=Place.belongTo;
            }
        }
        txt+=placeGetTitle(Place.type);
        GB.title_ui.text(txt);
    },
}