from rest_framework import serializers
from .models import Subject, Teacher
from django.contrib.auth.models import User

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True, many=True)
    class Meta:
        model = Teacher
        fields = (
            'id',
            'first_name',
            'last_name',
            'profile_picture',
            'email',
            'phone_number',
            'room_number',
            'subject'
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email'
        )
