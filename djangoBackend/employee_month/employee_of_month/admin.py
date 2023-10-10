from django.contrib import admin
from .models import Employee, EmployeeOfTheMonth
from django.contrib.auth.models import Group
import calendar
from admin_confirm.admin import AdminConfirmMixin, confirm_action


admin.site.unregister(Group)


@admin.register(Employee)
class EmployeeAdmin(AdminConfirmMixin, admin.ModelAdmin):
    list_display = ['get_full_name', 'selection_counter', 'job_title']
    actions = ['make_employee_of_the_month']
    search_fields = ['user__first_name', 'user__last_name', 'job_title']

    def get_full_name(self, obj):
        return obj.user.get_full_name()
    get_full_name.short_description = 'Full Name'

    @confirm_action
    def make_employee_of_the_month(self, request, queryset):
        if queryset.count() == 1:
            selected_employee = queryset.first()

            previous_employee_of_month = EmployeeOfTheMonth.objects.filter(
                is_selected_for_month=True).first()
            if previous_employee_of_month:
                previous_employee_of_month.is_selected_for_month = False
                previous_employee_of_month.save()

            EmployeeOfTheMonth.objects.select_employee_of_the_month(
                selected_employee)

            self.message_user(
                request, f'Successfully selected {selected_employee} as Employee of the Month.')
        else:
            self.message_user(request, f'Please select only one employee.')

    make_employee_of_the_month.short_description = "Selected Employee of the Month"


@admin.register(EmployeeOfTheMonth)
class EmployeeOfTheMonthAdmin(admin.ModelAdmin):
    list_display = ['employee', 'display_month', 'is_selected_for_month']

    def display_month(self, obj):
        return calendar.month_name[obj.month.month]
    display_month.short_description = 'Month'
