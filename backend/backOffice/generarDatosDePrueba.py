import random
from datetime import date, timedelta
from django.db import transaction
from .models import Empresa, Vendedor, Producto, Ventas_Cabecera, Ventas_Detalle

empresaList = [
    {"id": 1, "name": "empresa"},
    {"id": 2, "name": "empresa 2"},
    {"id": 3, "name": "empresa 3"}
]

vendedorList = [
    {"id": 1, "name": "vendedor 1", "email": "mail@mail.com", "direccion": "calle falsa 123", "telefono": "123456789", "empresa": 1},
    {"id": 2, "name": "vendedor 2", "email": "vendedor2@mail.com", "direccion": "calle falsa 223", "telefono": "987456123", "empresa": 2},
    {"id": 10003, "name": "Juan P", "email": "name@mail.com", "direccion": "Avenida Hipólito Yrigoyen 146", "telefono": "11122336", "empresa": 2}
]

productos_data = [
    {"id": 1, "name": "producto 1", "descripcion": "este es un producto de prueba"},
    {"id": 2, "name": "producto 2", "descripcion": "este es un producto de prueba 2"},
    {"id": 3, "name": "producto 3", "descripcion": "este es un producto de prueba 3"},
    {"id": 4, "name": "producto 4", "descripcion": "este es un producto de prueba 4"},
    {"id": 5, "name": "producto 5", "descripcion": "este es un producto de prueba 5"},
    {"id": 6, "name": "producto 6", "descripcion": "este es un producto de prueba 6"},
    {"id": 7, "name": "producto 7", "descripcion": "este es un producto de prueba 7"},
    {"id": 8, "name": "producto 8", "descripcion": "este es un producto de prueba 8"}, 
    {"id": 9, "name": "producto 9", "descripcion": "este es un producto de prueba 9"},
    {"id": 10, "name": "producto 10", "descripcion": "este es un producto de prueba 10"}
]

@transaction.atomic
def generar_datos_prueba(num_registros=50000):
    # Crear productos si no existen
    for producto_data in productos_data:
        Producto.objects.get_or_create(id=producto_data["id"], defaults=producto_data)

    productos = Producto.objects.all()

    for _ in range(num_registros):
        empresa_data = random.choice(empresaList)
        empresa = Empresa.objects.get(pk=empresa_data["id"])
        vendedor_data = random.choice(vendedorList)
        vendedor = Vendedor.objects.get(pk=vendedor_data["id"])
        fecha = date.today() - timedelta(days=random.randint(0, 365))
        cliente = f"Cliente {random.randint(1, 100)}"
        importe = random.randint(100, 10000)
        lat = round(random.uniform(-90, 90), 6)
        long = round(random.uniform(-180, 180), 6)

        venta_cabecera = Ventas_Cabecera.objects.create(
            empresa=empresa,
            vendedor=vendedor,
            fecha=fecha,
            cliente=cliente,
            importe=importe,
            lat=lat,
            long=long
        )

        num_detalles = random.randint(1, 5)
        for _ in range(num_detalles):
            producto = random.choice(productos)
            unidad_de_medida = random.choice(["unidad", "kg", "litro", "caja"])
            cantidad = random.randint(1, 100)

            Ventas_Detalle.objects.create(
                producto=producto,
                unidad_de_medida=unidad_de_medida,
                cantidad=cantidad,
                venta_cabecera=venta_cabecera
            )

generar_datos_prueba()