/**
 * Created by 95 on 2016/3/7.
 */

var text=new Array();
text[0]="系 统"
text[1]="返 回"
text[2]="退出登录"
text[3]="年"
text[4]="春天"
text[5]="夏天"
text[6]="秋天"
text[8]="冬天"
text[9]="周"
text[10]="天"
text[11]="上午"
text[12]="晚上"
text[13]="天黑了..."
text[14]="天亮了，新的一天到来了..."
text[15]="背包"
text[16]="装备"
text[17]="双手"
text[18]="零"
text[19]="点"
text[20]="午夜"
text[21]="凌晨"
text[22]="正午"
text[23]="下午"
text[24]="当前用户"
text[25]="通用"
text[26]="新闻"
text[27]="用户不存在，请重新登录！"
text[28]="在别处登录了，请重新登录！"
text[29]="发生未知错误，请重新登录！"
text[30]="生命"
text[31]="饱食"
text[32]="抗寒"
text[33]="攻击"
text[34]="防御"
text[35]="金币"
text[36]="重置"
text[37]="自己的"
text[38]="家"
text[39]="森 林"
text[40]="查 看"
text[41]="建 造"
text[42]="升 级"
text[43]="采 集"
text[44]="打 猎"
text[45]="购 买"
text[46]="挖 掘"
text[47]="离 开"
text[48]="石 坑"
text[49]="平 原"

var placeType=new Array();
placeType[0]=38;
placeType[1]=39;
placeType[2]=48;
placeType[3]=49;

var funText = new Array();
funText["view"] = 40;
funText["build"] = 41;
funText["expand"] = 42;
funText["gather"] = 43;
funText["hunt"] = 44;
funText["buy"] = 45;
funText["dig"] = 46;



function getString(id) {return text[id];}
function placeGetTitle(type){return getString(placeType[type])}
function funGetText(str){return getString(funText[str])}