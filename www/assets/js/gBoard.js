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
    .css("left",(i)*48+"px")
    .css("bottom",(j)*48+"px")
    .attr("id",i+"p"+j)
    .attr("x",x)
    .attr("y",y)
    el.click({i:i,j:j},GB.OnClickMapTile)
    crImgForTile(el,"ground","1")
    crImgForTile(el,"obj","2")
    crImgForTile(el,"army","3")
    return el;
}

function crImgForTile(el,id,zindex)
{
    $("<img id='"+id+"' src=''/>")
    .css("vertical-align","middle")
    .css("z-index",zindex)
    .appendTo(el);
}

function crDiForMap(sid,param,left,top)
{
    CreateBtn({
    text:getString(sid),
    param:param,
    click:GB.MapGo,
    },GB.map_ui).css("position","absolute").css("left",left+"px").css("top",top+"px")
}

function setOnlineMap(el,id)
{
    //el.text(placeGetTitle(Place.tiles[id]["type"]))
    if(Place.tiles[id]["self"]==1){el.addClass('selfm')}
}

var GB = {

    title_ui : null,
    fun_ui : null,
    op_ui : null,
    lastOM: null,
    mapData : null,
    center_x:null,
    center_y:null,
    mapOn: false,
    mapTileSel:{},

    init:function()
    {
        GB.createPlaceUI()
        GB.createMapUI()
        GB.getOnlineMap()
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
        crDiForMap(50,1,490,250)
        crDiForMap(52,2,10,250)
        crDiForMap(53,3,250,11)
        crDiForMap(51,4,250,485)
    },

    MapGo:function(event)
    {
        switch(event.data.msg)
        {
            case 1:
            {
                GB.center_x+=1
                if(GB.center_x>=795){GB.center_x==795}
                break;
            }
            case 2:
            {
                GB.center_x-=1
                if(GB.center_x<=5){GB.center_x==5}
                break;
            }
            case 3:
            {
                GB.center_y+=1
                if(GB.center_y>=795){GB.center_y==795}
                break;
            }
            case 4:
            {
                GB.center_y-=1
                if(GB.center_y<=5){GB.center_y==5}
                break;
            }
        }
        if(GB.mapTileSel!=undefined)
        {
            $("#"+GB.mapTileSel.i+"p"+GB.mapTileSel.j).removeClass('mapSel')
        }
        if(GB.mapOn){ GB.openLocalMap();}
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
        GB.mapOn = false;
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
        var x = el.attr("x")
        var y = el.attr("y")
        var idx  = Math.floor(x / MAP_BLOCK)
        var idy  = Math.floor(y / MAP_BLOCK)
        var t = jMap[idx+"-"+idy][x+":"+y]
        t = (t==undefined)?3:t
        str=placeGetTitle(t)
        str+=" ( "+x+","+y+" )"
        GB.desc.text(str)
        el.addClass('mapSel')
    },

    ShowMap:function()
    {
        GB.map_ui.show();
        GB.openLocalMap();
        GB.mapOn = true;
    },

    getOnlineMap:function()
    {
        if(GB.mapOn)
        {
            jQuery.postJSON("./omap",{},GB.onRecvMap,Engine.onSignError);
        }
        setTimeout(GB.getOnlineMap,1500);
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
        var mid;
        var t;
        var img;
        var el;
        for(var i=0;i<9;i++)
        {
            for(var j=0;j<9;j++)
            {
                x = GB.center_x-4 + i;
                y = GB.center_y-4 + j
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
                    el = $("#"+i+"p"+j)
                    if(el.length<=0){el = createMapTile(x,y,i,j)}
                    else{el.attr("x",x).attr("y",y)}
                    img = el.children('#ground')
                    mid = x+":"+y;
                    mtype = jMap[idx+"-"+idy][mid]
                    mtype = (mtype==undefined)?3:mtype
                    img.attr('src',"static/img/m/m-"+mtype+".png")
                    el.removeClass('selfm')
                    if(Place.tiles[mid]!=undefined)
                    {
                        setOnlineMap(el,mid)
                    }
                }
            }
        }
        GB.last_center_x = GB.center_x;
        GB.last_center_y = GB.center_y;
    },

    onRecvMap:function(data)
    {
        if(GB.center_x==undefined){GB.center_x=Place.x;}
        if(GB.center_y==undefined){GB.center_y=Place.y;}
        GB.mapData = data;
        var idx;
        var idy;
        var mtype;
        var mid;
        for(k in data)
        {
            if(Place.tiles[k]==undefined){Place.tiles[k]={}}
            Place.tiles[k]["type"] = data[k]["type"]
            Place.tiles[k]["self"] = data[k]["self"]
            Place.tiles[k]["belongTo"] = data[k]["belongTo"]
        }
        for(var i=0;i<9;i++)
        {
            for(var j=0;j<9;j++)
            {
                x = GB.center_x-4 + i;
                y = GB.center_y-4 + j;
                mid = x+":"+y;
                if(Place.tiles[mid]!=undefined)
                {
                    setOnlineMap($("#"+i+"p"+j),mid)
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