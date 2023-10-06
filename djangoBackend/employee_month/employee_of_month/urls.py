from django.urls import path
from . import views

urlpatterns = [
    path('select_employee/<int:employee_id>/', views.select_employee_view, name='select_employee'),
    path('admin_dashboard/', views.admin_dashboard_view, name='admin_dashboard'),
    path('retrieve_winner/',views.select_winner,name='winner_employee'),
    path('all_time_winners/',views.retrieve_hofs,name="all_time_winners")
]
