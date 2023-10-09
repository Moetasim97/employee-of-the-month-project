from django.http import JsonResponse
from django.shortcuts import render
from django.db.models import Avg
from django.utils import timezone
from .models import Employee,User,EmployeeOfTheMonth
import math
import json
from django.views.decorators.csrf import csrf_exempt


# view that handles the login functionality
@csrf_exempt
def validate_user(request):
    if request.method == "POST":
        user_data = json.loads(request.body.decode('utf-8'))
        target_user = User.objects.filter(username = user_data['username'])
        if target_user:
            return JsonResponse(list(target_user.values('username','id'))[0],safe=False)
        else:
            return JsonResponse({'message':'There is no user with this credentials'})
    else:
        return render(request,"Please use only a post request")




def return_employee(request,employee_id):
    if request.method=="GET":
        requested_employee = Employee.objects.get(pk=employee_id)



# view for selecting the employee of the month
def select_winner(request):
    if request.method == "GET":
        return JsonResponse(list(EmployeeOfTheMonth.objects.filter(is_selected_for_month=True).values()),safe=False) 


# view for returning the hall-of-famers
def retrieve_hofs(request):
    if request.method=="GET":
        # average_wins = Employee.objects.aggregate(Avg('counter'))
        # int_val = math.floor(average_wins['counter__avg'])
        final_list = list(Employee.objects.get_top_3_winners().values())
        return JsonResponse(final_list,safe=False)




def home(request):
        if request.method == "GET":
            employee_of_the_month = EmployeeOfTheMonth.objects.filter(is_selected_for_month=True).first()
            top_3_winners = Employee.objects.get_top_3_winners()
            context = {
                'employee_of_the_month': employee_of_the_month,
                'top_3_winners': top_3_winners,
            }

            return render(request, 'employee_of_month/home.html', context)
        
