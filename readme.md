Guía para ejecutar la aplicación
Este repositorio contiene una aplicación web de prueba para el desafio enviado por Xionico, cuenta con un frontend desarrollado en Angular 16 (basado en la plantilla de admin de coreui) y un backend en Django 4.2. A continuación, te explico los pasos para correr la aplicación en tu entorno local utilizando Docker.

Requisitos previos
Tener Docker y Docker Compose instalados en tu máquina.

Si no los tienes, puedes seguir las instrucciones de instalación desde la documentación oficial:

Docker
Docker Compose
Pasos para ejecutar la aplicación

1. Clonar el repositorio
   Primero, debes clonar este repositorio en tu máquina local.
   git clone https://github.com/LucAlphonze/desafio-xionico.git
   cd desafio-xionico

2. Levantar los contenedores
   Para ejecutar la aplicación, se utiliza Docker Compose. Este comando construirá y levantará los contenedores necesarios para el frontend y el backend.

Ejecuta el siguiente comando para levantar los contenedores en segundo plano:
docker-compose up -d

3. Ejecutar el script para generar datos de prueba
   Una vez que los contenedores estén levantados, deberás poblar la base de datos con datos de prueba. Para ello, accede al contenedor del backend (rest-api) y corre el script que generará los datos de prueba.

Primero, entra al contenedor rest-api:
docker exec -it rest-api bash

Dentro del contenedor, navega al directorio donde se encuentra el script y ejecútalo:
python manage.py shell
from backOffice.generarDatosDePrueba import generar_datos_prueba
generar_datos_prueba()

4. Acceder a la aplicación
   Frontend: La aplicación de Angular estará corriendo en http://localhost:80. Solo abre esta URL en tu navegador para ver la interfaz de usuario.

Backend: El backend de Django estará corriendo en http://localhost:8000, donde manejará las peticiones de la API.

5. Detener los contenedores
   Cuando hayas terminado de trabajar con la aplicación, puedes detener los contenedores ejecutando el siguiente comando:
   docker-compose down
