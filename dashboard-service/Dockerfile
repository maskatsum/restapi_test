#FROM maven:3-openjdk-11-slim as builder

#RUN mkdir app

#WORKDIR app

#COPY src src
#COPY pom.xml .

#RUN mvn clean package

FROM eclipse-temurin:17-jdk-jammy

ARG VERSION=0.1

RUN apt update -y
RUN apt upgrade -y
RUN apt install -y maven busybox-static curl

RUN mkdir /app
WORKDIR /app

COPY src src
COPY pom.xml .

RUN cd /app
RUN mvn package

RUN ln -s /app/target/dashboard-service-${VERSION}.jar app.jar

EXPOSE 8180

CMD ["java", "-jar", "app.jar"]