import io, csv
from .models import Subject, Teacher


def add_subject(teacher, subjects):
    """
    Function to add list of subjects while importing.
    """
    try:
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
        return True

    except Exception:
        return False


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
                    profile_picture=row['Profile picture'],
                    email=row['Email Address'],
                    phone_number=row['Phone Number'],
                    room_number=row['Room Number'],   
                )
                subject_data = row['Subjects taught']
                subject_list = subject_data.split (",")
                subject_create = add_subject(teacher, subject_list)
        return True

    except Exception:
        return False
