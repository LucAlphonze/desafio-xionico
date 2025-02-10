from django.db import models

class User(models.Model):
    userName = models.CharField(max_length=20)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=20)

class Empresa(models.Model):
    name = models.CharField(max_length=40)

class Vendedor(models.Model):
    name = models.CharField(max_length=40)
    empresa = models.ForeignKey(Empresa, null=True, on_delete=models.SET_NULL)

class Producto(models.Model):
    name = models.CharField(max_length=200)
    descripcion = models.CharField(max_length=200)

class Ventas_Cabecera(models.Model):
    empresa = models.ForeignKey(Empresa, null=True, on_delete=models.SET_NULL)
    vendedor = models.ForeignKey(Vendedor, null=True, on_delete=models.SET_NULL)
    fecha = models.DateField(auto_now_add=True)
    cliente = models.CharField(max_length=20)
    importe = models.IntegerField()
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    long = models.DecimalField(max_digits=9, decimal_places=6)


class Ventas_Detalle(models.Model):
    producto = models.ForeignKey(Producto, null=True, on_delete=models.SET_NULL)
    unidad_de_medida = models.CharField(max_length=20)
    cantidad = models.IntegerField()
    venta_cabecera = models.ForeignKey(Ventas_Cabecera, null=True, on_delete=models.SET_NULL)


# Create your models here.
