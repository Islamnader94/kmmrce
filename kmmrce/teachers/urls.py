from django.contrib.auth import views
from django.urls import path
from .views import CSVTeachers, TeacherView, LoginView

urlpatterns = [
    path('authenticate', LoginView.as_view(), name='authenticate'),
    path('import', CSVTeachers.as_view(), name='import_teachers'),
    path('all', TeacherView.as_view(), name='all_teachers'),
    path('<str:teacher_id>', TeacherView.as_view(), name='get_teacher'),
]
