# base image 설정
FROM python:3

# 환경변수 설정
ENV PYTHONUNBUFFERED=1

# 컨테이너 내에서 backend 디렉토리 생성 후 거기서 작업
RUN mkdir /backend
WORKDIR /backend

# requirements.txt 파일을 backend 디렉토리에 복사
COPY requirements.txt /backend/

# requirements.txt 파일 설치
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# 작업한 모든 파일을 backend 디렉토리에 복사 (ADD도 동일한 역할을 하지만 권장X)
COPY . /backend/
