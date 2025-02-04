from django.shortcuts import render

from rest_framework import viewsets
from .models import User
from .serializers import BackOfficeSerializer

# Create your views here.
class BackOfficeViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = BackOfficeSerializer