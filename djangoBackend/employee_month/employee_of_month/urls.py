from django.urls import path
from . import views

urlpatterns = [
    path('',views.home, name='home'),
    path('retrieve_winner/',views.select_winner,name='winner_employee'),
    path('all_time_winners/',views.retrieve_hofs,name="all_time_winners"),
    path('validate_user/',views.validate_user,name='validated_user'),
]

