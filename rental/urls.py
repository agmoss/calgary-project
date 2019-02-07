from django.urls import path

from rental import views
#from rental.models import LogMessage



urlpatterns = [
    path("", views.home, name="home"),
    # path("about/", views.about, name="about"),
    # path("contact/", views.contact, name="contact"),
    # path("log/", views.log_message, name="log"),
]
