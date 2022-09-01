# Deployment guidelines v2.9.0

:::info
Do not forget, when upgrading to a new platform version,  always check and make sure your installed component versions match the versions stated in the release. To do that, go to **FLOWX.AI Designer > Platform Status**.
:::

![](../img/release_platform_version_check.png)

## Component versions

|             :ballot\_box\_with\_check:  | 2.9.0      | 2.8.1   | 2.8.0   | 2.7.0   | 2.6.0   | 2.5.0   | 2.4.0   | 2.3.0   | 2.2.0   | 2.1.0     | 2.0.0     | 1.16.0  | 1.15    | 1.14    | 1.13.0  | 1.12.0 | 1.11.0  |
| --------------------------------------- | ---------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | --------- | --------- | ------- | ------- | ------- | ------- | ------ | ------- |
| **Process engine**                      | **0.4.49** | 0.4.44  | 0.4.42  | 0.4.42  | 0.4.36  | 0.4.29  | 0.4.22  | 0.4.21  | 0.4.18  | 0.4.13    | 0.4.12    | 0.4.4   | 0.3.26  | 0.3.21  | 0.3.14  | 0.3.9  | 0.3.7   |
| **Designer**                            | **2.33.0** | 2.28.1  | 2.24.2  | 2.23.0  | 2.19.2  | 2.18.2  | 2.17.4  | 2.15.2  | 2.14.4  | 2.11.2    | 2.10.0    | 2.5.0   | 2.1.1   | 1.21.0  | 1.16.3  | 1.15.2 | 1.14.0  |
| **CMS Core**                            | 0.2.23     | 0.2.23  | 0.2.23  | 0.2.23  | 0.2.23  | 0.2.20  | 0.2.20  | 0.2.18  | 0.2.17  | 0.2.17    | 0.2.17    | 0.2.14  | 0.2.9   | 0.2.9   | 0.2.9   | 0.2.5  | 0.2.3   |
| **Scheduler Core**                      | 0.0.27     | 0.0.27  | 0.0.27  | 0.0.27  | 0.0.27  | 0.0.24  | 0.0.24  | 0.0.23  | 0.0.23  | 0.0.23    | 0.0.23    | 0.0.19  | 0.0.12  | 0.0.12  | 0.0.12  | NA     | 0.0.6   |
| **flowx-process-renderer**              | **2.33.0** | 2.28.1  | 2.24.2  | 2.23.0  | 2.19.2  | 2.18.2  | 2.17.4  | 2.15.2  | 2.14.4  | 2.11.2    | 2.10.0    | 2.4.2   | 2.1.1   | 1.21.0  | 1.16.3  | 1.15.2 | 1.14.0  |
| **flowx-web-components**                | **0.2.10** | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.6   | 0.2.5   | 0.2.4     | 0.2.1     | 0.2.1   | 0.0.298 | 0.0.298 | 0.0.298 | NA     | 0.0.293 |
| **Admin**                               | **0.3.55** | 0.3.47  | 0.3.43  | 0.3.40  | 0.3.36  | 0.3.34  | 0.3.29  | 0.3.23  | 0.3.21  | 0.3.13    | 0.3.13    | 0.3.3   | 0.2.26  | 0.2.26  | 0.2.26  | 0.2.25 | 0.2.23  |
| **Notification Plugin**                 | 1.0.198    | 1.0.198 | 1.0.197 | 1.0.194 | 1.0.194 | 1.0.191 | 1.0.191 | 1.0.190 | 1.0.190 | 1.0.186-1 | 1.0.186-1 | 1.0.186 | 1.0.182 | 1.0.182 | 1.0.182 | NA     | 1.0.179 |
| **Document Plugin**                     | **1.0.42** | 1.0.41  | 1.0.38  | 1.0.37  | 1.0.37  | 1.0.35  | 1.0.35  | 1.0.31  | 1.0.31  | 1.0.30    | 1.0.30    | 1.0.26  | 1.0.24  | 1.0.20  | 1.0.18  | NA     | 1.0.15  |
| **OCR Plugin**                          | 0.1.5      | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.1.5   | 0.0.109 | 0.0.109 | 0.0.109   | 0.0.109   | 0.0.109 | 0.0.106 |         |         |        |         |
| **License Core**                        | **0.1.19** | 0.1.18  | 0.1.18  | 0.1.18  | 0.1.18  | 0.1.15  | 0.1.15  | 0.1.13  | 0.1.13  | 0.1.12    | 0.1.12    | 0.1.10  | 0.1.5   | n/a     |         |        |         |
| **Customer Management Plugin**          | 0.1.22     | 0.1.22  | 0.1.22  | 0.1.22  | 0.1.22  | 0.1.20  | 0.1.20  | 0.1.18  | 0.1.18  | 0.1.18    | 0.1.18    | 0.1.16  | 0.1.10  | 0.1.10  | 0.1.10  | NA     | 0.1.6   |
| **Task Management Plugin**              | 0.0.28     | 0.0.28  | 0.0.27  | 0.0.27  | 0.0.27  | 0.0.22  | 0.0.22  | 0.0.21  | 0.0.21  | 0.0.16    | 0.0.16    | 0.0.14  |         |         |         |        |         |

## Additional configuration

### Liquibase

To enable the liquibase extension to work, a [Kubernetes Role-based access control (RBAC)](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) has to be created for some of the services.

**Actions needed:**

1. You have to create YAML files for each service (one to define the roles and one to bind the roles to the serviceAaccount). These roles need to be defined on each service that runs the liquibase unlocking extension, using the YAML file examples (you can find them attached at the bottom of this section).
2. After defining and binding the roles, execute the YAML using this command: `kubectl create -f role-service-name.yaml`
3. After you create an RBAC role for each service, the output should be the following:

```
user@user-device- work % k get roles
NAME CREATED AT
admin 2022-02-24T21:34:59Z
document-plugin 2022-06-17T11:05:16Z
license-core 2022-06-17T11:05:16Z
process-engine 2022-06-17T11:05:16Z
```

4. After you create the roles, you can check if they work using the starting log of the pod, it should log the following output:

`K8sLiquibaseLockService activated because this app runs in K8s, pod name is some-namespace: some-pod-name !`

#### process-engine

To define the roles:

* `process-engine-role.yaml` YAML file with the following configuration:

```yaml
# Source: process-engine/templates/role.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: process-engine
  namespace: "qa"
  labels:
    app.kubernetes.io/name: process-engine
    helm.sh/chart: process-engine-0.4.49
    app.kubernetes.io/instance: process-engine
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/release: 2.6.0
    app.kubernetes.io/version: 0.4.49
  annotations:
    meta.helm.sh/release-name: 'process-engine'
rules:
  - apiGroups:
      - ""
    resources:
      - pods
      - pods/status
    verbs:
      - get
      - list
      - watch
```

To bind the roles:

* `process-engine/process-engine-rb.yaml` YAML file with the following configuration:

```yaml
# Source: process-engine/templates/rolebinding.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: process-engine
  namespace: "qa"
  labels:
    app.kubernetes.io/name: process-engine
    helm.sh/chart: process-engine-0.4.49
    app.kubernetes.io/instance: process-engine
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/release: 2.6.0
    app.kubernetes.io/version: 0.4.49
  annotations:
    meta.helm.sh/release-name: 'process-engine'
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: process-engine
subjects:
  - kind: ServiceAccount
    name: process-engine
```

#### license-core

To define the roles:

* `license-core-role.yaml` YAML file with the following configuration:

```yaml
# Source: license-core/templates/role.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: license-core
  namespace: "qa"
  labels:
    app.kubernetes.io/name: license-core
    helm.sh/chart: license-core-0.1.19
    app.kubernetes.io/instance: license-core
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/release: 2.6.0
    app.kubernetes.io/version: 0.1.19
  annotations:
    meta.helm.sh/release-name: 'license-core'
rules:
  - apiGroups:
      - ""
    resources:
      - pods
      - pods/status
    verbs:
      - get
      - list
      - watch
```

To bind the roles:

* `license-core/license-core-rb.yaml`

```yaml
# Source: license-core/templates/rolebinding.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: license-core
  namespace: "qa"
  labels:
    app.kubernetes.io/name: license-core
    helm.sh/chart: license-core-0.1.19
    app.kubernetes.io/instance: license-core
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/release: 2.6.0
    app.kubernetes.io/version: 0.1.19
  annotations:
    meta.helm.sh/release-name: 'license-core'
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: license-core
subjects:
  - kind: ServiceAccount
    name: license-core
```

#### document-plugin

To define the roles:

* `document-plugin-role.yaml` YAML file with the following configuration:

```yaml
# Source: document-plugin/templates/role.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: document-plugin
  namespace: "qa"
  labels:
    app.kubernetes.io/name: document-plugin
    helm.sh/chart: document-plugin-1.0.42
    app.kubernetes.io/instance: document-plugin
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/release: 2.6.0
    app.kubernetes.io/version: 1.0.42
  annotations:
    meta.helm.sh/release-name: 'document-plugin'
rules:
  - apiGroups:
      - ""
    resources:
      - pods
      - pods/status
    verbs:
      - get
      - list
      - watch
```

To bind the roles:

* `document-plugin/document-plugin-rb.yaml`

```yaml
# Source: document-plugin/templates/rolebinding.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: document-plugin
  namespace: "qa"
  labels:
    app.kubernetes.io/name: document-plugin
    helm.sh/chart: document-plugin-1.0.42
    app.kubernetes.io/instance: document-plugin
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/release: 2.6.0
    app.kubernetes.io/version: 1.0.42
  annotations:
    meta.helm.sh/release-name: 'document-plugin'
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: document-plugin
subjects:
  - kind: ServiceAccount
    name: document-plugin
```