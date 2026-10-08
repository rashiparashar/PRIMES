<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page session="true"%>
<script
	src="<c:url value="/resources/assets/global/plugins/moment.min.js" />"
	type="text/javascript"></script>
<script>
var currDate = moment().format("YYYY-MM-DD");
var contextPath = '<%=request.getContextPath()%>';
	$(document).ready(function() {
		$("#liHome").addClass("nav-item active open");
		$('#sidebarTogglerDiv').click();
	});
</script>
<!-- BEGIN PAGE LEVEL PLUGINS -->
<link
	href="<c:url value="/resources/assets/global/plugins/typeahead/typeahead.css" />"
	rel="stylesheet" type="text/css" />
<!--USING -->
<link
	href="<c:url value="/resources/assets/global/plugins/bootstrap-toastr/toastr.min.css"/>"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/resources/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css"/>"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/resources/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/resources/assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/resources/assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css"/>"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/resources/assets/global/plugins/clockface/css/clockface.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/resources/assets/global/plugins/morris/morris.css"/>"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/resources/assets/global/plugins/fullcalendar/fullcalendar.min.css"/>"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/resources/assets/global/plugins/jqvmap/jqvmap/jqvmap.css"/>"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/resources/assets/global/plugins/bootstrap-sweetalert/sweetalert.css"/>"
	rel="stylesheet" type="text/css" />
<script src="<c:url value="/resources/js/js.cookie.js"  />"
	type="application/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<style>
#fade {
	display: none;
	position: absolute;
	top: 0%;
	left: 0%;
	width: 100%;
	height: 270%;
	background-color: #ababab;
	z-index: 1001;
	-moz-opacity: 0.8;
	opacity: .70;
	filter: alpha(opacity = 80);
}

#modal {
	display: none;
	position: absolute;
	top: 45%;
	left: 45%;
	width: 64px;
	height: 64px;
	padding: 5px 5px 0px;
	border: 3px solid #ababab;
	box-shadow: 1px 1px 10px #ababab;
	border-radius: 20px;
	z-index: 1002;
	text-align: center;
	overflow: auto;
}

.card {
	padding: 0px;
}

.dashboard-stat {
	margin-bottom: 10px;
}

.no-padding {
	padding-left: 0px !important;
	padding-right: 0px !important;
}

@media only screen and (max-width: 768px) {
	.no-padding {
		padding-left: 15px !important;
		padding-right: 15px !important;
	}
	.portlet {
		margin-bottom: 7px !important;
	}
	.number {
		padding-top: 0px !important;
	}
	.visual {
		height: 35px !important;
	}
	.loaderSize {
		width: 10%;
		height: 10%;
	}
	.sheetPadLeftBorder {
		border-right: 5px solid white;
	}
	#over img {
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
}
</style>


<sec:authorize access='hasAuthority("SPLHOME")'>
	
		<jsp:include page="homespl.jsp" />  
	

</sec:authorize>
<sec:authorize access='hasAuthority("UTS DASHBOARD")'>

		<jsp:include page="utsDashboard.jsp" /> 


</sec:authorize>

<script>
	var notification = "${notification}";
	$(document).ready(function() {
		$('#clickmewow').click(function() {
			$('#radio1003').attr('checked', 'checked');
		});

	})
</script>
<script>
	$(document).ready(function() {
		$('[data-toggle="tooltip"]').tooltip();
	});
</script>

</body>
</html>