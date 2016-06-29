function initialize(){
	var mapProp ={
		center: new google.maps.LatLng(21.475, 105.355),//các định vĩ độ kinh độ
		zoom: 9,
		mapTypeID:google.maps.MapTypeId.ROADMAP//bản đồ 2D bình thường
	};
	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);//tạo 1 bản đồ mới trong phần div có id là googleMap với thông số mapProp
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(22.20, 103.49),
		title: "Sapa",
		icon: "../views/img/marker_1.png"
	});
	marker.setMap(map);
	var contentStr = '<div>' + '<h2><a href="http://www.sapagroup.com/">Sapa</a></h2>' + '<p>Sapa là một địa điểm du lịch nổi tiếng của VN</p>' ;
	var info_1 = new google.maps.InfoWindow({
		content: contentStr,
		maxWidth: 400
	});
	info_1.open(map, marker);
};
google.maps.event.addDomListener(window, 'load', initialize); //tạo event listener để load map

// $(document).ready(function(){
// 	  $('#googleMap').hide();
// 	  $('#map').click(function(){
// 	  		$('#googleMap').toggle();
// 	  });
// });