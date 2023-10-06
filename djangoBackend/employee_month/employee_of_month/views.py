from django.http import JsonResponse
from django.shortcuts import render, redirect
# from datetime import date
from django.db.models import Avg
from django.utils import timezone
from .models import Employee,User
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

def select_employee_of_the_month(selected_employee):
    current_month_year = timezone.now().replace(day=1)
    print("Current month: ",current_month_year)

    previous_selection = Employee.objects.filter(selected=True, selected_month=current_month_year).first()
    print("Prevoius Selection: ",previous_selection)

    if not previous_selection:
        # Increase the counter for the newly selected employee
        selected_employee.counter += 1
        selected_employee.selected = True
        selected_employee.selected_month = current_month_year
        selected_employee.save()


def return_employee(request,employee_id):
    if request.method=="GET":
        requested_employee = Employee.objects.get(pk=employee_id)

def select_employee_view(request, employee_id):
    selected_employee = Employee.objects.get(pk=employee_id)
    if request.method == 'POST':
        # Handle the form submission if needed
        # You can create a form for the admin to select the employee
        # and submit the form data here.

        # Call the function to select the employee of the month
        select_employee_of_the_month(selected_employee)
    
        # Redirect to the admin dashboard or other appropriate view
        return redirect('admin_dashboard')

    # Render the template with the employee selection form
    return render(request, 'employee_of_month/select_employee.html', {'selected_employee': selected_employee})


# view for selecting the employee of the month
def select_winner(request):
    if request.method == "GET":
        return JsonResponse(list(Employee.objects.filter(selected=True).values()),safe=False) 


# view for returning the hall-of-famers
def retrieve_hofs(request):
    if request.method=="GET":
        average_wins = Employee.objects.aggregate(Avg('counter'))
        int_val = math.floor(average_wins['counter__avg'])
        final_list = list(Employee.objects.filter(counter__gt = int_val).values())
        return JsonResponse(final_list,safe=False)

        

def admin_dashboard_view(request):
    # Add your logic here to render the admin dashboard page
    return render(request, 'employee_of_month/admin_dashboard.html')

