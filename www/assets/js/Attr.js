/**
 * Created by 95 on 2016/3/7.
 */

var Role = {

	mapAreaId:0,
	mapArea:{
		x:0,
		y:0,
	},
	block:{
		x:0,
		y:0,
	}
} 

var AttrView = {

    ui : null,

    init : function(options)
    {
        Attr.ui = $('<div>').addClass('attrBar').appendTo("#box");
    },
}