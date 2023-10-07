from django.urls import path
from . import views

urlpatterns = [
    path('select_employee/<int:employee_id>/', views.select_employee_view, name='select_employee'),
    path('admin_dashboard/', views.admin_dashboard_view, name='admin_dashboard'),

]