from django.urls import path, re_path
from . import views


app_name = 'Inventario'

urlpatterns = [
    path('', views.inventario, name='inventario'),
    re_path(r"^time/plus/(\d{1,2})/$", views.hours_ahead, name='hours_ahead'),
    re_path(r'^search/$', views.search, name = 'search_book'),
    re_path(r'^contact/$', views.contact, name = 'contact'),
    re_path(r'^dashboard/$', views.dashboard, name = 'dashboard'),
]
