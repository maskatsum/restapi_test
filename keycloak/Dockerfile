FROM amazoncorretto:21 as builder
RUN yum update -y && yum install -y wget tar gzip
WORKDIR /opt/maven
RUN cd /opt/maven && \
  wget https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz && \
  tar xzvf apache-maven-3.9.6-bin.tar.gz
ENV PATH="${PATH}:/opt/maven/apache-maven-3.9.6/bin"

COPY ./api-key-module /root/api-key-module
RUN cd /root/api-key-module && mvn package

FROM quay.io/keycloak/keycloak:23.0.5
WORKDIR /opt/keycloak/
RUN id -u keycloak
COPY --from=builder /root/api-key-module/target/deploy /opt/keycloak/providers/

EXPOSE 8080

ENTRYPOINT [ "/opt/keycloak/bin/kc.sh"]
CMD ["start-dev"]
