cd /root
ls
mvn -f ./ package
yum update
apt update
apt upgrade
apt install mvn
apt install -y maven
mvn -f ./ package
ls
cd target/
ls
cd ..
ln -s ./target/dashboard-service-0.1.jar app.jar
java -jar app.jar
exit
