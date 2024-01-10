function initMap() {

	//var dammam = {
	//	info: '<h5>مقر شركة "مُكـد" (الدمام)</h5>\r\
	//				<p class="mapp">3640 الملك فيصل شارع الخالدية,<br>\
	//				الدمام 31411، المنطقة الشرقية،<br>\
	//				صندوق البريد 30، المملكة العربية السعودية.</p>\r\
	//				<p><span class="tel"><a href="tel:+966138455555"><bdo dir="ltr">+966 13 845 5555</bdo></a></span><span class="fax"><a href="JavaScript:void(0);"><bdo dir="ltr">+966 13 845 5556</bdo></a></span></p>\r\
	//				<p><span class="mail"><a href="mailto:info@muhaidib.com">info@muhaidib.com</a></span><span class="direction"><a href="https://www.google.com/maps/dir//AlMuhaidib+Group,+King+Faisal+Coastal+Road,+St,+Salman+Al+Farsi,+Dammam+32221/@26.4132129,50.1692456,17z/" target="_blank">الحصول على الاتجاهات</a></span></p>',
	//	lat: 26.413215,
	//	long: 50.171375
	//};

	//var riyadh = {
	//	info: '<h5>مُنفّت (الرياض)</h5>\r\
	//				<p class="mapp">شارع يثرب، الفلاح،<br>\
	//				صندوق البريد 245030، الرياض 11312،<br>\
	//			المملكة العربية السعودية.</p>\r\
	//				<p><span class="tel"><a href="tel:+966112636000"><bdo dir="ltr">+966 11 263 6000</bdo></a></span><span class="fax"><a href="JavaScript:void(0);"><bdo dir="ltr">+966 11 274 2266</bdo></a></span></p>\r\
	//				<p><span class="direction"><a href="https://www.google.com/maps/dir//Al+Muhaidib+Regional+Office,+Yathrib+St.,+Al+Falah%D8%8C+Al+Falah,+Riyadh+13314%E2%80%AD%E2%80%AD/@24.7980776,46.6834451,13z/" target="_blank">الحصول على الاتجاهات</a></span></p>',
	//	lat: 24.798019,
	//	long: 46.718464
	//};
	
	//var jeddah = {
	//	info: '<h5>مُنفّد (جدة)</h5>\r\
	//				<p class="mapp">6936 حائل، أر روضة،<br>\
	//				صندوق البريد 16197، جدة 21464،<br>\
	//				المملكة العربية السعودية.</p>\r\
	//				<p><span class="tel"><a href="tel:+966126014000"><bdo dir="ltr">+966 12 601 4000</bdo></a></span><span class="fax"><a href="JavaScript:void(0);"><bdo dir="ltr">+966 12 6173333</bdo></a></span></p>\r\
	//				<p><span class="direction"><a href="https://www.google.com/maps/dir//Al-Muhaidib+Group,+6936+Hail,+Ar+Rawdah,+Jeddah+23431%C2%A03036/@21.5568592,39.1503918,17z/" target="_blank">الحصول على الاتجاهات</a></span></p>',
	//	lat: 21.556911,
	//	long: 39.152660
	//};

	//var locations = [
 //     [dammam.info, dammam.lat, dammam.long, 0],
 //     [riyadh.info, riyadh.lat, riyadh.long, 1],
 //     [jeddah.info, jeddah.lat, jeddah.long, 2],
    //   ]; 
    var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 5,
		center: new google.maps.LatLng(23.3393721, 44.7565823),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow({});
	
	var icon = {
		url: "/images/svg/location-icon.svg", // url
		scaledSize: new google.maps.Size(52, 55) // scaled size
		//origin: new google.maps.Point(0,0), // origin
		//anchor: new google.maps.Point(0, 0) // anchor
	};

	var marker, i;
    debugger;
	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
			icon: icon
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})
		
		(marker, i));
		  var styles = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#e7ecf0"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#0f2d52"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#636c81"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ecf2f3"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#496271"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -70
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c3d7d9"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#898e9b"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b3ccce"
            }
        ]
    }
];

        map.set('styles', styles);
		
	}
	
}
