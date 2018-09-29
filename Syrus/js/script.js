var latlngs = [];
var polvector=[];
var items = [];
var latlng1 = [];
var latSeparado=[];
var lonSeparado=[];
var latSeparadoMarcador=[];
var lonSeparadoMarcador=[];
var fechaSeparado=[];
var latlngRectangulo =[];
var radioGlob = [];
var FechasDistanciaMenor=[];
var CoordenadasDistanciaMenor=[];
var FechaString = [];
var sw=1;
var swp =1;

var map = L.map('map', {drawControl: true,
  'center': [11.01963, -74.85163],
  'zoom': 12
});
var sidebar = L.control.sidebar('sidebar',{position: 'right'}).addTo(map);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#95a5a6",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var geojsonMarkerOptions1 = {
    radius: 5,
    fillColor: "#f1c40f",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var geojsonMarkerOptions2 = {
    radius: 3,
    fillColor: "#2c3e50",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var realtime = L.realtime({
        url: 'js/geo.json',
        crossOrigin: true,
        type: 'json'
    }, {
        interval: 3 * 1000,
        pointToLayer: function (feature, latlng) {
        		return L.circleMarker(latlng, geojsonMarkerOptions)
        	}
    }).addTo(map);


realtime.on('update', function() {

		var fecha = document.getElementById("FechaV");
	  	var latitud = document.getElementById("LatitudV");
		var longitud = document.getElementById("LongitudV");
		
		$.post("js/consulta.php"),
		$.post("php/consulta.php",
		    {
		        id: 1
		    },
		function(data1, status){
		    	
		    	if (data1!="") {
		    		fecha.value = data1;
		    	}
		        
		});
    	$.post("php/consulta.php",
	    {
	        id: 2
	    },
	    function(data2, status){
	    	
	    	if (data2!="") {
	    		latitud.value = data2;
	    	}
	    });
	    $.post("php/consulta.php",
	    {
	        id: 3
	    },
	    function(data3, status){
	    	
	    	if (data3!="") {
	    		longitud.value = data3;
	    	}
	    });
	latlngs.push ([parseFloat(latitud.value),parseFloat(longitud.value)]);
	if(sw==1){
		map.panTo(new L.LatLng(parseFloat(latitud.value),parseFloat(longitud.value)));
		sw =0;
	}
	var polyline = L.polyline(latlngs, {color: 'blue',weight: 1, smoothFactor: 1}).addTo(map);
});


$('#startdatetime-from').datetimepicker({
language: 'en',
format: 'yyyy-MM-dd hh:mm'
});
$(function(){  
	$("#from_date").datetimepicker();  
	$("#to_date").datetimepicker();  
	});  


map.on('contextmenu', function(e) {
		var lat1 = e.latlng.lat;
   		var lon1 = e.latlng.lng;
   		var marcador = new L.Marker(e.latlng,{
   			draggable: true,
   			riseOnHover: true
   		}).addTo(map)
   		  .bindPopup(lat1+","+lon1).openPopup();
   		  if(swp==0){
   		  	recorridoParaDistancias(lat1,lon1);
   		  }	
	});


var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);



map.on(L.Draw.Event.CREATED, function (e) {
	var layer = e.layer;
    var tipo = e.layerType;
    if (tipo === 'marker') {
    	swal("¡Intenta presionando el mapa!");
    }
    else if (tipo === 'circle') {

        var theCenterPt = layer.getLatLng();
        var centro = [theCenterPt.lng,theCenterPt.lat]; 
        var centroLat = theCenterPt.lat; 
        var centroLon = theCenterPt.lng;
        console.log(centroLat);
        console.log(centroLon);
        var radio = layer.getRadius();
        radioGlob=[];
        radioGlob.push(radio);
        console.log(radio);
        editableLayers.addLayer(layer);
        if(swp==0){
        	recorridoParaDistancias(centroLat,centroLon);
        }	  
        
    }else if (tipo === 'circlemarker') {
    	swal("Lo sentimos, seguimos trabajando en esto :(");
    }else if (tipo === 'rectangle'){
    	editableLayers.addLayer(layer);
    	latlngRectangulo.push(layer.getLatLngs());
    }
});


function ColumnasCoordenadas(){
  for (var i = 0; i < CoordenadasDistanciaMenor.length; i++) {
  	var k = CoordenadasDistanciaMenor[i];
  	var h = FechasDistanciaMenor[i];
  	var sw_1 = 0;
  	if(sw_1 == 0){
  		var row = $("<tr>");
  		row.append($("<td>"+k+"</td>"))
  		.append($("<td>"+h+"</td>"))
  		$("#order_table_container tbody").append(row);
  		sw_1 = 1;
  	}
  }
 }


function consultD(){
 var geojsonLayer = L.geoJson.ajax('Colombia.geo.json', {
   onEachFeature: function(data, layer) {
     items.push(layer);
     layer.bindPopup('<h3>' + data.properties.park + '</h3>');
   }
 });
 geojsonLayer.addTo(map);
}
function mouseOver() {
    document.getElementById("puntero").style.color = "red";
    for (var i = 0; i < lonSeparadoMarcador.length; i++) {
    var marcadorMouseOver = new L.circleMarker([parseFloat(latSeparadoMarcador[i]), parseFloat(lonSeparadoMarcador[i])],geojsonMarkerOptions2,{
       			riseOnHover: true
       		}).addTo(map).bindPopup("Latitud:"+ latSeparadoMarcador[i]+","+"Longitud:"+ lonSeparadoMarcador[i]+" "+ FechasDistanciaMenor[i]);
    		marcadorMouseOver.on('mouseover', function (e) {
                this.openPopup();
            });
            marcadorMouseOver.on('mouseout', function (e) {
                this.closePopup();
            });
    }
}


function mouseOut() {
    document.getElementById("puntero").style.color = "black";
}
function consultH(){  

	var from_date = $('#from_date').val();  
	var to_date = $('#to_date').val(); 
	var comparacion = (from_date > to_date); 
		if(comparacion)  
		{  
			swal("La fecha "+from_date+" debe ser menor a "+to_date+ ". Por favor digite nuevamente");
		}  
		else if (from_date != '' && to_date != '') {
			$.ajax({  
				url:"php/filter.php",  
			    method:"POST",  
			    data:{from_date:from_date, to_date:to_date, opcion:0},  
			    success:function(data)  
			    {  
			    	$('#order_table').html(data);  
			    }
			});

			$.ajax({  
				url:"php/filter.php",  
			    method:"POST",  
			    data:{from_date:from_date, to_date:to_date, opcion:1},  
			    success:function(data)  
			    {  
							
							var dat=JSON.parse(data);
							var cont=0;
							var len=dat.length;

							while(cont<len){
								polvector.push ([parseFloat(dat[cont]["latitud"]),parseFloat(dat[cont]["longitud"])]);
								latSeparado.push(parseFloat(dat[cont]["latitud"]));
								lonSeparado.push(parseFloat(dat[cont]["longitud"]));
								fechaSeparado.push(dat[cont]["fecha"]);
								var polyline1 = L.polyline(polvector, {color: 'red',weight: 1, smoothFactor: 1}).addTo(map);
								cont ++;
								swp=0;
							}

			    			
			    }
			});

		}else 
			{  
				swal("Seleccione una fecha");  
			}  
	};  

function recorridoParaDistancias(latitudAux,longitudAux) {
  var latAux=parseFloat(latitudAux);
  var lonAux=parseFloat(longitudAux);
  var distancia=[];
  CoordenadasDistanciaMenor =[];
  FechasDistanciaMenor =[];
  latSeparadoMarcador=[];
  lonSeparadoMarcador=[];
  for (var i = 0; i < latSeparado.length; i++) {
    distancia.push(calcularDistancia(latAux,lonAux,latSeparado[i],lonSeparado[i]));
    if (distancia[i]<radioGlob) {
    		latSeparadoMarcador.push(latSeparado[i]);
    		lonSeparadoMarcador.push(lonSeparado[i]);
    		CoordenadasDistanciaMenor.push([latSeparado[i],lonSeparado[i]]);
    		FechasDistanciaMenor.push(fechaSeparado[i]);
    }
  }
ColumnasCoordenadas();
var distanciaMenor=Math.min(...distancia);
function distanciaMinima (element) {
  return element == distanciaMenor;
}
  var distanciaMenor=distancia.findIndex(distanciaMinima);
  var longitudMenorFinal=lonSeparado[distanciaMenor];
  var latitudMenorFinal=latSeparado[distanciaMenor];
  for (var i = 0; i < latSeparado.length; i++) {
    if (latitudMenorFinal == latSeparado[i] && longitudMenorFinal==lonSeparado[i]) {
    	c = i;
    }
  }
  var marcador = new L.circleMarker([latitudMenorFinal, longitudMenorFinal],geojsonMarkerOptions1,{
   			draggable: true,
   			riseOnHover: true
   		}).addTo(map).bindPopup("Latitud:"+ latitudMenorFinal+","+"Longitud:"+ longitudMenorFinal+" Fecha:"+fechaSeparado[c]).openPopup();
}

function calcularDistancia(lat1,lon1,lat2,lon2){
var R = 6371e3; 
var phi1 = ToRadian(lat1);
var phi2 = ToRadian(lat2);
var phi = ToRadian(lat2-lat1);
var lambda = ToRadian(lon2-lon1);
var a = Math.sin(phi/2) * Math.sin(phi/2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(lambda/2) * Math.sin(lambda/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;
return d;
}
function ToRadian(deg) {
    return deg * Math.PI / 180;
};
