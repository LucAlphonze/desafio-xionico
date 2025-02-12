import django_filters
from .models import Empresa, Ventas_Cabecera

class ReporteVentasFilter(django_filters.FilterSet):
    fecha_desde = django_filters.DateFilter(field_name='fecha', lookup_expr='gte')
    fecha_hasta = django_filters.DateFilter(field_name='fecha', lookup_expr='lte')
    empresa = django_filters.ModelMultipleChoiceFilter(field_name='empresa', queryset=Empresa.objects.all())  # Filtro múltiple
   # vendedor = django_filters.AllValuesFilter(field_name="vendedor", queryset=Vendedor.objects.all())

    class Meta:
        model = Ventas_Cabecera
        fields = ['fecha', 'empresa', 'vendedor'] # Campos para los que se aplicarán filtros
        # Si no se listan los campos aquí, se filtrará por todos los del modelo.