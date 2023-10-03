from django.shortcuts import render, redirect
# from datetime import date
from django.utils import timezone
from .models import Employee


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

def admin_dashboard_view(request):
    # Add your logic here to render the admin dashboard page
    return render(request, 'employee_of_month/admin_dashboard.html')

