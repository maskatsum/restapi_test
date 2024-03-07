FROM eclipse-temurin

ARG VERSION=0.2

EXPOSE 8080

RUN apt update && apt install -y unzip

WORKDIR  /opt/gradle
RUN wget https://services.gradle.org/distributions/gradle-8.5-bin.zip
RUN unzip gradle-8.5-bin.zip
RUN mv gradle-8.5 /usr/local/gradle
ENV PATH=${PATH}:/usr/local/gradle/bin

WORKDIR /dashboard
COPY app/ app
WORKDIR /dashboard/app
RUN ./gradlew bootWar
COPY entrypoint.sh .

CMD ["sh", "/dashboard/app/entrypoint.sh"]
