from django.db import models

# Create your models here.
class Product(models.Model):
    cod_produc = models.CharField('Codigo Producto', max_length=80, primary_key=True)
    name_produc = models.CharField('Nombre Producto', max_length=200, null=True, blank=True)
