FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /app/kmmrce
COPY requirements.txt /app/kmmrce
RUN pip install -r requirements.txt
COPY . /app/kmmrce