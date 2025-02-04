from django.db import models
class User(models.Model):
    userName = models.CharField(max_length=20)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=10)
# Create your models here.
