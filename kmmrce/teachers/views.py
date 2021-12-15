import io, csv
from django.http import JsonResponse
from .models import Subject, Teacher
from .utils import import_csv_teachers
from .serializers import SubjectSerializer, TeacherSerializer, UserSerializer
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
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
            else:
                return JsonResponse(
                    {'error': 'Authentication error'},
                    safe=False,
                    status=status.HTTP_401_UNAUTHORIZED)

        except ObjectDoesNotExist as e:
            return JsonResponse(
                {'error': str(e)},
                safe=False,
                status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return JsonResponse(
                {'error': str(e)},
                safe=False,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CSVTeachers(APIView):

    def post(self, request):
        try:
            message = import_csv_teachers(request.FILES['file'].file)
            if message:
                data = {"message": "Imported Successfully"}
                return JsonResponse(
                    data,
                    safe=False,
                    status=status.HTTP_200_OK)
            else:
                data = {"message": "Data already exists!"}
                return JsonResponse(
                    data,
                    safe=False,
                    status=status.HTTP_403_FORBIDDEN)

        except Exception as e:
            return JsonResponse(
                {'error': str(e)},
                safe=False,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TeacherView(APIView):

    def get(self, request, teacher_id=None):
        try:
            if teacher_id:
                teachers = Teacher.objects.filter(id=teacher_id).first()
                serializer = TeacherSerializer(teachers, context={"request":request})
            else:
                teachers = Teacher.objects.all()
                serializer = TeacherSerializer(teachers, context={"request":request}, many=True)

            return JsonResponse(
                serializer.data,
                safe=False,
                status=status.HTTP_200_OK)

        except ObjectDoesNotExist as e:
            return JsonResponse(
                {'error': str(e)},
                safe=False,
                status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return JsonResponse(
                {'error': str(e)},
                safe=False,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
