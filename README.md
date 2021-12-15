## This is a test for kmmrce

### List of technologies used:

- ReactJs (FrontEnd)
- Django 3 (BackEnd)
- Pytest (BackEnd)
- Docker and Docker-compose (DevOps)


## To run the project, start by the server side(BackEnd):

- Change your directory by cd kmmrce
- Activate the virtual enviroment

```
source venv/bin/activate
```

### Install all server dependencies:

```
pip3 install -r requirements.txt
```

### Run migrations and create super user:

```
python3 manage.py makemigrations

python3 manage.py migrate

python3 manage.py createsuperuser
```

### Run the backend server:

```
python3 manage.py runserver
```

## To Run frontend server, make sure to change your directory to frontend or open a new terminal, then run the following commands:

```
npm install

npm start
```

## To Run the project using Docker:
```
docker-compose build

docker-compose up
```

### After successfully running docker images, run the following necessary django commmands in the docker image:
```
docker exec -it backend-kmmrce bash
```

### Then inside the image run makemigrations, migrate, createsuperuser:
```
root@7ea2e000ac5a:/app/kmmrce# python3 manage.py makemigrations
root@7ea2e000ac5a:/app/kmmrce# python3 manage.py migrate
root@7ea2e000ac5a:/app/kmmrce# python3 manage.py createsuperuser
```

### To run tests:
```
root@7ea2e000ac5a:/app/kmmrce# pytest
```
