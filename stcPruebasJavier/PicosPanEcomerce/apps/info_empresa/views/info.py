from django.shortcuts import render, HttpResponse
from django.core.exceptions import PermissionDenied
from django.shortcuts import render
from django.views.generic import View


# Create your views here.
class AboutUs(View):
    template = 'inicio/about-us.html'
    def get(self, request, *args, **kwargs):
        return render(request, self.template)
