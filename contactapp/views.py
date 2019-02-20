from django.shortcuts import render

# Create your views here.
# sendemail/views.py
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .forms import ContactForm

def emailView(request):
    if request.method == 'GET':
        form = ContactForm()
    else:
        form = ContactForm(request.POST)
        if form.is_valid():
            subject = form.cleaned_data['subject']
            from_email = form.cleaned_data['from_email']
            message = form.cleaned_data['message']
            try:
                send_mail(subject, message, from_email, ['agordonmoss@gmail.com'])
            except BadHeaderError:
                return HttpResponse('Invalid header found.')

            return render(request, "contactapp/contact.html", {'form': form,'message':'Message has been sent! Thank you.'}) 

    return render(request, "contactapp/contact.html", {'form': form})