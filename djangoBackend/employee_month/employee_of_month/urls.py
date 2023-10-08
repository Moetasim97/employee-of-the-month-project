from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    # path('select_employee/<int:employee_id>/', views.select_employee_view, name='select_employee'),
    path('',views.home, name='home'),
]
