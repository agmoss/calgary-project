from django.contrib import admin
from django.urls import path

from contactapp import views

urlpatterns = [
    path('contact/', views.emailView, name='email'),
]