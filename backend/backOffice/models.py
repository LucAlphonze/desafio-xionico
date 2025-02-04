from django.db import models
from django.contrib.gis.geos import Point

class User(models.Model):
    userName = models.CharField(max_length=20)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=10)

class Empresa(models.Model):
    name = models.CharField(max_length=20)

class Vendedor(models.Model):
    name = models.CharField(max_length=20)
    empresa = models.ForeignKey(Empresa, null=True, on_delete=models.SET_NULL)

class Producto(models.Model):
    name = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)

class Ventas_Cabecera(models.Model):
    empresa = models.ForeignKey(Empresa, null=True, on_delete=models.SET_NULL)
    vendedor = models.ForeignKey(Vendedor, null=True, on_delete=models.SET_NULL)
    fecha = models.DateField(auto_now=True)
    cliente = models.CharField(max_length=20)
    importe = models.IntegerField()
    gps = Point()

class Ventas_Detalle(models.Model):
    producto = models.ForeignKey(Producto, null=True, on_delete=models.SET_NULL)
    unidad_de_medida = models.CharField(max_length=20)
    cantidad = models.IntegerField()


# Create your models here.
