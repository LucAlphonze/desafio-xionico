from django.contrib import admin

# Register your models here.
from backOffice.models import User, Producto, Empresa, Vendedor, Ventas_Cabecera, Ventas_Detalle

admin.site.register(Producto)
admin.site.register(User)
admin.site.register(Empresa)
admin.site.register(Vendedor)
admin.site.register(Ventas_Cabecera)
admin.site.register(Ventas_Detalle)

