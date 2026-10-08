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
	//$("#secTableDiv").hide();
	//$("#resultID").hide();
	listFilter =[];
	
	
	wsContextPath = "/newtemplatebasedmis";
	//if(checkInputs(reportCode)){	
		//sendObject = reqParams;
				
		getWebServiceDatautsDashboard(sendObject,weburl,function(result){
			tabObjList = [];
			dataToExpoExl = [];
			console.log(result);
			var isRecordPresent = (result.data != null && result.data.length > 0) ? true :false;
			$('BSJSONData').val("{}");
		     if(isRecordPresent){		    	 
				 isSearchEnable =true;
				 //formatColumns(sendObject,result);
				 var json =result;
				 $('#BSJSONData').val(JSON.stringify(result));
				 $('#DR4').val(JSON.stringify(sendObject));
				 //$("#BSJSONData").val(JSON.stringify(json));
				
				
				 switch(sendObject["reportCode"]){
				
				
				
				
				
				
				
//				
				
				
				case "UTSDASHBOARD":
console.log(result.data);


var fromdate = new Date();
fromdate.setFullYear(fromdate.getFullYear()-1);
var yearLeapNotLeap=fromdate.getFullYear();
var aa=checkLeapYear(yearLeapNotLeap);
console.log(aa);
if(aa==1)
	{
	//fromdate.setFullYear(fromdate.getFullYear()-1);
	fromdate.setDate(fromdate.getDate()-18);
	console.log(fromdate);
	var fDate=formatDate(fromdate);
	}
else
	{
	//fromdate.setFullYear(fromdate.getFullYear()-1);
	fromdate.setDate(fromdate.getDate()-18);
	console.log(fromdate);
	var fDate=formatDate(fromdate);
	}

/*fromdate.setFullYear(fromdate.getFullYear()-1);
fromdate.setDate(fromdate.getDate()-18);
console.log(fromdate);
var fDate=formatDate(fromdate);*/
//fromdate=formatDate(fromdate);
//fromdate=($.datepicker.formatDate("yy-mm-dd",fromdate));
var todate = new Date();
todate.setFullYear(todate.getFullYear()-1);
todate.setDate(todate.getDate()-4);
//formatDate(fromdate);
//console.log(fromdate);
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
					//fromdate.setFullYear(fromdate.getFullYear()-1);
					fromdate.setDate(fromdate.getDate()-4);
					console.log(fromdate);
					var fDate=formatDate(fromdate);
					//fromdate=formatDate(fromdate);
					//fromdate=($.datepicker.formatDate("yy-mm-dd",fromdate));
				
					reportZoneParams.push("'"+fDate+"'");
					sendObjectZone={"reportCode":"getZoneMapReport_uts","params":reportZoneParams};
					getWebServiceDatautsDashboard(sendObjectZone,weburl,function(resultZone){
					 	console.log(resultZone);
					 	isRecordPresent = (resultZone.data != null && resultZone.data.length > 0) ? true :false;
					 	if(isRecordPresent){
					  
					   jsonZone={"current":resultZone,"last":null};
					  // $('#BSJSONDataLast').val(JSON.stringify(resultLast));
					   
					   var fromdate = new Date();
					   fromdate.setFullYear(fromdate.getFullYear()-1);
					   //fromdate.setDate(fromdate.getDate()-18);
					   console.log(fromdate);
					   var fDate=formatDate(fromdate);
						//fromdate=formatDate(fromdate);
						//fromdate=($.datepicker.formatDate("yy-mm-dd",fromdate));
					
					   reportZoneParams2.push("'"+fDate+"'");
					   sendObjectZone2={"reportCode":"getZoneMapReport_uts","params":reportZoneParams2};
						getWebServiceDatautsDashboard(sendObjectZone2,weburl,function(resultLastZone){
						 	console.log(resultLastZone);
						 	isRecordPresent = (resultLastZone.data != null && resultLastZone.data.length > 0) ? true :false;
						 	if(isRecordPresent){
						 		 jsonZone.last=resultLastZone;
						   //$('#BSJSONDataLast').val(JSON.stringify(resultLast));
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

					/*for(let i=0;i<result.data.length;i++){
						
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
									    sheetPadClick("E");*/
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
				// $('html,body').animate({scrollTop: $("#columnList").offset().top},'slow');
			 }else{
				
				
			    	 showAlert("Record not found!", 'danger');
				     $("#resultID").hide();
				     	
					 
		     }
		});
	//}
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
       $("#table_1").hide();
      // alert("P");
       
	    
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
       $("#table_1").hide();
       //alert("T");
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
   			//alert("pad===="+pad);
	    	$("#favigraph_totalTotalEarnings").show();
	        $("#favitable_totalTotalEarnings").show();
	        
	        $("#favigraph_netTicketsBooked").hide();
		    $("#favitable_netTicketsBooked").hide();
		    $("#favigraph_totalNetPassengers").hide();
		    $("#favitable_totalNetPassengers").hide();
		    $("#table_1").hide();
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
 		  $("#table_1").hide();
 		  //alert("E2");
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
	//sheetPadClick("E");
	//alert("Total  Earning");
	let strLines = JSON.parse($("#BSJSONData").val());
	console.log(strLines);
	let strLinesLast = JSON.parse($("#BSJSONDataLast").val());
	console.log(strLinesLast);
	let currentYearEarning = strLines.data;
	console.log(currentYearEarning);
	let lastYearEarning = strLinesLast.data;
	console.log(lastYearEarning);
	console.log(currentYearEarning);
	console.log(lastYearEarning);
	for (var i = 0; i < currentYearEarning.length; i++) {
		var obj = currentYearEarning[i];
		//console.log(obj.earning);

		var tdirect = lastYearEarning[i];
		var ddmm = obj[1];
		console.log(ddmm);
		const words = ddmm.split("-");
		const datemonth = words[1] + "-" + words[2];

		var tble = "<tr><td>" + datemonth + "</td><td>" + obj[2]
				+ "</td><td>" + tdirect[2] + "</td></tr>";
		$("#tblrdata").append(tble);

	}
	console.log("-----------------");

	$("#chart_1").hide();
	$("#table_1").show();

}
function table_netTicketsBooked() {
	//sheetPadClick("T");
	$("#tblrdata").html("");
	//alert("net ticket booked");
	let strLines = JSON.parse($("#BSJSONData").val());
	let strLinesLast = JSON.parse($("#BSJSONDataLast").val());
	console.log(strLines);
	let currentYearEarning = strLines.data;
	let lastYearEarning = strLinesLast.data;
	console.log(currentYearEarning);
	console.log(lastYearEarning);
	for (var i = 0; i < currentYearEarning.length; i++) {
		var obj = currentYearEarning[i];
		//console.log(obj.netTktsBkd);

		var tdirect = lastYearEarning[i];
		var ddmm = obj[1];
		console.log(ddmm);
		const words = ddmm.split("-");
		const datemonth = words[1] + "-" + words[2];

		var tble = "<tr><td>" + datemonth + "</td><td>" + obj[4]
				+ "</td><td>" + tdirect[4] + "</td></tr>";
		$("#tblrdata").append(tble);

	}
	console.log("-----------------");

	$("#chart_1").hide();
	$("#table_1").show();

}

function table_totalNetPassengers() {
	//sheetPadClick("P");
	$("#tblrdata").html("");
	//alert("net Passenger booked");
	let strLines = JSON.parse($("#BSJSONData").val());
	let strLinesLast = JSON.parse($("#BSJSONDataLast").val());
	console.log(strLines);
	let currentYearEarning = strLines.data;
	let lastYearEarning = strLinesLast.data;
	console.log(currentYearEarning);
	console.log(lastYearEarning);
	for (var i = 0; i < currentYearEarning.length; i++) {
		var obj = currentYearEarning[i];
		//console.log(obj.netPsgBkd);

		var tdirect = lastYearEarning[i];
		var ddmm = obj[1];
		console.log(ddmm);
		const words = ddmm.split("-");
		const datemonth = words[1] + "-" + words[2];

		var tble = "<tr><td>" + datemonth + "</td><td>" + obj[3]
				+ "</td><td>" + tdirect[3] + "</td></tr>";
		$("#tblrdata").append(tble);

	}
	console.log("-----------------");

	$("#chart_1").hide();
	$("#table_1").show();

}
function setAllIndiaData(result){
	//var allIndiaObj = result.current[(result.current.length)-1];
	var allIndiaObj = result.data;//[(result.current.length)-1];
	// added by renu
	//showAlert(result,'warning');
	console.log(result.data[17][2]);
	//$("#currentm1").html("<font class='counter' style=font-family:'digital-clock-font';>" + allIndiaObj.tktbkd.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</font><font>" + "</font>");
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
   // alert("filterAllIndiaData"+ match);
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
	//alert(d.toISOString().substr(0,10));
    getWebServiceData(sendObject,"graph/getAllZoneData_uts",function(result) {
    	
    	//var currData = filterAllIndiaData(zonecd,result.currData);
        //var prevData = filterAllIndiaData(zonecd,result.previousYData);
        zwData = getZWCombData(resultLastZones,resultZone,cols);
        
        createTableByTableIdAndData(zwData,"zoneWiseTable","blank");
        $("#zoneWiseTable_wrapper .row").css("display", "none");
        App.unblockUI("#reportZWBody");
    });
    $("#reportZWBody").show(200);
});
/*function getZWCombData(prevData,currData,cols){
	var arr = [];
	arr.push({"tktbkd":"1.Tickets Booked: ","tktbkdP":resultLastZone[2],"tktbkdC":resultZone[2]});
	arr.push({"tktbkd":"2.Tickets Cancelled: ","tktbkdP":resultLastZone[3],"tktbkdC":resultZone[3]});
	arr.push({"tktbkd":"3.Passengers Booked: ","tktbkdP":resultLastZone[4],"tktbkdC":resultZone[4]});
	arr.push({"tktbkd":"4.Passengers Cancelled: ","tktbkdP":resultLastZone[5],"tktbkdC":resultZone[5]});
	arr.push({"tktbkd":"5.Gross Earning: ","tktbkdP":resultLastZone[6],"tktbkdC":+resultZone[6]});
	arr.push({"tktbkd":"6.Refund: ","tktbkdP":+resultLastZone[7],"tktbkdC":+resultZone[7]});
	arr.push({"tktbkd":"7.Net Earning: ","tktbkdP":+resultLastZone[8],"tktbkdC":+resultZone[8]});
	return {"columnNames":cols,"data":arr};
}*/
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