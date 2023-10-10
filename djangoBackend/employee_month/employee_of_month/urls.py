from django.urls import path
from . import views

urlpatterns = [
    path('',views.home, name='home'),
    path('retrieve_winner/',views.select_winner,name='winner_employee'),
    path('all_time_winners/',views.retrieve_hofs,name="all_time_winners"),
    path('validate_user/',views.validate_user,name='validated_user'),
    path('edit_employee/',views.edit_employee,name = 'edited_employee'),
    path('return_employee/<int:user_id>/',views.return_employee,name="employee_data"),
    path('update_eotm_interactions/',views.record_interaction,name='updated_interactions'),
    path('reset_pass/',views.resetting_password)
]

