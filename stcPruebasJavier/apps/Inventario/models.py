from django.db import models

# Create your models here.
class TabSeller(models.Model):
    cod_seller = models.AutoField(primary_key=True)
    name_seller = models.CharField(max_length=100)
    activo_seller = models.CharField(max_length=1)
    feccre_seller = models.DateField()
    commision_perce_seller = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'tab_seller'

    class Admin(object):
        """docstring for Admin."""
        pass

    def __str__(self):
        return ' %s %s' % (self.cod_seller, self.name_seller)

class BookTestDjango(models.Model):
    id_book = models.AutoField(primary_key=True)
    author = models.CharField(max_length=100)
    name_book = models.CharField(max_length=100)
    editorial = models.CharField(max_length=100)
    publication_date = models.DateField()

    class Meta:
        managed = False
        db_table = 'Book_test_Django'
    class Admin(object):
        """docstring for Admin."""
        pass

    def __str__(self):
        return ' %s %s %s %s' % (self.author, self.name_book, self.editorial, self.publication_date)
