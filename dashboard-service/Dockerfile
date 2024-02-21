FROM amazoncorretto:21 

ARG VERSION=0.1

RUN yum update -y && yum install -y wget tar gzip
WORKDIR /opt/maven
RUN cd /opt/maven && \
  wget https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz && \
  tar xzvf apache-maven-3.9.6-bin.tar.gz
ENV PATH="${PATH}:/opt/maven/apache-maven-3.9.6/bin"


RUN mkdir /app
WORKDIR /app
COPY src src
COPY pom.xml .

RUN cd /app && mvn package

RUN ln -s /app/target/dashboard-service-${VERSION}.jar app.jar

EXPOSE 8081

CMD ["java", "-jar", "app.jar"]
