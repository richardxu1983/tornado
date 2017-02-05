/**
 * Created by 95 on 2016/3/7.
 */

var Role = {

	mapAreaId:0,
	status:0,
	gold:0,
	atFunction:"",
	mapArea:{
		x:0,
		y:0,
	},
	block:{
		x:0,
		y:0,
	},
	attr:{
		hp:0,
		fed:0,
		coldResist:0,
		atk:0,
		def:0,
	},

	mapAreaSet:function(x,y)
	{
		Role.mapArea.x = x
		Role.mapArea.y = y
	},

	blockSet:function(x,y)
	{
		Role.block.x = x
		Role.block.y = y
	},

	AttrSet:function(key,value)
	{
		Role.attr[key]=value
		AttrView.AttrSet(key,value)
	},

	GoldSet:function(value)
	{
		Role.gold = value
		Role.AttrSet("gold",value)
	},

	AttrGet:function(key)
	{
		return Role.attr[key]
	},

	AttrInit(data)
	{
		for (key in data){
			Role.AttrSet(key,data[key])
		}
	}
} 

var AttrView = {

    ui : null,

    hp : {
    	wrap : null,
    	value:null,
    	text:30,
    	danger:25,
    },

    fed : {
    	wrap : null,
    	value:null,
    	text:31,
    	danger:25,
    },

    coldResist:{
    	wrap : null,
    	value:null,   	
    	text:32,
    },

    atk:{
    	wrap : null,
    	value:null,   
    	text:33,	
    },

    def:{
    	wrap : null,
    	value:null,  
    	text:34,	
    }, 
    gold:{
    	wrap : null,
    	value:null,   
    	text:35,	
    },

    initAttrUI:function(attr,left,top)
    {
    	AttrView[attr].wrap = $('<div>').addClass('attrwrap').attr("id",attr+"wrap").css("left",left+"px").css("top",top+"px").appendTo(AttrView.ui);
    	$('<div>').attr("id",attr+"label")
    	.addClass("attrlabel")
    	.text(getString(AttrView[attr].text)+" :")
    	.appendTo(AttrView[attr].wrap);
    	AttrView[attr].value = $('<div>').attr("id",attr+"value")
    	.addClass("attrvalue")
    	.text("0")
    	.appendTo(AttrView[attr].wrap);
    },

    initPropUI:function(attr,left,top)
    {
    	AttrView[attr].wrap = $('<div>').addClass('propwrap').attr("id",attr+"wrap").css("right",left+"px").css("top",top+"px").appendTo(AttrView.ui);
    	$('<div>').attr("id",attr+"label")
    	.addClass("proplabel")
    	.text(getString(AttrView[attr].text)+" :")
    	.appendTo(AttrView[attr].wrap);
    	AttrView[attr].value = $('<div>').attr("id",attr+"value")
    	.addClass("attrvalue")
    	.text("0")
    	.appendTo(AttrView[attr].wrap);
    },

    AttrSet:function(attr,value)
    {
    	AttrView[attr].value.text(value);
    	if(AttrView[attr].danger!=undefined)
    	{
    		if(value<=AttrView[attr].danger)
    		{
    			AttrView[attr].value.addClass("danger")
    		}
    		else
    		{
    			if(AttrView[attr].value.hasClass("danger"))
    			{
    				AttrView[attr].value.removeClass("danger")
    			}
    		}
    	}
    },

    init : function(options)
    {
        AttrView.ui = $('<div>').addClass('attrBar').appendTo("#box");
        AttrView.initAttrUI("hp",7,7);
        AttrView.initAttrUI("fed",7,35);
        AttrView.initAttrUI("coldResist",112,7);
        AttrView.initAttrUI("atk",112,35);
        AttrView.initAttrUI("def",217,7);
        AttrView.initPropUI("gold",5,7);
        
    },
}