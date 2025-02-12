from django.urls import re_path
from . import views

urlpatterns = [
  re_path(r'^user/$',views.UserList.as_view()),
  re_path(r'^user/(?P<pk>[0-9]+)$', views.UserDetail.as_view()),
  re_path(r'^vendedor/$',views.VendedorList.as_view()),
  re_path(r'^vendedor/(?P<pk>[0-9]+)$', views.VendedorDetail.as_view()),
  re_path(r'^empresa/$',views.EmpresaList.as_view()),
  re_path(r'^empresa/(?P<pk>[0-9]+)$', views.EmpresaDetail.as_view()),
  re_path(r'^producto/$',views.ProductoList.as_view()),
  re_path(r'^producto/(?P<pk>[0-9]+)$', views.ProductoDetail.as_view()),
  re_path(r'^ventas_cabecera/$',views.Ventas_CabeceraList.as_view()),
  re_path(r'^ventas_cabecera/(?P<pk>[0-9]+)$', views.Ventas_CabeceraDetail.as_view()),
  re_path(r'^ventas_detalle/$',views.Ventas_DetalleList.as_view()),
  re_path(r'^ventas_detalle/(?P<pk>[0-9]+)$', views.Ventas_DetalleDetail.as_view()),
  re_path(r'^reportes/$',views.ReporteVentasList.as_view())
]