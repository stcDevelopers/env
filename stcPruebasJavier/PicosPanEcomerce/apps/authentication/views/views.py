from django.shortcuts import render, HttpResponse
from django.core.exceptions import PermissionDenied
from django.shortcuts import render
from django.views.generic import View

# Create your views here.
class PrivacityPolicy(View):
    template = 'registration/politicas.html'
    def get(self, request, *args, **kwargs):
        return render(request, self.template)

class DashBoard(View):
    template = 'tienda/dashboard.html'
    def get(self, request, *args, **kwargs):
        return render(request, self.template)

class PrincipalView(View):
    template = 'tienda/principal-view.html'
    def get(self, request, *args, **kwargs):
        context = {
        
        }
        return render(request, self.template, context)
