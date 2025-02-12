from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.decorators import api_view
from .models import User, Empresa, Producto, Vendedor, Ventas_Cabecera, Ventas_Detalle
from .serializers import ReporteVentasSerializer, UserSerializer, VendedorSerializer, EmpresaSerializer, ProductoSerializer, Ventas_DetalleSerializer, Ventas_CabeceraSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ReporteVentasFilter

# Create your views here.
class UserDetail (generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserList (generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class VendedorDetail (generics.RetrieveUpdateDestroyAPIView):
    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer

class VendedorList (generics.ListCreateAPIView):
    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer
    
class EmpresaDetail (generics.RetrieveUpdateDestroyAPIView):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class EmpresaList (generics.ListCreateAPIView):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoList (generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ReporteVentasList(generics.ListAPIView):
    queryset = Ventas_Cabecera.objects.all() # Queryset inicial (puedes optimizarlo)
    serializer_class = ReporteVentasSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReporteVentasFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.select_related('empresa', 'vendedor').prefetch_related('detalles_venta', 'detalles_venta__producto')

        return queryset


class Ventas_CabeceraDetail (generics.RetrieveUpdateDestroyAPIView):
    queryset = Ventas_Cabecera.objects.all()
    serializer_class = Ventas_CabeceraSerializer

class Ventas_CabeceraList (generics.ListCreateAPIView):
    queryset = Ventas_Cabecera.objects.all()
    serializer_class = Ventas_CabeceraSerializer

class Ventas_DetalleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ventas_Detalle.objects.all()
    serializer_class = Ventas_DetalleSerializer

class Ventas_DetalleList (generics.ListCreateAPIView):
    queryset = Ventas_Detalle.objects.all()
    serializer_class = Ventas_DetalleSerializer

class BackOfficeViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = User
