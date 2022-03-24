We are now ready to build the application source code. We will first do this direct into the local directory.

Change to the ``demo`` sub directory.

```terminal:execute
command: cd ~/exercises/demo
```

Then run Maven to start the build.

```terminal:execute
command: ./mvnw install
```

> NOTE: It can take a couple of minutes the first time, but once the dependencies are all cached, subsequent builds would be faster.

When the build has completed, build artefacts including the application JAR file, can be found in the `target` sub directory.

```terminal:execute
command: tree target
```

To test that the application works, run Java with the application JAR file:

```terminal:execute
command: java -jar target/*.jar
```

Because we added the `actuator` module as a dependency, a number of HTTP endpoints already exist.

To test the application and see what endpoints were added, run:

```terminal:execute
command: curl -s localhost:8080/actuator | jq .
session: 2
```

The output should be similar to the following:

```
{
  "_links": {
    "self": {
      "href": "http://localhost:8080/actuator",
      "templated": false
    },
    "health-path": {
      "href": "http://localhost:8080/actuator/health/{*path}",
      "templated": true
    },
    "health": {
      "href": "http://localhost:8080/actuator/health",
      "templated": false
    }
  }
}
```

We no longer need the local instance of the application, so you can kill it:

```terminal:interrupt
```
