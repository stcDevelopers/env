from django.urls import path, re_path, include
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from .views.info import *  # apps/authentication/views/views.py

app_name = 'info'

urlpatterns = [
    path('/about-us/',  login_required(AboutUs.as_view()), name='about_us'),

]
