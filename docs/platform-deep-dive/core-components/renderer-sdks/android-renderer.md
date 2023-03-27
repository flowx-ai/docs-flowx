---
sidebar_position: 3
---

# Using the Android Renderer

## Android project requirements

The minimum requirements are:

* minSdk 26

## Installing the library

- in your Android project's settings.gradle: 
dependencyResolutionManagement {
    ...
    repositories {
        ...
        maven {
            credentials {
                username "flowx-dev-android"
                password "c4lm-Lemur28-20211117"
            }
            url 'https://nexus-jx.dev.rd.flowx.ai/repository/flowx-maven-releases/'
        }
    }
}
- in your app/build.gradle: 
dependencies {
    ...
    implementation "ai.flowx.android:android-sdk:2.0.1"
    ...
}

### Library dependencies

* Koin
* Retrofit
* Coil

## Accessing the documentation

- download the javadoc.jar file that can be found in the same repository as the library
- extract the javadoc.jar file
- run index.html in your browser
- navigate to ai.flowx.android.sdk.FlowxSdkApi

