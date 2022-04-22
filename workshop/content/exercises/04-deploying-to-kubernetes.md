Before we can deploy the container image to Kubernetes, it needs to be made available via an image registry from which Kubernetes can pull the image when deploying it.

This workshop environment provides you with your own image registry located at `{{ registry_host }}` and the user your workshop environment runs as has already been authenticated against the image registry.

As the container image when built was tagged with the image registry name, we need only push the image to the registry.

```terminal:execute
command: docker push {{ registry_host }}/springguides/demo
```

We now need a Kubernetes cluster. In this workshop environment we have already taken care of that for you. The workshop is running in a Kubernetes cluster and you have access to your own namespace in the same cluster.

To check that you can access the Kubernetes cluster okay, run:

```terminal:execute
command: kubectl version
```

The output should be similar to the following, although the version of Kubernetes may differ.

```
Client Version: version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.4", GitCommit:"e6c093d87ea4cbb530a7b2ae91e54c0842d8308a", GitTreeState:"clean", BuildDate:"2022-02-16T12:38:05Z", GoVersion:"go1.17.7", Compiler:"gc", Platform:"linux/amd64"}
Server Version: version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.4", GitCommit:"e6c093d87ea4cbb530a7b2ae91e54c0842d8308a", GitTreeState:"clean", BuildDate:"2022-03-06T21:32:53Z", GoVersion:"go1.17.7", Compiler:"gc", Platform:"linux/amd64"}
```

To deploy our container image, now run:

```terminal:execute
command: kubectl create deployment demo --image={{ registry_host }}/springguides/demo
```

The output should be:

```
deployment.apps/demo created
```

> NOTE: The deployment will use the `default` service account, which already has the image pull secret for the image registry associated with it, so we did not need to provide the pull secret in the deployment.

To monitor the deployment, run:

```terminal:execute
command: kubectl rollout status deployment/demo
```

To see all the resources which were created, run:

```terminal:execute
command: kubectl get deployments,replicasets,pods
```

The output should be similar to:

```
NAME                   READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/demo   1/1     1            1           39s

NAME                              DESIRED   CURRENT   READY   AGE
replicaset.apps/demo-5f9bc4c6c4   1         1         1       39s

NAME                        READY   STATUS    RESTARTS   AGE
pod/demo-5f9bc4c6c4-dbl7p   1/1     Running   0          39s
```

To test that the deployment is working, we need to be able to connect to the application. Normally you would have created a service for the application, as well as exposed it outside of the cluster using an ingress or via a load balancer. Since we haven't done that, we will set up port forwarding to expose the application to the local environment.

```terminal:execute
command: kubectl port-forward deployment/demo 8080:8080
```

To test the application, run:

```terminal:execute
command: curl localhost:8080/actuator/health
session: 2
```

The output should be:

```
{"status":"UP","groups":["liveness","readiness"]}
```
