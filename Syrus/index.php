<?php
$hostname_localhost="samuel.cweptlsnnz8c.us-east-1.rds.amazonaws.com";
$database_localhost="diseno";
$username_localhost="samgj18";
$password_localhost="241612Sa";

$conexion = mysqli_connect($hostname_localhost,$username_localhost,$password_localhost,$database_localhost);
		
$consulta="SELECT * FROM diseno2 WHERE id=(SELECT MAX(id) FROM diseno2)";
$resultado=mysqli_query($conexion,$consulta);
$registro = mysqli_fetch_array($resultado);
mysqli_close($conexion);

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.3/dist/leaflet.css" />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie-edge">
	<link rel="stylesheet" href="Estilos/Estilo.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
	<title>Quienes Somos</title>
	
	
	

<body>
	
	<header>
		<div class="textos" >
			<h1 class="titulo">Electronic Design</h1>
			<blockquote cite="http://example.com/facts" class="subtitulo">
				<i><p>No tengo talentos especiales, pero sí soy profundamente curioso.</p> </i>
			</blockquote>
		
		<div class="sesgo-abajo"></div>
		</div>
	</header>
	<main>
		<section class="acerca-de">
			<section class ="contenedor">
				<div>
				<h2 class="sobre-nosotros">
					
					<h3 class="slogan">Diseño Electrónico</h3>
						
					<p class="parrafo">
						Diseño electrónico es el arte de crear, transformar o resolver un problema, dentro del campo de la electrónica. El Diseño Electrónico estimula el funcionamiento, la creatividad e ingenio del diseñador electrónico.
						En el diseño electrónico, a grandes rasgos; el hardware cumple funciones tales como obedecer las órdenes del firmware, sensar, monitorear y almacenar información, transmistir las señales eléctricas para las comunicaciones con otros dispositivos, etc.; el firmware se encarga de obedecer las órdenes del software, tomar decisiones de prioridad de acuerdo a las jerarquías que se hayan programado para dar órdenes al hardware, enviar la información sensada por el hardware al software de manera que éste la puede reconocer e interpretar del mismo modo, también se encarga de llevar/traducir las órdenes del software al hardware, etc.; y el software es el que muestra la interfaz de usuario, lleva a cabo las tareas de procesamiento macro como por ejemplo analizar la información y tomar decisiones, controlar procesos, actualizar protocolos, etc.Por lo general el software se encuentra instalado en computadoras o servidores o sistemas compatibles que incluso tienen acceso a la red de internet para enviar información o actualizar a los usuarios. 
					</p>
					<a href="mailto:samuelgomez@uninorte.edu.co" class="boton">Escríbenos</a>
				</h2>
				</div>
			</section>
		</section>
		<section class="galeria">
			<div class="sesgo-arriba"></div>
			<div class="imagenes">
				<img src="Imagenes/3.jpg"alt="">
			</div>
			<div class="imagenes">
				<img src="Imagenes/2.jpg"alt="">
			</div>	
			<div class="imagenes">
				<img src="Imagenes/1.jpg"alt="">
				<div class="encima">
					<h2>
						Electronic Design
					</h2>
				</div>
			</div>
			<div class="imagenes">
				<img src="Imagenes/4.jpg"alt="">
			</div>
			<div class="imagenes">
				<img src="Imagenes/5.jpg"alt="">
			</div>
		
		</section>
		
	<footer>

		<div class="footer">
			<h2 class="titulo-footer">
				No olvides contactarnos para cualquier sugerencia.
			</h2>
			<h3 class="subtitulo-footer">
				¡Lo apreciaríamos mucho!
			</h3>
			<div class="subtitulo-footer">
				<form action="F2.php" method="post" >
					<input class="sugerencia" type="text" name="nombre" placeholder="Nombre">					
					<input class="sugerencia" type="text" name="correo" id="correo" placeholder="Email">				
					<textarea class="sugerencia"name="descripcion" cols="30" rows="10"></textarea>
					<input type="submit" name="boton" value="Submit" placeholder="Ingrese su mensaje">
				</form>			
			</div>
		</div>
	</footer>

</body>
</html>