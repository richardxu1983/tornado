/**
 * Created by 95 on 2016/3/7.
 */

var jMap = {}
var MAP_V = 1
var MAP_BLOCK = 40

var GFun = {
    funClick:function(event)
    {
        alert(event.data.msg)
    },
}

function createMapTile(x,y,i,j)
{
    var el = $('<div>').addClass('mapTile')
    .appendTo(GB.map)
    .css("left",(i)*50+"px")
    .css("bottom",(j)*50+"px")
    .attr("id",i+"p"+j)
    .attr("x",x)
    .attr("y",y)
    el.click({i:i,j:j},GB.OnClickMapTile)
    return el;
}

var GB = {

    title_ui : null,
    fun_ui : null,
    op_ui : null,
    lastOM: null,
    mapData : null,
    center_x:null,
    center_y:null,
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
            $("#"+GB.mapTileSel.i+"p"+GB.mapTileSel.j).removeClass('mapSel')
        }
        GB.mapTileSel.i = event.data.i
        GB.mapTileSel.j = event.data.j
        var el = $("#"+GB.mapTileSel.i+"p"+GB.mapTileSel.j)
        str=placeGetTitle(Place.tiles[el.attr("x")+":"+el.attr("y")]["type"])
        str+=" ( "+el.attr("x")+","+el.attr("y")+" )"
        GB.desc.text(str)
        el.addClass('mapSel')
    },

    ShowMap:function()
    {
        GB.map_ui.show();
        GB.openLocalMap();
    },

    getOnlineMap:function()
    {
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
        }
    },

    openLocalMap:function()
    {
        if(GB.center_x==undefined){GB.center_x=Place.x;}
        if(GB.center_y==undefined){GB.center_y=Place.y;}
        if(GB.last_center_x==GB.center_x&&GB.last_center_y==GB.center_y)
        {
            return;
        }
        var x;
        var y;
        for(var i=0;i<7;i++)
        {
            for(var j=0;j<7;j++)
            {
                x = GB.center_x-3 + i;
                y = GB.center_y-3 + j
                idx  = Math.floor(x / MAP_BLOCK)
                idy  = Math.floor(y / MAP_BLOCK)
                if(jMap[idx+"-"+idy]==undefined)
                {
                    GB.x = x;
                    GB.y = y;
                    $.ajax({
                    url: "static/json/map/"+idx+"-"+idy+".json?r="+MAP_V,
                    type: "GET",
                    success: function(data){
                        jMap[Math.floor(GB.x/MAP_BLOCK)+"-"+Math.floor(GB.y/MAP_BLOCK)] = JSON.parse(data)
                        GB.openLocalMap()}
                    })
                    return;
                }
                else
                {
                    var el = $("#"+i+"p"+j)
                    if(el.length<=0)
                    {
                        el = createMapTile(x,y,i,j)
                    }
                    else
                    {
                        el.attr("x",x)
                        el.attr("y",y)
                    }
                    mtype = jMap[idx+"-"+idy][x+":"+y]
                    mtype = (mtype==undefined)?3:mtype
                    el.text(placeGetTitle(mtype))
                    Place.tiles[x+":"+y] = {}
                    Place.tiles[x+":"+y]["type"] = mtype
                    Place.tiles[x+":"+y]["self"] = 0
                    Place.tiles[x+":"+y]["belongTo"] = "0"
                }
            }
        }
        GB.last_center_x = GB.center_x;
        GB.last_center_y = GB.center_y;
        GB.getOnlineMap();
    },

    onRecvMap:function(data)
    {
        if(GB.center_x==undefined){GB.center_x=Place.x;}
        if(GB.center_y==undefined){GB.center_y=Place.y;}
        GB.mapData = data;
        var idx;
        var idy;
        var mtype;
        for(var i=0;i<7;i++)
        {
            for(var j=0;j<7;j++)
            {
                x = GB.center_x-3 + i;
                y = GB.center_y-3 + j;
                if(data[x+":"+y]!=undefined)
                {
                    var el = $("#"+i+"p"+j)
                    if(data[x+":"+y]["self"]==1)
                    {
                        el.addClass('selfm')
                    }
                    el.text(placeGetTitle(data[x+":"+y]["type"]))
                    Place.tiles[x+":"+y]["type"] = data[x+":"+y]["type"]
                    Place.tiles[x+":"+y]["self"] = data[x+":"+y]["self"]
                    Place.tiles[x+":"+y]["belongTo"] = data[x+":"+y]["belongTo"]
                }
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