from django.http import JsonResponse
from django.shortcuts import render
from django.db.models import Avg
from django.utils import timezone
from django.forms.models import model_to_dict
from .models import Employee,User,EmployeeOfTheMonth,WinnerInteractions
import math
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password


# view that handles the login functionality
@csrf_exempt
def validate_user(request):
    if request.method == "POST":
        user_data = json.loads(request.body.decode('utf-8'))
        try:
            target_user = User.objects.get(username = user_data['username'])
        except:
             target_user = None
        if target_user:
            if check_password(user_data['password'],target_user.password):
                return JsonResponse({"username":target_user.username,"id":target_user.id})
             
            else:
                return JsonResponse({"message":"The password is invalid"})
        else:
            return JsonResponse({'message':'There is no user with this credentials'})
    else:
        return render(request,"Please use only a post request")




def return_employee(request,user_id):
    if request.method=="GET":
        try:
            requested_employee = Employee.objects.get(user_id=user_id)
        except:
             requested_employee = None
        if requested_employee:
            requested_employee = model_to_dict(requested_employee)
            requested_employee['photo'] = str(requested_employee['photo'])
            return JsonResponse(requested_employee)
        else:
             return JsonResponse({"message":"This is not an employee"})



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



     
@csrf_exempt
def edit_employee(request):
     if request.method == "POST":
          incoming_data = json.loads(request.body.decode('utf-8'))
          employee = Employee.objects.get(employee_id=incoming_data['id'])
          if employee:
               
               if incoming_data['photo']:
                    employee.photo = incoming_data['photo']
               if incoming_data['name']:
                    employee.name = incoming_data['name']
               if incoming_data['phone']:
                    employee.phone = incoming_data['phone']
               employee.save()

          after_employee = model_to_dict(employee)
          after_employee['photo'] = str(after_employee['photo'])

          digestible_struct = after_employee
          return JsonResponse(digestible_struct)
         

@csrf_exempt
def record_interaction(request):
     if request.method=="POST":
        serialzed_comments = None
        total_likes = None
        request_body = json.loads(request.body.decode('utf-8'))
        try:
            commenter = Employee.objects.get(id=request_body['employee_id'])
            current_eotm = EmployeeOfTheMonth.objects.get(is_selected_for_month=True)
        except:
            current_eotm = None
            commenter = None
        if request_body['comment'] and commenter and current_eotm:
            new_interaction = WinnerInteractions(comment = request_body['comment'],commenter = commenter, current_winner = current_eotm)
            new_interaction.save()
            all_comments = WinnerInteractions.objects.filter(current_winner__employee__id=current_eotm.employee_id)
            serialzed_comments = list(all_comments.values('comment'))
        #    return serialzed_comments
            
        if request_body['likes']:
                current_eotm.likes = current_eotm.likes+1
                current_eotm.save()
                total_likes = model_to_dict(current_eotm)['likes']
        else:
            total_likes = model_to_dict(current_eotm)['likes']
            # return JsonResponse({"likes":total_likes})
        if serialzed_comments and total_likes:
                serialzed_comments.append(total_likes)
                return JsonResponse(serialzed_comments,safe=False)
        elif serialzed_comments:
                return JsonResponse(serialzed_comments,safe=False)
        elif total_likes:
                return JsonResponse({'likes':total_likes})
        
@csrf_exempt
def resetting_password(request):
     pass
            
               
                 
        
     
          
          
          
     
     
    

               




def home(request):
        if request.method == "GET":
            employee_of_the_month = EmployeeOfTheMonth.objects.filter(is_selected_for_month=True).first()
            top_3_winners = Employee.objects.get_top_3_winners()
            context = {
                'employee_of_the_month': employee_of_the_month,
                'top_3_winners': top_3_winners,
            }

            return render(request, 'employee_of_month/home.html', context)
        
