from django.urls import path, re_path, include
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from .views.views import *  # apps/authentication/views/views.py

app_name = 'auth'

urlpatterns = [
    path('', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('salir', auth_views.LogoutView.as_view(), name='logout'),
    path('privacity-policy', login_required(PrivacityPolicy.as_view()), name='policy'),
    path('principal',  login_required(PrincipalView.as_view()), name='init_page'),

]
