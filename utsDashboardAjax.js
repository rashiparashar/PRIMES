var dataToExpoExl=[];
var listFilter =[];
var fromDate;
var toDate;
var reportType;
var trainName = null;
var trainNo = null;
var cls = null;
var zone = null;
var zoneCode = null;
var fStnCode = null;
var fStation = null;
var tStnCode = null;
var tStation = null;
var wlRQData = null;
var sendObject = null;
var netPsgnBooked=null;
var netTktsBooked=null;
var totalEarning=null;
var jsonZone=null;
var jsonLastZone=null;
var fromdateBS; 
var todateBS;
var reportParams = [];
var sendObjectZone=null;
var reportZoneParams=[];
var reportZoneParams2=[];
var sendObjectZone2=null;
var weburl ="typeOneUts/getReportUts";
fromdateBS = new moment().subtract("days", 18).format("YYYY-MM-DD");
todateBS =new moment().subtract("days", 4).format("YYYY-MM-DD");
reportParams = [];
reportParams.push("'"+fromdateBS+"'");
reportParams.push("'"+todateBS+"'");
sendObject={"reportCode":"UTSDASHBOARD","params":reportParams};


var isWSCall = true;
isFirstCall = true;
var obj = {};
obj["NR"] = new Array();
obj["NW"] = new Array();
obj["WR"] = new Array();
obj["SR"] = new Array();
obj["SW"] = new Array();
obj["KR"] = new Array();
obj["CR"] = new Array();
obj["SC"] = new Array();
obj["EO"] = new Array();
obj["SB"] = new Array();
obj["NF"] = new Array();
obj["SE"] = new Array();
obj["ER"] = new Array();
obj["NC"] = new Array();
obj["NE"] = new Array();
obj["WC"] = new Array();
obj["EC"] = new Array();
obj["ALL"] = new Array();
obj["row1"] = new Array();
obj["row2"] = new Array();
obj["row3"] = new Array();
obj["row4"] = new Array();
obj["row5"] = new Array();
obj["label"] = new Array();
obj["labelm"] = new Array();
obj["labelms"] = new Array();
var tooltip;
var xt = 0;
var initTable = true;
jQuery(document).ready(function() {
   // ChartsAmchartsBookingStatisticsZWED.init();
	//ChartsFlotcharts.initPieCharts();
	//pChartCashVsCashless.initPieCharts();
	
});
function getutsDashBoard(){
	$("#bootstrap_alerts").hide();
	listFilter =[];
	
	wsContextPath = "/newtemplatebasedmis";
				
		getWebServiceDatautsDashboard(sendObject,weburl,function(result){
			tabObjList = [];
			dataToExpoExl = [];
			console.log(result);
			var isRecordPresent = (result.data != null && result.data.length > 0) ? true :false;
			$('BSJSONData').val("{}");
		     if(isRecordPresent){		    	 
				 isSearchEnable =true;
				 var json =result;
				 $('#BSJSONData').val(JSON.stringify(result));
				 $('#DR4').val(JSON.stringify(sendObject));
				
				 switch(sendObject["reportCode"]){
				
				case "UTSDASHBOARD":
console.log(result.data);


var fromdate = new Date();
fromdate.setFullYear(fromdate.getFullYear()-1);
var yearLeapNotLeap=fromdate.getFullYear();
var aa=checkLeapYear(yearLeapNotLeap);
console.log(aa);
if(aa==1)
	{
	fromdate.setDate(fromdate.getDate()-18);
	console.log(fromdate);
	var fDate=formatDate(fromdate);
	}
else
	{
	fromdate.setDate(fromdate.getDate()-18);
	console.log(fromdate);
	var fDate=formatDate(fromdate);
	}

var todate = new Date();
todate.setFullYear(todate.getFullYear()-1);
todate.setDate(todate.getDate()-4);
var todat=formatDate(todate);

sendObject["params"]=[ "'"+fDate+"'","'"+todat+"'"];

getWebServiceDatautsDashboard(sendObject,weburl,function(resultLast){
 	console.log(resultLast);
 	isRecordPresent = (resultLast.data != null && resultLast.data.length > 0) ? true :false;
 	if(isRecordPresent){
   var jsonLast=resultLast;	
   $('#BSJSONDataLast').val(JSON.stringify(resultLast));
 	}
 	else
 		{
 		 showAlert("Record not found!", 'danger');
	     $("#resultID").hide();
 		}

for(let i=0;i<result.data.length;i++){
	
		netPsgnBooked=netPsgnBooked+result.data[i][3];
		netTktsBooked=netTktsBooked+result.data[i][4];
		totalEarning=totalEarning+result.data[i][2];
		
		console.log(netPsgnBooked);
		console.log(netTktsBooked);
		console.log(totalEarning);
	}

				    $("#totalNetPassengers").text((netPsgnBooked / 1000).toFixed(2));
				    $("#favigraph_totalNetPassengers").hide();
				    $("#favitable_totalNetPassengers").hide();
				    $("#netTicketsBooked").text((netTktsBooked / 1000).toFixed(2));
				    $("#favigraph_netTicketsBooked").hide();
				    $("#favitable_netTicketsBooked").hide();
				    $("#totalTotalEarnings").text((totalEarning / 100000).toFixed(2));
				    $("#favigraph_totalTotalEarnings").hide();
				    $("#favitable_totalTotalEarnings").hide();
				    sheetPadClick("E");
				    var fromdate = new Date();
					fromdate.setDate(fromdate.getDate()-4);
					console.log(fromdate);
					var fDate=formatDate(fromdate);
				
					reportZoneParams.push("'"+fDate+"'");
					sendObjectZone={"reportCode":"getZoneMapReport_uts","params":reportZoneParams};
					getWebServiceDatautsDashboard(sendObjectZone,weburl,function(resultZone){
					 	console.log(resultZone);
					 	isRecordPresent = (resultZone.data != null && resultZone.data.length > 0) ? true :false;
					 	if(isRecordPresent){
					  
					   jsonZone={"current":resultZone,"last":null};
					   
					   var fromdate = new Date();
					   fromdate.setFullYear(fromdate.getFullYear()-1);
					   console.log(fromdate);
					   var fDate=formatDate(fromdate);
					
					   reportZoneParams2.push("'"+fDate+"'");
					   sendObjectZone2={"reportCode":"getZoneMapReport_uts","params":reportZoneParams2};
						getWebServiceDatautsDashboard(sendObjectZone2,weburl,function(resultLastZone){
						 	console.log(resultLastZone);
						 	isRecordPresent = (resultLastZone.data != null && resultLastZone.data.length > 0) ? true :false;
						 	if(isRecordPresent){
						 		 jsonZone.last=resultLastZone;
						 	}
						 	else
						 		{
						 		 showAlert("Record not found!", 'danger');
							     $("#resultID").hide();
						 		}
						 	var StrDate = sendObjectZone.params[0].replace(/'/g, '');
						 	$("#asOnDate").html("&nbsp; ON Date : "+StrDate);
						 	setAllIndiaData(resultZone);
						 	  refreshZonalCount(resultZone);
						 	  isWSCall = false;
						 	 if(initTable){
						        	initTable=false;
						        	createTableByTableIdAndData(getZWCombData(resultZone[0],resultZone[0],["","Previous Year","Current Year"]),"zoneWiseTable","blank");
						       	    $("#zoneWiseTable_wrapper .row").remove();
						        }
						});
					 	}
					 	else
					 		{
					 		 showAlert("Record not found!", 'danger');
						     $("#resultID").hide();
					 		}
					});
});
					 break;
				
				 default:
					 $("#resultID").show();
					 drawTable(result,"detailReport","toggleColumn");
				 	 bindSearchWizard(); 
				 	 break;
				 }
				 $("#resultID").show();
			 }else{
			    	 showAlert("Record not found!", 'danger');
				     $("#resultID").hide();
		     }
		});
	return false;
}

function sheetPadClick(pad){
	 $("#chart_1").show();
	earningLastYearComparison = [];
	let json = JSON.parse($("#BSJSONData").val());
	let jsonLast=JSON.parse($("#BSJSONDataLast").val());
	c1YTitle = "Earning (In Lakhs)";
   c1BalloonText1 = "Current Year";
   c1BalloonText2 = "Last Year";
   let devBy = 100000;
	let cat = "earning";
	$("#sheetPadNESpan").html("<i class=\"fa fa-check-square-o\"></i>");
	$("#sheetPadNTSpan").empty();
	$("#sheetPadNPSpan").empty();
	if(pad=="P"){
	    $("#favigraph_totalNetPassengers").show();
	    $("#favitable_totalNetPassengers").show();
		$("#favigraph_netTicketsBooked").hide();
	    $("#favitable_netTicketsBooked").hide();
	 	$("#favigraph_totalTotalEarnings").hide();
       $("#favitable_totalTotalEarnings").hide();
       $("#table_1, #tableWrap").hide();
	    
		devBy = 1000;
		c1YTitle = "Passenger Booked (Thousands)";
		cat = "netPsgBkd";
		$("#sheetPadNPSpan").html("<i class=\"fa fa-check-square-o\"></i>");
		$("#sheetPadNESpan").empty();
		$("#sheetPadNTSpan").empty();
		for (var i = 0; i < json.data.length; i++) {
	           earningLastYearComparison.push({
	               date: json.data[i][1],
	               CY: json.data[i][3]/ devBy,
	               LY: null 
	           });
	   	}

		for (var i = 0; i < jsonLast.data.length; i++) {
	             	earningLastYearComparison[i].LY= jsonLast.data[i][3]/ devBy;
		}
	}else if(pad=="T"){
		$("#favigraph_netTicketsBooked").show();
	    $("#favitable_netTicketsBooked").show();
	    $("#favigraph_totalNetPassengers").hide();
	    $("#favitable_totalNetPassengers").hide();
		$("#favigraph_totalTotalEarnings").hide();
       $("#favitable_totalTotalEarnings").hide();
       $("#table_1, #tableWrap").hide();
		devBy = 1000;
		c1YTitle = "Tickets Booked (Thousands)";
		cat = "netTktsBkd";
		$("#sheetPadNTSpan").html("<i class=\"fa fa-check-square-o\"></i>");
		$("#sheetPadNPSpan").empty();
		$("#sheetPadNESpan").empty();
		for (var i = 0; i < json.data.length; i++) {
	           earningLastYearComparison.push({
	               date: json.data[i][1],
	               CY: json.data[i][4]/ devBy,
	               LY: null 
	           });
	   	}

		for (var i = 0; i < jsonLast.data.length; i++) {
	          	earningLastYearComparison[i].LY= jsonLast.data[i][4]/ devBy;
		}
	}
	
	if(json.data.length > 0){
		
	  console.log(earningLastYearComparison);
   	 if(pad=="E"){
	    	$("#favigraph_totalTotalEarnings").show();
	        $("#favitable_totalTotalEarnings").show();
	        
	        $("#favigraph_netTicketsBooked").hide();
		    $("#favitable_netTicketsBooked").hide();
		    $("#favigraph_totalNetPassengers").hide();
		    $("#favitable_totalNetPassengers").hide();
		    $("#table_1, #tableWrap").hide();
		    for (var i = 0; i < json.data.length; i++) {
		           earningLastYearComparison.push({
		               date: json.data[i][1],
		               CY: json.data[i][2]/ devBy,
		               LY: null 
		           });
		   	}
			for (var i = 0; i < jsonLast.data.length; i++) {
		              	earningLastYearComparison[i].LY=jsonLast.data[i][2]/ devBy;
			}
	      } 
   }else{
   	 for (var i = 0; i < json.currentYearEarning.length; i++) {
   	        earningLastYearComparison.push({
   	            date: json.currentYearEarning[i].txnDate,
   	            CY: json.currentYearEarning[i][cat],
   	            LY: 0 
   	        });
   	    }
   		
   	 if(pad=="E"){
 	    	$("#favigraph_totalTotalEarnings").show();
 	        $("#favitable_totalTotalEarnings").show();
 	        
 	        $("#favigraph_netTicketsBooked").hide();
 		    $("#favitable_netTicketsBooked").hide();
 		    $("#favigraph_totalNetPassengers").hide();
 		    $("#favitable_totalNetPassengers").hide();
 		  $("#table_1, #tableWrap").hide();
 	      } 
   }
	ChartsAmchartsBookingStatisticsLYC("chart_1");

	return false;
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
function table_totalTotalEarnings() {
	$("#tblrdata").html("");
	let strLines = JSON.parse($("#BSJSONData").val());
	let strLinesLast = JSON.parse($("#BSJSONDataLast").val());
	let currentYearEarning = strLines.data;
	let lastYearEarning = strLinesLast.data;
	for (var i = 0; i < currentYearEarning.length; i++) {
		var obj = currentYearEarning[i];

		var tdirect = lastYearEarning[i];
		var ddmm = obj[1];
		const words = ddmm.split("-");
		const datemonth = words[1] + "-" + words[2];

		var tble = "<tr><td>" + datemonth + "</td><td>" + obj[2]
				+ "</td><td>" + tdirect[2] + "</td></tr>";
		$("#tblrdata").append(tble);

	}

	$("#chart_1").hide();
	$("#table_1, #tableWrap").show();

}
function table_netTicketsBooked() {
	$("#tblrdata").html("");
	let strLines = JSON.parse($("#BSJSONData").val());
	let strLinesLast = JSON.parse($("#BSJSONDataLast").val());
	let currentYearEarning = strLines.data;
	let lastYearEarning = strLinesLast.data;
	for (var i = 0; i < currentYearEarning.length; i++) {
		var obj = currentYearEarning[i];

		var tdirect = lastYearEarning[i];
		var ddmm = obj[1];
		const words = ddmm.split("-");
		const datemonth = words[1] + "-" + words[2];

		var tble = "<tr><td>" + datemonth + "</td><td>" + obj[4]
				+ "</td><td>" + tdirect[4] + "</td></tr>";
		$("#tblrdata").append(tble);

	}

	$("#chart_1").hide();
	$("#table_1, #tableWrap").show();

}

function table_totalNetPassengers() {
	$("#tblrdata").html("");
	let strLines = JSON.parse($("#BSJSONData").val());
	let strLinesLast = JSON.parse($("#BSJSONDataLast").val());
	let currentYearEarning = strLines.data;
	let lastYearEarning = strLinesLast.data;
	for (var i = 0; i < currentYearEarning.length; i++) {
		var obj = currentYearEarning[i];

		var tdirect = lastYearEarning[i];
		var ddmm = obj[1];
		const words = ddmm.split("-");
		const datemonth = words[1] + "-" + words[2];

		var tble = "<tr><td>" + datemonth + "</td><td>" + obj[3]
				+ "</td><td>" + tdirect[3] + "</td></tr>";
		$("#tblrdata").append(tble);

	}

	$("#chart_1").hide();
	$("#table_1, #tableWrap").show();

}
function setAllIndiaData(result){
	var allIndiaObj = result.data;
	console.log(result.data[17][2]);
	$("#currentm1").html("<font class='counter' style=font-family:'digital-clock-font';>" + result.data[17][2]+ "</font><font>" + "</font>");

    $("#currentm2").html("<font class='counter' style=font-family:'digital-clock-font';>" +result.data[17][4] + "</font><font>" + "</font>");

    $("#currentm3").html("&#8377&nbsp;<font class='counter' style=font-family:'digital-clock-font';>" + result.data[17][6] + "</font><font>" + "</font>");

    $("#currentm4").html("&#8377&nbsp;<font class='counter' style=font-family:'digital-clock-font';>" + result.data[17][7] + "</font><font>" + "</font>");

    $("#currentm5").html("&#8377&nbsp;<font class='counter' style=font-family:'digital-clock-font';>" + result.data[17][8] + "</font><font>" + "</font>");
    
    $("#currentm6").html("<font class='counter' style=font-family:'digital-clock-font';>" + result.data[17][3]+ "</font><font>" + "</font>");
    
    $("#currentm7").html("<font class='counter' style=font-family:'digital-clock-font';>" + result.data[17][5] + "</font><font>" + "</font>");

    $('.counter').counterUp({
        delay: 10,
        time: 2000
    });
    var lastUpdtd= (allIndiaObj.loadingtime!=undefined && allIndiaObj.loadingtime!=null)?allIndiaObj.loadingtime:"";
    $("#lastUpdated").attr("style","float:right").html("<i class=\"fa fa-clock-o\"></i>&nbsp;LAST UPDATED "+lastUpdtd);
}
function refreshZonalCount(aIData){
    $.each($(".det"), function() {

        var id = (this).id;
        var zonecode = id.split('_')[1];
        var responseText = filterAllIndiaData(zonecode,aIData);
        if(responseText!=null){
            obj[zonecode][0] = responseText[2];
            obj[zonecode][1] = responseText[3];
            obj[zonecode][2] = responseText[4];
            obj[zonecode][3] = responseText[5];
            obj[zonecode][4] = responseText[6];
            obj[zonecode][5] = responseText[7];
            obj[zonecode][6] = responseText[8];

            obj["labelm"][0] = "Tickets Booked: ";
            obj["labelm"][1] = "Tickets Cancelled: ";
            obj["labelm"][2] = "Passengers Booked: ";
            obj["labelm"][3] = "Passengers Cancelled: ";
            obj["labelm"][4] = "Gross Earning:  ";
            obj["labelm"][5] = "Refund:  ";
            obj["labelm"][6] = "Net Earning:  ";

            var text = '';
            for (i = 0; i < 7; i++) {
                text = text + "<span >" + obj["labelm"][i] + obj[zonecode][i] + "<br/></span>";
            }

            obj[zonecode][7] = text;

            $("#dett_" + zonecode).html(obj["labelm"][0]);

            $("#detc_" + zonecode).html(obj[zonecode][0]).counterUp({
                delay: 10,
                time: 300
            });
    	}
    	App.unblockUI("#zoneMapReport");
    	
    });
}
function filterAllIndiaData(str,a)
{
	var match = null;

    for (var i = 0; i < a.data.length; i++)
    {
        if ( a.data[i][1].trim()===str.trim() ) match= a.data[i]
    }
    return match
}
function changeImage() {
	if(!isWSCall){
		$.each($(".det"), function() {
	        var id = (this).id;
	        var zonecode = id.split('_')[1];
	        $("#dett_" + zonecode).html(obj["labelm"][xt]);
	        $("#detc_" + zonecode).html(obj[zonecode][xt]).counterUp({
	            delay: 10,
	            time: 300
	        });
	        $("#dettt_" + zonecode).html(obj["labelms"][xt]);

	    });

	    if (xt != 6) {
	        xt++;
	    } else {
	        xt = 0;
	    }
	}
}

setInterval("changeImage()", 3000);
$('.zoneboundaries').mouseover(function(e) {
    var zonecd = (this).id;
    var zonenm = $(this).attr('name');
    var ht = "<font><b>" + zonenm + "</b></font><br/><div  style='text-align:left;font-weight:bold;font-size:12px;'>" + obj[zonecd][7] + "</div>";
    $('div#pop-up').html(ht);
    $('div#pop-up').show(100).css('top', e.pageY)
        .css('left', e.pageX)
        .appendTo('body');

});
$('.zoneboundaries').mouseout(function(e) {
    var id = (this).id;

    var ht = obj[id][7];
    $('div#pop-up').hide();


});
$("#removeTabBtn").click(function(){
	$("#reportZWBody").hide(500);
    $("#myMap").removeClass('col-lg-7 col-md-7');
    $("#myMap").addClass('col-lg-8 col-md-8 col-md-offset-2');
});
$('.zoneboundaries').click(function(e) {
	blockUi_Id = "reportZWBody";
	var zwData = [];
    var zonecd = $(this).attr('id');
    var cols = ["","Previous Year","Current Year"];
    var zonenm = $(this).attr('name');
    $("#zoneImgDiv").show();
    $("#zoneImg").attr("src", contextPath+"/resources/images/ZoneMap/" + zonecd + ".png");
    $("#tableHeader").html(zonenm);
    $("#piePanel").hide();
    $("#myMap").removeClass('col-lg-8 col-md-8 col-md-offset-2');
    $("#myMap").addClass('col-lg-7 col-md-7');
    $("#reportZWBody").hide(100);
	var sendObject={
			"dataFilter": {
                "txnDate": currDate,
                "allIndia": true
            }
		}
    getWebServiceData(sendObject,"graph/getAllZoneData_uts",function(result) {
        zwData = getZWCombData(resultLastZones,resultZone,cols);
        
        createTableByTableIdAndData(zwData,"zoneWiseTable","blank");
        $("#zoneWiseTable_wrapper .row").css("display", "none");
        App.unblockUI("#reportZWBody");
    });
    $("#reportZWBody").show(200);
});
function blink_text() {
    $('.fa-clock-o').fadeOut(500);
    $('.fa-clock-o').fadeIn(500);
}
function checkLeapYear(year) {

    //three conditions to find out the leap year
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        console.log(year + ' is a leap year');
        return 1;
    } else {
        console.log(year + ' is not a leap year');
        return 0;
    }
}

/* ===================================================================
 * UTS All India Report (KPIs + POS table)  -  used by utsDashboard.jsp
 *
 * Report codes (register each one in the backend report-code mapping):
 *   UTSPOSSUMMARY    POS wise summary      -> pos table + avg tickets/passengers/earning KPIs
 *   UTSTERMLOCCOUNT  location + terminal   -> kpiLocations, kpiTerminals (row 0, cols 0,1)
 *                                             rashi.uts_dashboard_summary2(@from_date,@to_date,@zone_code)
 *   UTSSTATIONCOUNT  stations              -> kpiStations (row 0, col 0)
 *
 * Parameters: [from, to]; the zone is added as 3rd parameter in Full Report
 * mode (and always for UTSTERMLOCCOUNT).
 * =================================================================== */
var UTS_RPT_CFG = {
    pos: {
        reportCode: "UTSPOSSUMMARY",
        valuesAreTotals: true
    },
    termLoc: {
        reportCode: "UTSTERMLOCCOUNT",
        alwaysZone: true,                       // rashi.uts_dashboard_summary2 (@from_date, @to_date, @zone_code)
        col: { locations: 1, terminals: 2 }    
    },
    station: {
        reportCode: "UTSSTATIONCOUNT",
        col: { stations: 1 }
    }
};

var UTS_REPORT_URL = (typeof weburl !== "undefined" && weburl) ? weburl : "typeOneUts/getReportUts";
 var UTS_TIMEOUT_MS = 60000;;


function utsDefaultFrom() {
    var m = moment();
    var y = m.month() >= 3 ? m.year() : m.year() - 1;   // April = month 3
    return y + "-04-01";
}

function utsDefaultTo() {
    var to = moment().subtract(1, "days").format("YYYY-MM-DD");
    var from = utsDefaultFrom();
    return to < from ? from : to;                        // e.g. on 1 April
}

var utsFrom = utsDefaultFrom();
var utsTo = utsDefaultTo();
var utsZone = "ALL";
var utsGen = 0;          // bumped on every reload so late responses are ignored

/* ---------- Helpers ---------- */

var utsFocus = false;     // true = "Full Report" view (only the All India block + filters)

function utsHasZoneFilter() {
    return utsFocus;
}

/* Full Report view: hide map + booking statistics, show From / To / Zone inputs */
function utsSetFocus(on) {
    utsFocus = !!on;

    $("#utsMainRow").toggleClass("uts-focus", utsFocus);
    $("#utsAIToggle i").attr("class", utsFocus ? "fa fa-arrow-left" : "fa fa-external-link");
    $("#utsAIToggle span").text(utsFocus ? "Back" : "Full Report");

    // both views start from: this FY till yesterday, zone ALL
    utsReloadAll(utsDefaultFrom(), utsDefaultTo(), "ALL");

    if (!utsFocus) {
        $(window).trigger("resize");
    }
}

function utsCleanZone(z) {
    var v = String(z == null ? "" : z).replace(/[^A-Za-z0-9 _\-]/g, "").trim().toUpperCase();
    return v || "ALL";
}

function utsFmt(n) {
    var v = Number(n);
    return (n === "" || n == null || isNaN(v))
        ? (n == null ? "" : n)
        : v.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function utsLakh(v) {
    return (v / 100000).toFixed(2);
}

function utsEsc(s) {
    return $("<div>").text(s == null ? "" : s).html();
}

/* leading number of a cell such as "12,345 (4.5%)" -> 12345 */
function utsNum(v) {
    var m = String(v == null ? "" : v).replace(/,/g, "").match(/^-?\d+(?:\.\d+)?/);
    return m ? parseFloat(m[0]) : NaN;
}

/* number of days in the selected range, both ends included */
function utsDayCount() {
    var d = moment(utsTo, "YYYY-MM-DD").diff(moment(utsFrom, "YYYY-MM-DD"), "days") + 1;
    return d > 0 ? d : 1;
}

function utsParams(cfg) {
    var p = ["'" + utsFrom + "'", "'" + utsTo + "'"];
    if (utsHasZoneFilter() || (cfg && cfg.alwaysZone)) {
        p.push("'" + utsZone + "'");
    }
    return p;
}

/*
 * cb(rows)      - called with result.data
 * onError(msg)  - called on timeout / bad response / exception
 */
function utsCall(cfg, cb, onError) {
    var req = { reportCode: cfg.reportCode, params: utsParams(cfg) };
    var gen = utsGen;
    var done = false;
    var timer = null;

    function fail(msg) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        console.error("UTS " + cfg.reportCode + ": " + msg);
        if (gen === utsGen && onError) onError(msg);
    }

    console.log("UTS request:", JSON.stringify(req));
    timer = setTimeout(function () {
        fail("request timed out. Check Network tab and backend mapping.");
    }, UTS_TIMEOUT_MS);

    try {
        getWebServiceDatautsDashboard(req, UTS_REPORT_URL, function (result) {
            if (done) return;
            if (!result || !Array.isArray(result.data)) {
                fail("invalid response");
                return;
            }
            done = true;
            clearTimeout(timer);
            if (gen !== utsGen) return;          // a newer reload is running
            cb(result.data);
        });
    } catch (e) {
        fail("request failed: " + e);
    }
}

/* ---------- Heading: From Date / To Date / no. of days ---------- */

function utsUpdateHeading() {
    var days = utsDayCount();
    var zoneTxt = (utsHasZoneFilter() && utsZone !== "ALL");

    $("#utsAITitle").text(zoneTxt ? "Zone " + utsZone + " Report" : "All India Report");
    $("#utsAIDates").text(
        "From Date: " + moment(utsFrom, "YYYY-MM-DD").format("DD-MM-YYYY")
        + "   To Date: " + moment(utsTo, "YYYY-MM-DD").format("DD-MM-YYYY")
        + "   (" + days + (days === 1 ? " day)" : " days)")
    );
}

/* ---------- 1) POS report + avg tickets / passengers / earning KPIs ---------- */

function utsPosMessage(text, cls) {
    $("#posReportBody").html(
        '<tr><td colspan="6" class="text-center ' + (cls || "") + '">' + utsEsc(text) + "</td></tr>"
    );
}

function utsResetAvgKpis() {
    $("#kpiAvgTkt, #kpiAvgPsgn, #kpiAvgEarn").text("-");
}

function loadUtsPosReport() {
    utsPosMessage("Loading...");
    utsResetAvgKpis();

    utsCall(UTS_RPT_CFG.pos, function (rows) {
        if (!rows.length) {
            utsPosMessage("Record not found");
            return;
        }

        var divisor = UTS_RPT_CFG.pos.valuesAreTotals ? utsDayCount() : 1;
        var sumT = 0, sumP = 0, sumE = 0, sl = 0, html = "";

        rows.forEach(function (row) {
            var v = Array.isArray(row) ? row.slice() : [
                row["Sl No."], row["POINT OF SALE"], row["MODES OF PAYMENT"],
                row["AVG. TICKETS/DAY"], row["AVG. PASSENGERS/DAY"], row["AVG. EARNING/DAY"]
            ];

            if (v.length === 5) v.unshift("");      // procedure sent no Sl No. column

            var name = v[1] == null ? "" : String(v[1]);

            // we add our own total row
            if (/^\s*(grand\s*)?total\s*$/i.test(name)) return;

            var t = utsNum(v[3]), p = utsNum(v[4]), e = utsNum(v[5]);

            if (!isNaN(t)) sumT += t;
            if (!isNaN(p)) sumP += p;
            if (!isNaN(e)) sumE += e;

            html += "<tr>"
                + "<td>" + utsEsc(v[0] === "" || v[0] == null ? ++sl : v[0]) + "</td>"
                + "<td>" + utsEsc(name) + "</td>"
                + "<td>" + utsEsc(v[2]) + "</td>"
                + '<td class="text-right">' + (isNaN(t) ? "" : utsFmt(t / divisor)) + "</td>"
                + '<td class="text-right">' + (isNaN(p) ? "" : utsFmt(p / divisor)) + "</td>"
                + '<td class="text-right">' + (isNaN(e) ? "" : utsLakh(e / divisor)) + "</td>"
                + "</tr>";
        });

        html += '<tr class="uts-total"><td></td><td colspan="2">Total</td>'
            + '<td class="text-right">' + utsFmt(sumT / divisor) + "</td>"
            + '<td class="text-right">' + utsFmt(sumP / divisor) + "</td>"
            + '<td class="text-right">' + utsLakh(sumE / divisor) + "</td></tr>";

        $("#posReportBody").html(html);

        // KPI = POS total / no. of days
        $("#kpiAvgTkt").text(utsFmt(sumT / divisor));
        $("#kpiAvgPsgn").text(utsFmt(sumP / divisor));
        $("#kpiAvgEarn").text(utsLakh(sumE / divisor));
    }, function (msg) {
        utsPosMessage("Unable to load POS report (" + msg + ")", "text-danger");
    });
}

/* ---------- 2) Terminals + locations (one report code) ---------- */

function loadUtsTermLocCounts() {
    var c = UTS_RPT_CFG.termLoc.col;

    $("#kpiTerminals, #kpiLocations").text("-");

    utsCall(UTS_RPT_CFG.termLoc, function (rows) {
        if (!rows.length) return;
        $("#kpiTerminals").text(utsFmt(rows[0][c.terminals]));
        $("#kpiLocations").text(utsFmt(rows[0][c.locations]));
    }, function () {
        $("#kpiTerminals, #kpiLocations").text("Error");
    });
}

/* ---------- 3) Stations (its own report code) ---------- */

function loadUtsStationCount() {
    var c = UTS_RPT_CFG.station.col;

    $("#kpiStations").text("-");

    utsCall(UTS_RPT_CFG.station, function (rows) {
        if (!rows.length) return;
        $("#kpiStations").text(utsFmt(rows[0][c.stations]));
    }, function () {
        $("#kpiStations").text("Error");
    });
}

/* ---------- Reload everything for a (new) range / zone ---------- */

function utsReloadAll(fromYmd, toYmd, zone) {
    if (fromYmd) utsFrom = fromYmd;
    if (toYmd) utsTo = toYmd;
    if (zone != null) utsZone = utsCleanZone(zone);

    if (!moment(utsFrom, "YYYY-MM-DD", true).isValid()) utsFrom = utsDefaultFrom();
    if (!moment(utsTo, "YYYY-MM-DD", true).isValid()) utsTo = utsDefaultTo();
    if (utsTo < utsFrom) utsTo = utsFrom;

    utsGen++;

    $("#utsFrom").val(utsFrom);
    $("#utsTo").val(utsTo);
    $("#utsZone").val(utsZone);

    utsUpdateHeading();
    loadUtsPosReport();
    loadUtsTermLocCounts();
    loadUtsStationCount();
}

/* ---------- Initialize ---------- */

$(document).ready(function () {
    // dashboard <-> Full Report view
    $(document).on("click", "#utsAIToggle", function (e) {
        e.preventDefault();
        utsSetFocus(!utsFocus);
    });

    // Full Report view: Apply button / Enter in the zone box
    $(document).on("click", "#utsApply", function () {
        utsReloadAll($("#utsFrom").val(), $("#utsTo").val(), $("#utsZone").val());
    });
    $(document).on("keydown", "#utsZone", function (e) {
        if (e.which === 13) {
            e.preventDefault();
            $("#utsApply").trigger("click");
        }
    });

    utsReloadAll();       // default: this FY till yesterday, zone ALL
});
