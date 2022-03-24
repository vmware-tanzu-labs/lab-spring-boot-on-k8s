In order to be able to deploy the application to Kubernetes, we need to create a container image which bundles up the application.

To create the container image, we are going to use the Maven `spring-boot:build-image` command. This will build us a container image without needing to worry about a `Dockerfile`.

```terminal:execute
command: ./mvnw spring-boot:build-image -Dspring-boot.build-image.imageName={{ registry_host }}/springguides/demo
```

To test that the container image works run:

```terminal:execute
command: docker run -p 8080:8080 {{ registry_host }}/springguides/demo
```

You should see the startup messages for the Spring Boot application.

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.6.4)

2022-03-24 06:40:35.540  INFO 1 --- [           main] com.example.demo.DemoApplication         : Starting DemoApplication v0.0.1-SNAPSHOT using Java 11.0.14.1 on 5500d28a78ab with PID 1 (/workspace/BOOT-INF/classes started by cnb in /workspace)
2022-03-24 06:40:35.544  INFO 1 --- [           main] com.example.demo.DemoApplication         : No active profile set, falling back to 1 default profile: "default"
2022-03-24 06:40:36.836  INFO 1 --- [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 1 endpoint(s) beneath base path '/actuator'
2022-03-24 06:40:37.295  INFO 1 --- [           main] o.s.b.web.embedded.netty.NettyWebServer  : Netty started on port 8080
2022-03-24 06:40:37.307  INFO 1 --- [           main] com.example.demo.DemoApplication         : Started DemoApplication in 2.236 seconds (JVM running for 2.662)
```

To test the application, run:

```terminal:execute
command: curl localhost:8080/actuator/health
session: 2
```

The output should be:

```
{"status":"UP"}
```

Kill the application once more.

```terminal:interrupt
```
