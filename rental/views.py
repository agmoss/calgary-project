from django.shortcuts import render
from django.http import HttpResponse

from django.conf import settings # For file paths

# For api data
from django.db import connections
from django.db.models import Count, Avg
from django.http import JsonResponse
from rental.models import RentalData
from django.core import serializers

import json
import pandas as pd
import numpy as np


def navtest(request):

    content = {
        'title' : 'Nav' 
    }

    return render(request,'rental/navtest.html', content)

def home(request):

    content = {
        'title' : 'Home' 
    }

    return render(request,'rental/home.html', content)

def dashboard(request):

    content = {
        'title' : 'Dashboard'
    }

    return render(request,'rental/dashboard.html', content)

def analytics(request):

    content = {
        'title' : 'Analytics'
    }

    return render(request,'rental/analytics.html', content)


def about(request):

    content = {
        'title' : 'About'
    }

    return render(request,'rental/about.html',content)

def data(request):

    content = {
        'title' : 'Data'
    }

    return render(request,'rental/data.html',content)

def map(request):

    content = {
        'title' : 'Map'
    }

    return render(request,'rental/map.html',content)

def contact(request):

    content = {
        'title' : 'Contact'
    }

    return render(request,'rental/contact.html',content)

def pie_data(request):
    """ JSON API """

    # # GROUP BY
    data = list(
        RentalData.objects.using('rental_data')
        .values('community','_type')
        .annotate(dcount=Count('community'))
        .order_by('-dcount')
        .filter(position = 'active',dcount__gte = 10)
        )

    return JsonResponse(data, safe=False)  
def scatter_data(request):
    """ JSON API """

    # GROUP BY
    data = list(
        RentalData.objects.using('rental_data')
        .values('community','_type')
        .annotate(Avg('price'),dcount=Count('community')) # For filtering
        .order_by('-price__avg')
        .filter(position = 'active',dcount__gte = 10)             
        )

    return JsonResponse(data, safe=False) 

def hist_data(request):
    """ JSON API """

    data = list(
        RentalData.objects.using('rental_data')
         .values('price','_type')
         .filter(position = 'active')
         )

    return JsonResponse(data, safe=False)  


def box_data(request):
    """ JSON API """

    data = RentalData.objects.using('rental_data')
    data = data.values('quadrant','price','_type')
    data = data.filter(position = 'active')
        
    data = list(data)

    #Rename quadrants
    for n, i in enumerate(data):
        for n,x in enumerate(i):
            if i[x] == '':
                i[x] = "Unspecified"
            if (i[x] == 'Inner-City||SW') or (i[x] == 'SW||Inner-City'):
                i[x] = 'SW-Central'
            if (i[x] == 'Inner-City||NW') or (i[x] == 'NW||Inner-City'):
                i[x] = 'NW-Central'
            if (i[x] == 'Inner-City||SE') or (i[x] == 'SE||Inner-City'):
                i[x] = 'SE-Central'
            if (i[x] == 'Inner-City||NE') or (i[x] == 'NE||Inner-City'):
                i[x] = 'NE-Central'

    return JsonResponse(data, safe=False)  


def map_data(request):
    """ JSON API """

    data = list(
        RentalData.objects.using('rental_data')
        .values('latitude','longitude','price','_type')
        .filter(position = 'active')
        )

    from django.core.serializers import serialize

    return JsonResponse(data, safe=False)  

def corr_data(request):
    """ JSON API """

    df = pd.DataFrame(
        list(
            RentalData.objects.using('rental_data')
            # TODO: Convert values to numeric...
            .values('price','_type','sq_feet','location','community','quadrant','bedrooms','den','baths','cats','dogs','utilities_included')
            .filter(position = 'active')
            )
        )

    corr = df.corr()
    z = corr.values.tolist()
    x = corr.columns.tolist()
    y = corr.index.tolist()

    data =  {
        "zValues" : z,
        "xValues" : x,
        "yValues" : y,
    }

    return JsonResponse(data, safe=False) 


def ts_data(request):
    """ JSON API """

    df = pd.DataFrame(
        list(
            RentalData.objects.using('rental_data')
            .values('retrieval_date','_type','price')
            .filter(position = 'active')
        )
    )

    df = df[df.price < df.price.quantile(.90)]

    dfList = []

    # Aggregate by type
    for val in df['_type'].unique():

        sliced = df.loc[df['_type'] == val]
        
        agg = sliced.groupby('retrieval_date').mean()  

        agg = agg.rename(columns={'price': val})

        dfList.append(agg)  

    df = pd.concat(dfList, axis=1)

    df = df[['Townhouse', 'House', 'Duplex', 'Apartment','Main Floor', 'Condo', 'Shared']]

    df = df.dropna()

    flat = df.to_dict('dict')

    from django.core.serializers import serialize

    return JsonResponse(flat, safe=False)