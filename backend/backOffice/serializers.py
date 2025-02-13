from rest_framework import serializers
from .models import User, Empresa, Ventas_Detalle, Producto, Vendedor, Ventas_Cabecera

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = ['name', 'id']
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['name']
class Ventas_CabeceraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas_Cabecera
        fields = '__all__'      

class Ventas_DetalleSerializer(serializers.ModelSerializer):
    producto = serializers.SerializerMethodField()  # Serializa el producto anidado
    # venta_cabecera = Ventas_CabeceraSerializer()  # Serializa el producto anidado
    class Meta:
        model = Ventas_Detalle
        fields = ['cantidad', 'unidad_de_medida', 'producto']
    def get_producto(self, obj):
        return obj.producto.name   
        
class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = ['name', 'email', 'empresa', 'telefono', 'direccion', 'id']

class ReporteVentasSerializer(serializers.ModelSerializer):
    empresa = serializers.SerializerMethodField()  # Serializa la empresa anidada
    vendedor = serializers.SerializerMethodField()
    ventas_detalle = Ventas_DetalleSerializer(many=True, read_only=True, source='detalles_venta')
    class Meta:
        model = Ventas_Cabecera
        fields = ['fecha', 'empresa', 'vendedor', 'cliente','importe' , 'ventas_detalle','lat', 'long']
    def get_vendedor(self, obj):
        return obj.vendedor.name
    def get_empresa(self, obj):
        return obj.empresa.name