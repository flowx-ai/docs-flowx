---
sidebar_position: 3
---

# Using the Android Renderer

## Android project requirements

System requirements:
* **minSdk = 26**
* **compileSdk = 34**

The SDK library was build using:
* **[Android Gradle Plugin](https://developer.android.com/build/releases/gradle-plugin) 8.1.1**
* **[Kotlin](https://kotlinlang.org/) 1.9.10**

## Installing the library

1. Add the maven repository in your project's `settings.gradle.kts` file:

```
dependencyResolutionManagement {
    ...
    repositories {
        ...
        maven {
            url = uri("https://nexus-jx.dev.rd.flowx.ai/repository/flowx-maven-releases/")
            credentials {
                username = "your_username"
                password = "your_password"
            }
        }
    }
}
```

2. Add the library as a dependency in your `app/build.gradle.kts` file:

```
dependencies {
    ...
    implementation("ai.flowx.android:android-sdk:2.2.0")
    ...
}
```

### Library dependencies

Impactful dependencies:

* **[Koin](https://insert-koin.io/) 3.2.2**, including the implementation for **[Koin Context Isolation](https://insert-koin.io/docs/reference/koin-core/context-isolation/)**
* **[Compose BOM](https://developer.android.com/jetpack/compose/bom/bom-mapping) 2023.09.01** + **[Compose Compiler](https://developer.android.com/jetpack/androidx/releases/compose-compiler) 1.5.3**
* **[Accompanist](https://google.github.io/accompanist/) 0.32.0**
* **[Kotlin Coroutines](https://kotlinlang.org/docs/coroutines-overview.html) 1.7.3**
* **[OkHttp BOM](https://square.github.io/okhttp/) 4.11.0**
* **[Retrofit](https://square.github.io/retrofit/) 2.9.0**
* **[Coil Image Library](https://coil-kt.github.io/coil/) 2.3.0**
* **[Gson](https://github.com/google/gson) 2.10.1**

### Public API

The SDK library is managed through the `FlowxSdkApi` singleton instance, which exposes the following methods:

| Name                       | Description                                                                                                        | Definition                                                                                                                                                                                                 |
|----------------------------|--------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| init                       | Initializes the FlowX SDK. Must be called in your application's `onCreate()`                                       | `fun init(context: Context, config: SdkConfig, customComposableComponent: CustomComposableComponent? = null, customViewComponent: CustomViewComponent? = null)`                                            |
| checkRendererCompatibility | Checks the renderer version compatibility with the deployed services                                               | `suspend fun checkRendererCompatibility(action: ((Boolean) -> Unit)?)`                                                                                                                                     |
| startProcess               | Starts a FlowX process instance, by returning a `@Composable` function where the process is rendered.              | `fun startProcess(processName: String, accessToken: String, params: JSONObject = JSONObject(), isModal: Boolean = false, closeModalFunc: ((processName: String) -> Unit)? = null): @Composable () -> Unit` |
| continueProcess            | Continues an existing FlowX process instance, by returning a `@Composable` function where the process is rendered. | `fun continueProcess(processUuid: String, accessToken: String, isModal: Boolean = false, closeModalFunc: ((processName: String) -> Unit)? = null): @Composable () -> Unit`                                 |
| executeAction              | Runs an action from a custom component                                                                             | `fun executeAction(action: CustomComponentAction, params: JSONObject? = null)`                                                                                                                             |
| getMediaResourceUrl        | Extracts a media item URL needed to populate the UI of a custom component                                          | `fun getMediaResourceUrl(key: String): String?`                                                                                                                                                            |
| replaceSubstitutionTag     | Extracts a substitution tag value needed to populate the UI of a custom component                                  | `fun replaceSubstitutionTag(key: String): String`                                                                                                                                                          |
| updateAccessToken          | Updates the access token inside the renderer                                                                       | `fun updateAccessToken(token: String)`                                                                                                                                                                     |

## Configuring the library

To configure it, call this method in your project's application class `onCreate()` method:

```kotlin
fun init(
    context: Context,
    config: SdkConfig,
    customComposableComponent: CustomComposableComponent? = null,
    customViewComponent: CustomViewComponent? = null,
)
```

Its params are explained below:

| Name                      | Description                                           | Type                                                             | Requirement                   |
|---------------------------|-------------------------------------------------------|------------------------------------------------------------------|-------------------------------|
| context                   | Android application `Context`                         | Context                                                          | Mandatory                     |
| config                    | SDK configuration parameters                          | ai.flowx.android.sdk.process.model.SdkConfig                     | Mandatory                     |
| customComposableComponent | Custom components provided as `@Composable` functions | ai.flowx.android.sdk.component.custom.CustomComposableComponent? | Optional. Defaults to `null`. |
| customViewComponent       | Custom components provided as `View` objects          | ai.flowx.android.sdk.component.custom.CustomViewComponent?       | Optional. Defaults to `null`. |

The `custom components` implementation is explained in [its own section](#custom-components).

#### Sample

```
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        initFlowXSdk()
    }

    private fun initFlowXSdk() {
        FlowxSdkApi.getInstance().init(
            context = applicationContext,
            config = SdkConfig(
                baseUrl = "URL to FlowX backend",
                imageBaseUrl = "URL to FlowX CMS Media Library",
                language = "en",
                validators = mapOf("exact_25_in_length" to { it.length == 25 }),
                themeTokensJsonFileAssetsPath = "theme/tokens.json",
                themeComponentsJsonFileAssetsPath = "theme/components.json"
            ),
            customComposableComponent = object : CustomComposableComponent { ... },
            customViewComponent = object : CustomViewComponent { ... },
        )
    }
}
```

The configuration properties that should be passed as `SdkConfig` data for the `config` parameter above are:

| Name                              | Description                                                         | Type                              | Requirement                                         |
|-----------------------------------|---------------------------------------------------------------------|-----------------------------------|-----------------------------------------------------|
| baseUrl                           | URL to connect to the FlowX back-end environment                    | String                            | Mandatory                                           |
| imageBaseUrl                      | URL to connect to the FlowX Media Library module of the CMS         | String                            | Mandatory                                           |
| language                          | The language used for retrieving enumerations and substitution tags | String                            | Optional. Defaults to `en`.                         |
| validators                        | Custom validators for form elements                                 | Map<String, (String) -> Boolean>? | Optional.                                           |
| themeTokensJsonFileAssetsPath     | Android assets relative path to the theme tokens json file          | String?                           | Optional. When `null`, internal theme will be used. |
| themeComponentsJsonFileAssetsPath | Android assets relative path to the theme components json file      | String?                           | Optional. When `null`, internal theme will be used. |

#### Custom validators

The `custom validators` map is a collection of lambda functions, referenced by *name* (i.e. the value of the `key` in this map), each returning a `Boolean` based on the `String` which needs to be validated.
For a custom validator to be evaluated for a form field, its *name* must be specified in the form field process definition.

By looking at the example from above - ```mapOf("exact_25_in_length" to { it.length == 25 })``` - if a form element should be validated using this lambda function, in the process definition it must specifiy a custom validator named `"exact_25_in_length"`.

#### Theming

To override the renderer's internal theme, the `themeTokensJsonFileAssetsPath` and `themeComponentsJsonFileAssetsPath` parameters should contain some values, representing Android assets relative paths to the corresponding JSON file for [tokens and components](../../../../release-notes/v3.0.0-february-2023/deployment-guidelines-v3.0.0.md).<br/><br/>
For example, their values could look like in the example from above:
```kotlin
themeTokensJsonFileAssetsPath = "theme/tokens.json",
themeComponentsJsonFileAssetsPath = "theme/components.json"
```
For each case, this translates to `file://android_asset/...`, where `...` is the relative path within your project's `assets/` directory.

## Using the library

### Check renderer compatibility

To check the renderers compatibility with the FlowX deployed services, use the `suspend` function `checkRendererCompatibility`:

```kotlin
suspend fun checkRendererCompatibility(action: ((Boolean) -> Unit)?)
```
where the action lambda parameter is where you should put your own logic when compatible or not.

#### Sample

```kotlin
CoroutineScope(Dispatchers.IO).launch {
    FlowxSdkApi.getInstance().checkRendererCompatibility {
        when (it) {
            true -> { /* compatible */ }
            false -> { /* NOT compatible */ }
        }
    }
}
```

### Start a FlowX process

To start a new instance of a FlowX process, use the `startProcess` function:

```kotlin
fun startProcess(
    processName: String,
    accessToken: String,
    params: JSONObject = JSONObject(),
    isModal: Boolean = false,
    closeModalFunc: ((processName: String) -> Unit)? = null,
): @Composable () -> Unit
```

#### Parameters

| Parameter      | Description                                                                                        | Type                             | Requirement                                       |
|----------------|----------------------------------------------------------------------------------------------------|----------------------------------|---------------------------------------------------|
| processName    | The name of the process                                                                            | String                           | Mandatory                                         |
| accessToken    | The access token which allows access to the FlowX backend services                                 | String                           | Mandatory                                         |
| params         | The starting params for the process, if any                                                        | JSONObject                       | Optional. If omitted, if defaults to JSONObject() |
| isModal        | Flag indicating whether the process can be closed at anytime by tapping the top-right close button | Boolean                          | Optional. It defaults to `false`.                 |
| closeModalFunc | Lambda function where you should handle closing the process when `isModal` flag is `true`          | ((processName: String) -> Unit)? | Optional. It defaults to `null`.                  |

This returned **[@Composable](https://developer.android.com/reference/kotlin/androidx/compose/runtime/Composable)** function must be included in its own activity, which is part of (controlled and maintained by) the container application.<br/>
This wrapper activity must display only the `@Composable` returned from the SDK (i.e. it occupies the whole activity screen space).

#### Sample

```kotlin
class ProcessActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        ...
        setContent {
            FlowxSdkApi.getInstance().startProcess(
                processName = "your process name",
                accessToken = "your access token",
                params: JSONObject = JSONObject(),
                isModal = true,
                closeModalFunc = { processName ->
                    // NOTE: possible handling could involve doing something differently based on the `processName` value
                },
            ).invoke()
        }
    }
    ...
}
```

### Resume a FlowX process

To resume an existing instance of a FlowX process, use the `continueProcess` function:

```kotlin
fun continueProcess(
    processUuid: String,
    accessToken: String,
    isModal: Boolean = false,
    closeModalFunc: ((processName: String) -> Unit)? = null,
): @Composable () -> Unit
```

#### Parameters

| Parameter      | Description                                                                                        | Type                             | Requirement                                       |
|----------------|----------------------------------------------------------------------------------------------------|----------------------------------|---------------------------------------------------|
| processUuid    | The UUID string of the process                                                                     | String                           | Mandatory                                         |
| accessToken    | The access token which allows access to the FlowX backend services                                 | String                           | Mandatory                                         |
| isModal        | Flag indicating whether the process can be closed at anytime by tapping the top-right close button | Boolean                          | Optional. It defaults to `false`.                 |
| closeModalFunc | Lambda function where you should handle closing the process when `isModal` flag is `true`          | ((processName: String) -> Unit)? | Optional. It defaults to `null`.                  |

This returned **[@Composable](https://developer.android.com/reference/kotlin/androidx/compose/runtime/Composable)** function must be included in its own activity, which is part of (controlled and maintained by) the container application.<br/>
This wrapper activity must display only the `@Composable` returned from the SDK (i.e. it occupies the whole activity screen space).

#### Sample

```kotlin
class ProcessActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        ...
        setContent {
            FlowxSdkApi.getInstance().continueProcess(
                processUuid = "your process UUID string",
                accessToken = "your access token",
                isModal = true,
                closeModalFunc = { processName ->
                    // NOTE: possible handling could involve doing something differently based on the `processName` value
                },
            ).invoke()
        }
    }
    ...
}
```

### Handling authorization token changes

When the access token changes, in can be updated in the renderer using the `updateAccessToken` method:

```kotlin
fun updateAccessToken(token: String)
```

## Custom components

TODO

### Execute action

The custom components which the container app provides will contain FlowX actions to be executed.<br/>
In order to run an action you need to call the `executeAction` method:

```kotlin
fun executeAction(action: CustomComponentAction, params: JSONObject? = null)
```

#### Parameters

| Name   | Description                                                            | Type                                                        | Requirement                     |
|--------|------------------------------------------------------------------------|-------------------------------------------------------------|---------------------------------|
| action | Action object extracted from the data received in the custom component | ai.flowx.android.sdk.component.custom.CustomComponentAction | Mandatory                       |
| params | Parameters needed to execute the `action`                              | JSONObject?                                                 | Optional. It defaults to `null` |


### Get a substitution tag value by key

```kotlin
fun replaceSubstitutionTag(key: String): String
```

All substitution tags will be retrieved by the SDK before starting the first process and will be stored in memory.

Whenever the container app needs a substitution tag value for populating the UI of the custom components, it can request the substitution tag using the method above, by providing the `key`.

It returns:
- the key's counterpart, if the `key` is valid and found
- the empty string, if the `key` is valid, but not found
- the unaltered string, if the key has the wrong format (i.e. not starting with `@@`)

### Get a media item url by key

```kotlin
fun getMediaResourceUrl(key: String): String?
```

All media items will be retrieved by the SDK before starting the first process and will be stored in memory.

Whenever the container app needs a media item url for populating the UI of the custom components, it can request the url using the method above, by providing the `key`.

It returns the `URL` string of the media resource, or `null`, if not found.

## Known issues

<!--- - only **[PORTRAIT](https://developer.android.com/guide/topics/manifest/activity-element#screen)** orientation is supported for now -->
<!--- - there is no support for **[Dark Mode](https://developer.android.com/develop/ui/views/theming/darktheme)** yet -->
- shadows are rendering only on **Android >= 28** having **[hardware acceleration](https://developer.android.com/topic/performance/hardware-accel)** **enabled**
<!--- - **[CONTAINER](../../../building-blocks/node/milestone-node.md#container)** milestone nodes are not supported yet -->
<!--- - can not run multiple processes in parallel (e.g. in a Bottom Tab Navigation) -->
