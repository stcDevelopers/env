from django.shortcuts import render, HttpResponse
from .models import Product

# Create your views here.
def inventario(request):
    products = Product.objects.all()
    return render(request, "inventario/login.html", {'products': products})
