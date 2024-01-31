FROM eclipse-temurin:17-jdk-jammy as builder
COPY ./api-key-module /root/api-key-module

FROM quay.io/keycloak/keycloak:23.0.5
WORKDIR /opt/keycloak/
RUN id -u keycloak
COPY --from=builder /root/api-key-module /opt/keycloak/providers/

EXPOSE 8080

ENTRYPOINT [ "/opt/keycloak/bin/kc.sh"]
CMD ["start-dev"]