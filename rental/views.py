from django.shortcuts import render
from django.http import HttpResponse


def home(request):
    """Renders the about page."""
    return render(request, "rental/home.html")