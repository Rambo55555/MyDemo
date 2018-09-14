
function assembleDateForcharts(scheduleDate,timeBlock) {
	var beginTime,endTime;
	// 工作时间段转换
	beginTime = parseDate(scheduleDate.workStart);
	endTime = parseDate(scheduleDate.workEnd);
	
	// 时间区块大小
	var timeBlockSize = timeBlock*60*1000;
	
	// 坐标轴时间段转换
	var beginTimeMod = new Date(beginTime.getTime()-(beginTime.getTime()%timeBlockSize));
	var endTimeMod = null;
	if((endTime.getTime()-beginTimeMod.getTime())%timeBlockSize) {
		endTimeMod = new Date((endTime.getTime()+timeBlockSize) - (endTime.getTime()%timeBlockSize));
	} else {
		endTimeMod = endTime;
	}
	//计算时间轴
	var timeLineStart = [];
	var timeLineEnd = [];
	var timeLineCount = 0;
	for(var i = beginTimeMod.getTime(); i < endTimeMod.getTime(); i = i + timeBlockSize) {
		timeLineStart[timeLineCount] = new Date(i);
		timeLineEnd[timeLineCount] = new Date(i+timeBlockSize);
		timeLineCount ++;
	}
	
	var chart = new Object();
	chart.chart = new Object();
	
	var title = new Object();
//	title.text = scheduleDate.title+"排班表 统计图";
//	title.x = -20;
	title = null;
	chart.title = title;
//	
	var subtitle = new Object();
//	subtitle.text = "班组:"+scheduleDate.depTeamScheduleDtos.length+" 国内:"+ scheduleDate.domSize +" 国际:"+scheduleDate.intSize+" 合计:"+(scheduleDate.domSize+scheduleDate.intSize);
//	subtitle.x = -15
	subtitle = null;
	chart.subtitle = subtitle;
	
	//	X轴信息
	var xAxis = new Object();
	var categories = [];
	for(var j = 0; j < timeLineCount; j ++) {
		categories[j] = timeLineStart[j].Format("hh:mm");
//		categories[j] = timeLineStart[j].Format("hh:mm") +" - "+timeLineEnd[j].Format("hh:mm");
	}
	xAxis.categories = categories;
	var labels = new Object();
	//计算 X坐标轴偏移
	var chartWidth = $('.row').eq(0).width();
	if(timeLineCount<=46){
		labels.x = -chartWidth*0.85/2/timeLineCount;
	} else {
		labels.x = 0;
	}
	xAxis.labels = labels;
	chart.xAxis = xAxis;
	
	//	Y轴信息
	var yAxis = new Object();
	var title = new Object();
	text = "当前时间段分配航班数";
	title.text = text;
	yAxis.title = title;
	chart.yAxis = yAxis;
	
	var tooltip = new Object();
	tooltip.valueSuffix = '/架次';
	chart.tooltip = tooltip;
	
	var legend = new Object();
	legend.layout = 'vertical';
	legend.align = 'right';
	legend.verticalAlign = 'middle';
	legend.borderWidth = 0;
	chart.legend = legend;
	
	// 处理线条
	var series = [];
	var totalLine = new Object();
	var totalLineData = [];
	totalLine.name = '总计';
	for(var ittd = 0; ittd < timeLineCount; ittd ++) { //初始总线
		totalLineData[ittd] = new Object();
		totalLineData[ittd].name = timeLineStart[ittd].Format("hh:mm") +" - "+timeLineEnd[ittd].Format("hh:mm");
		totalLineData[ittd].y = 0;
	}
	
	for(var t = 0; t < scheduleDate.depTeamScheduleDtos.length; t ++) {
		var line = new Object();
		var teamInfo = scheduleDate.depTeamScheduleDtos[t];
		var name = teamInfo.teamAlias;
		var data = [];
		for(var itd = 0; itd < timeLineCount; itd ++) {
			data[itd] = new Object();
			data[itd].name = timeLineStart[itd].Format("hh:mm") +" - "+timeLineEnd[itd].Format("hh:mm");
			data[itd].y = 0;
		}
		
		for(var td = 0; td < teamInfo.depTeamScheduleDetailDtos.length; td ++) {
			var schDepTime = parseDate(teamInfo.depTeamScheduleDetailDtos[td].schDepTime);
			for(var h = 0; h < timeLineCount; h ++) {
				if(schDepTime>=timeLineStart[h] && schDepTime<timeLineEnd[h]) {
					data[h].y++;
					totalLineData[h].y++;
				}
			}
		}
		series[t] = new Object();
		series[t].name = name;
		series[t].data = data;
	}
	totalLine.data = totalLineData;
	series.push(totalLine);
	chart.series = series;
	return chart;
}

function assembleDateForMonitorCharts(scheduleDate,timeBlock) {
	
	// 工作时间段转换
	var beginTime = parseDate(scheduleDate.monitorStart);
	var endTime = parseDate(scheduleDate.monitorEnd);
	
	// 时间区块大小
	var timeBlockSize = timeBlock*60*1000;
	
	// 坐标轴时间段转换
	var beginTimeMod = new Date(beginTime.getTime()-(beginTime.getTime()%timeBlockSize));
	var endTimeMod = null;
	if((endTime.getTime()-beginTimeMod.getTime())%timeBlockSize) {
		endTimeMod = new Date((endTime.getTime()+timeBlockSize) - (endTime.getTime()%timeBlockSize));
	} else {
		endTimeMod = endTime;
	}
	//计算时间轴
	var timeLineStart = [];
	var timeLineEnd = [];
	var timeLineCount = 0;
	for(var i = beginTimeMod.getTime(); i < endTimeMod.getTime(); i = i + timeBlockSize) {
		timeLineStart[timeLineCount] = new Date(i);
		timeLineEnd[timeLineCount] = new Date(i+timeBlockSize);
		timeLineCount ++;
	}
	
	var chart = new Object();
	chart.chart = new Object();
	
	var title = new Object();
//	title.text = scheduleDate.title+"排班表 统计图";
//	title.x = -20;
	title = null;
	chart.title = title;
//	
	var subtitle = new Object();
//	subtitle.text = "班组:"+scheduleDate.depTeamScheduleDtos.length+" 国内:"+ scheduleDate.domSize +" 国际:"+scheduleDate.intSize+" 合计:"+(scheduleDate.domSize+scheduleDate.intSize);
//	subtitle.x = -15
	subtitle = null;
	chart.subtitle = subtitle;
	
	//	X轴信息
	var xAxis = new Object();
	var categories = [];
	for(var j = 0; j < timeLineCount; j ++) {
		categories[j] = timeLineStart[j].Format("hh:mm");
	}
	xAxis.categories = categories;
	var labels = new Object();
	//计算 X坐标轴偏移
	var chartWidth = $('.row').eq(0).width();
	if(timeLineCount<=46){
		labels.x = -chartWidth*0.85/2/timeLineCount;
	} else {
		labels.x = 0;
	}
	xAxis.labels = labels;
	chart.xAxis = xAxis;
	
	//	Y轴信息
	var yAxis = new Object();
	var title = new Object();
	text = "当前时间段分配航班数";
	title.text = text;
	yAxis.title = title;
	chart.yAxis = yAxis;
	
	var tooltip = new Object();
	tooltip.valueSuffix = '/架次';
	chart.tooltip = tooltip;
	
	var legend = new Object();
	legend.layout = 'vertical';
	legend.align = 'right';
	legend.verticalAlign = 'middle';
	legend.borderWidth = 0;
	chart.legend = legend;
	
	// 处理线条
	var series = [];
	var totalLine = new Object();
	var totalLineData = [];
	totalLine.name = '总计';
	for(var ittd = 0; ittd < timeLineCount; ittd ++) { //初始总线
		totalLineData[ittd] = new Object();
		totalLineData[ittd].name = timeLineStart[ittd].Format("hh:mm") +" - "+timeLineEnd[ittd].Format("hh:mm");
		totalLineData[ittd].y = 0;
	}
	
	for(var t = 0; t < scheduleDate.depTeamScheduleDtos.length; t ++) {
		var line = new Object();
		var teamInfo = scheduleDate.depTeamScheduleDtos[t];
		var name = teamInfo.teamAlias;
		var data = [];
		for(var itd = 0; itd < timeLineCount; itd ++) {
			data[itd] = new Object();
			data[itd].name = timeLineStart[itd].Format("hh:mm") +" - "+timeLineEnd[itd].Format("hh:mm");
			data[itd].y = 0;
		}
		
		for(var td = 0; td < teamInfo.depTeamScheduleDetailDtos.length; td ++) {
			var latestTime = parseDate(teamInfo.depTeamScheduleDetailDtos[td].latestTime);
			for(var h = 0; h < timeLineCount; h ++) {
				if(latestTime>=timeLineStart[h] && latestTime<timeLineEnd[h]) {
					if(teamInfo.teamAlias != 'sys_temp_team') {
						data[h].y++;
						totalLineData[h].y++;
					}
				}
			}
		}
		series[t] = new Object();
		series[t].name = name;
		series[t].data = data;
	}
	totalLine.data = totalLineData;
	series.push(totalLine);
	chart.series = series;
	return chart;
}

/** 
 * 日期格式转换 yyyy-mm-dd hh:mm:ss
 */
function parseDate(dateStr){
    var dayArray = dateStr.split("-");
    if(dayArray.length == 3){
    	var tArray = dayArray[2].split(" ");
    	if(tArray.length == 2){
	    	var timeArray = tArray[1].split(":");
	        return new Date(dayArray[0], dayArray[1], tArray[0], timeArray[0], timeArray[1], timeArray[2]);
    	} else {
    		return new Date(dayArray[0], dayArray[1],dayArray[2]);
    	}
    }else{
        return new Date();
    }
}
/** 
 * 对Date的扩展，将 Date 转化为指定格式的String
 */
Date.prototype.Format = function (fmt) { //
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/** 
 * 计算 时间段 mod
 */
function calculateTimeBlockSize (startTime, endTime) {
    var cp = (endTime - startTime) / 12;
    //两小时 一小时  半小时  15分钟
    var cplist= [7200000,3600000,1800000,900000];
    var rlist = [];
    var f = 9999999999;
    var j = 0;
    for(var i = 0 ;i < cplist.length; i ++){
    	var cpr = Math.abs(cplist[i]-cp);
    	if(f > cpr) {
    		f = cpr;
    		j = i;
    	}
    }
    return cplist[j];
}
