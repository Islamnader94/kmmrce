import io, csv, zipfile
from .models import Subject, Teacher
from django.core.files.base import ContentFile


def add_image(teacher, image):
    """
    Function to import and add image to teacher.
    """
    with zipfile.ZipFile('images/images.zip', 'r') as myzip:
        if image in myzip.namelist():
            teacher.profile_picture.save(
                image,
                ContentFile(myzip.open(image).read()),
                save=True
            )
        else:
            pass


def add_subject(teacher, subjects):
    """
    Function to add list of subjects while importing.
    """
    count_subjects = teacher.subject.all().count()
    for subject_name in subjects:
        if not subject_name:
            pass
        else:
            subject = Subject.objects.get_or_create(name=subject_name)
            if count_subjects <= 4:
                teacher.subject.add(subject[0].id)
            else:
                pass


def import_csv_teachers(file):
    """
    Function to import teachers from csv file.
    """
    csv_file = io.TextIOWrapper(file)
    data = csv.DictReader(csv_file)
    list_data = list(data)
    try:
        for row in list_data:
            if row['First Name']:
                teacher = Teacher.objects.create(
                    first_name=row['First Name'],
                    last_name=row['Last Name'],
                    email=row['Email Address'],
                    phone_number=row['Phone Number'],
                    room_number=row['Room Number'],
                )
                subject_data = row['Subjects taught']
                subject_list = subject_data.split (",")

                add_subject(teacher, subject_list)
                add_image(teacher, row['Profile picture'])
        return True

    except Exception:
        return False
