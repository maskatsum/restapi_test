- connect to the database;
- execute the following sql:
	```
	update realm SET SSL_REQUIRED='NONE' where name = 'master';
	```
- then restart the keycloak

