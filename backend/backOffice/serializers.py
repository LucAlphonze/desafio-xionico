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
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
class Ventas_CabeceraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas_Cabecera
        fields = '__all__'      

class Ventas_DetalleSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()  # Serializa el producto anidado
    venta_cabecera = Ventas_CabeceraSerializer()  # Serializa el producto anidado
    class Meta:
        model = Ventas_Detalle
        fields = ['cantidad', 'unidad_de_medida', 'producto', 'venta_cabecera']
        
class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = '__all__'

class ReporteVentasSerializer(serializers.ModelSerializer):
    empresa = EmpresaSerializer()  # Serializa la empresa anidada
    vendedor = VendedorSerializer()
    ventas_detalle = Ventas_DetalleSerializer(many=True, read_only=True, source='detalles_venta')
    class Meta:
        model = Ventas_Cabecera
        fields = ['fecha', 'empresa', 'vendedor', 'cliente', 'ventas_detalle']        