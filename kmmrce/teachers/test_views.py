
import pytest
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from teachers import views

class TestLoginView(APITestCase):

    factory = APIRequestFactory()
    url = 'teachers/authenticate'

    def setUp(self):
        self.view = views.LoginView.as_view()
        self.user_name = 'testuser'
        self.password = 'verystrong'
        self.user = User.objects.create(
            username = self.user_name,
            password = make_password(self.password)
        )

    def test_success(self):
        data = {
            "user_name": self.user.username,
            "password": self.password
        }

        request = self.factory.post(
            self.url,
            data,
            format='json'
        )

        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_failed(self):
        data = {
            "user_name": self.user.username,
            "password": 'wrong_pass'
        }

        request = self.factory.post(
            self.url,
            data,
            format='json'
        )

        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestTeacherView(APITestCase):

    factory = APIRequestFactory()
    url = 'teachers/all'


    def setUp(self):
        self.view = views.TeacherView.as_view()


    def test_success(self):
        request = self.factory.get(
            self.url,
            format='json'
        )

        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
