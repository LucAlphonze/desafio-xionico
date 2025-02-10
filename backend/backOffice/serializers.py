from rest_framework import serializers
from .models import User, Empresa, Ventas_Detalle, Producto, Vendedor, Ventas_Cabecera

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'
class Ventas_DetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas_Detalle
        fields = '__all__'
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = '__all__'
class Ventas_CabeceraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas_Cabecera
        fields = '__all__'