from django.urls import path

from rental import views
#from rental.models import LogMessage



urlpatterns = [

    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('about/', views.about, name='about'),
    path('map/', views.map, name = 'map'),
    path('license/', views.license, name = 'license'),
    path('api/pie_data',views.pie_data, name = 'pie_data'), 
    path('api/bar_data',views.bar_data, name = 'bar_data'), 
    path('api/hist_data',views.hist_data, name = 'hist_data'), 
    path('api/box_data',views.box_data, name = 'box_data'),    
    path('api/map_data',views.map_data, name = 'map_data'), 
    path('api/corr_data',views.corr_data, name = 'corr_data'), 
    path('api/ts_data',views.ts_data, name = 'ts_data'),
    path('api/scatter_data',views.scatter_data, name = 'scatter_data'),
]
