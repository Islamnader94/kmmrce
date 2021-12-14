import json
import io, csv
from django.shortcuts import render
from django.http import JsonResponse
from .models import Subject, Teacher
from .serializers import SubjectSerializer, TeacherSerializer, UserSerializer
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class LoginView(APIView):

    def post(self, request):
        try:
            user_name = request.data['user_name']
            user_password = request.data['password']
            user = authenticate(username=user_name, password=user_password)
            if user:
                data = {'authenticated': True}
                return JsonResponse(
                    data,
                    safe=False,
                    status=status.HTTP_200_OK)

        except ObjectDoesNotExist as e:
            return JsonResponse(
                {'error': str(e)},
                safe=False,
                status=status.HTTP_404_NOT_FOUND)

        except Exception:
            return JsonResponse(
                {'error': 'Something terrible went wrong'},
                safe=False,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CSVTeachers(APIView):

    def post(self, request):
        csvFile = io.TextIOWrapper(request.FILES['file'].file)
        data = csv.DictReader(csvFile)
        list_of_dict = list(data)
        try:
            objs = [
                Teacher(
                    first_name=row['First Name'],
                    last_name=row['Last Name'],
                    profile_picture=row['Profile picture'],
                    email=row['Email Address'],
                    phone_number=row['Phone Number'],
                    room_number=row['Room Number'],
                    # subject=Teacher.subject.add(subject[0])
                )
                for row in list_of_dict if row['First Name']
            ]
            teacher_data = Teacher.objects.bulk_create(objs)

            for data in list_of_dict:
                subject_data = data['Subjects taught']
                teacher_email = data['Email Address']
                subject_list = subject_data.split (",")
                for subject_name in subject_list:
                    if not subject_name:
                        pass
                    else:
                        subject = Subject.objects.get_or_create(name=subject_name)
                        teacher = Teacher.objects.filter(email=teacher_email)
                        count_subjects = teacher[0].subject.all().count()
                        if count_subjects <= 4:
                            teacher[0].subject.add(subject[0].id)
                        else:
                            pass

            returnmsg = {
                "message": "Imported Successfully",
                "status_code": 200
            }
        except:
            returnmsg = {
                "message": "Data already exists",
                "status_code": 500
            }

        return JsonResponse(returnmsg)


class TeacherView(APIView):

    def get(self, request, teacher_id=None):
        try:
            if teacher_id:
                teachers = Teacher.objects.filter(id=teacher_id).first()
                serializer = TeacherSerializer(teachers)
            else:
                teachers = Teacher.objects.all()
                serializer = TeacherSerializer(teachers, many=True)

            return JsonResponse(
                serializer.data,
                safe=False,
                status=status.HTTP_200_OK)

        except ObjectDoesNotExist as e:
            return JsonResponse(
                {'error': str(e)},
                safe=False,
                status=status.HTTP_404_NOT_FOUND)

        except Exception:
            return JsonResponse(
                {'error': 'Something terrible went wrong'},
                safe=False,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
