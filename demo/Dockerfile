FROM amazoncorretto:21 

ARG VERSION=0.1

EXPOSE 4001
EXPOSE 5050

RUN yum update -y && yum install -y wget tar gzip unzip procps
WORKDIR /opt/maven
RUN cd /opt/maven && \
  wget https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz && \
  tar xzvf apache-maven-3.9.6-bin.tar.gz
ENV PATH="${PATH}:/opt/maven/apache-maven-3.9.6/bin"

WORKDIR  /opt/gradle
RUN wget https://services.gradle.org/distributions/gradle-8.6-bin.zip
RUN unzip gradle-8.6-bin.zip
RUN mv gradle-8.6 /usr/local/gradle
ENV PATH=${PATH}:/usr/local/gradle/bin

# RUN mkdir /app
WORKDIR /app
COPY . .
# RUN mvn package

CMD ["sh", "gradlew", "bootRun"]
