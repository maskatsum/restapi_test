#!/bin/bash

echo "----------"
echo "${KEY_CLOAK_AUTH_URL}"
echo "----------"

until curl $KEY_CLOAK_AUTH_URL -sf -o /dev/null;
do
  echo $(date) " Still waiting for keycloak to accept requests..."
  sleep 5
done

# echo "----------"
# echo "| READY! |"
# echo "----------"

java -jar /dashboard/app/build/libs/demo-0.0.1-SNAPSHOT.war