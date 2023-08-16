from django.template.loader import get_template
from django.template import Context
from django.shortcuts import render, HttpResponse, render_to_response
import datetime
from django.db.models import Q
from django.shortcuts import render_to_response
from .models import BookTestDjango
from .forms import ContactForm
from django.http import HttpResponseRedirect
from django.core.mail import send_mail

# Create your views here.
def inventario(request):
    now = datetime.datetime.now()
    return render(request,'date_time/current_datetime.html', {'current_datetime': now, 'title':'Este es el titulo'})

def hours_ahead(request, offset):
    offset = int(offset)
    dt = datetime.datetime.now() + datetime.timedelta(hours = offset)
    return render_to_response('date_time/hours_ahead.html', {'offset': offset, 'dt':dt})
    # return HttpResponse(html)

def search(request):
    query = request.GET.get('q', '')
    if query:
        qset = (
        Q(author__icontains=query) |
        Q(name_book__icontains=query) |
        Q(editorial__icontains=query)
        )
        results = BookTestDjango.objects.filter(qset).distinct()
    else:
        results = []
    return render_to_response("books/search.html", {
    "results": results,
    "query": query
    })



def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            print('Valid Form')
            topic = form.clean_data['topic']
            message = form.clean_data['message']
            sender = form.clean_data.get('sender', 'noreply@example.com')
            send_mail(
            'Feedback from your site, topic: %s' % topic,
            message, sender,
            ['jav_mad.elec@hotmail.com']
            )
            print('Sending Mail')
            return HttpResponseRedirect('/contact/thanks/')
    else:
        form = ContactForm()
        return render_to_response('books/contact.html', {'form': form})

# Create your views here.
def dashboard(request):
    return render(request,'dashboard/dashboard.html')
