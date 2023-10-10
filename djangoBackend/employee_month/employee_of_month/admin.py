from django.contrib import admin
from .models import Employee, EmployeeOfTheMonth,WinnerInteractions

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['user', 'counter', 'job_title']
    actions = ['make_employee_of_the_month']

    def make_employee_of_the_month(self, request, queryset):
        if queryset.count() == 1:
            selected_employee = queryset.first()
            
            previous_employee_of_month = EmployeeOfTheMonth.objects.filter(is_selected_for_month=True).first()
            if previous_employee_of_month:
                previous_employee_of_month.is_selected_for_month = False
                previous_employee_of_month.save()
            
            EmployeeOfTheMonth.objects.select_employee_of_the_month(selected_employee)

    make_employee_of_the_month.short_description = "Selected Employee of the Month"

admin.site.register(EmployeeOfTheMonth)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(WinnerInteractions)
