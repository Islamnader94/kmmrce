from rest_framework import serializers
from .models import Subject, Teacher
from django.contrib.auth.models import User

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True, many=True)
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Teacher
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'room_number',
            'subject',
            'image_url'
        )
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.profile_picture:
            photo_url = obj.profile_picture.url
            return request.build_absolute_uri(photo_url)
        else:
            return None


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email'
        )
