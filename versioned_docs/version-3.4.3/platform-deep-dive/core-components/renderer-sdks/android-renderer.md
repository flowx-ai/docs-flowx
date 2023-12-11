---
sidebar_position: 3
---

# Using the Android Renderer

## Android project requirements

To use the Android Renderer library, ensure that your Android project meets the following minimum requirements:

* minSdk 26

## Installing the library

1. Add the following code to your Android project's `settings.gradle` file::

```
dependencyResolutionManagement {
    ...
    repositories {
        ...
        maven {
            credentials {
                username "YOUR_USERNAME_HERE"
                password "YOUR_PASSWORD_HERE"
            }
            url 'https://nexus-jx.dev.rd.flowx.ai/repository/flowx-maven-releases/'
        }
    }
}
```
2. Add the following code to your `app/build.gradle` file:

```
dependencies {
    ...
    implementation "ai.flowx.android:android-sdk:2.0.1"
    ...
}
```

### Library dependencies

The Android Renderer library depends on the following libraries:

* Koin
* Retrofit
* Coil

## Accessing the documentation

To access the Android Renderer library's documentation, follow these steps:

1. Download the **javadoc.jar** file from the same repository as the library.
2. Extract the **javadoc.jar** file.
3. Open the **index.html** file in your browser.
4. Navigate to `ai.flowx.android.sdk.FlowxSdkApi`.







