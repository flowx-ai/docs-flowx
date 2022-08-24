# Using the Android Renderer

## Project requirements



The Android Renderer sdk was built using the following tool versions:

* Gradle 6.5
* SDK Build Tools 4.1.2
* Kotlin 1.5.31
* Koin 3.1.3

## Installing the library



The SDK works with apps that use `Koin` for DI and `LiveData`

### Add dependency

* Add Nexus repository details in the project `settings.gradle` file

```
maven {
    credentials {
        username "USERNAME"
        password "PASSWORD"
    }
    url 'NEXUS_REPO_URL'

}
```

* Add the dependency in the module-level `build.gradle` file

```
implementation "ai.flowx.android:android-sdk:1.0.1"
```



## Using the library



### Configure the process renderer

```
 ProcessRenderer.Builder()
      .baseApiUrl(YOUR_API)
      .tokenCall { YOUR_TOKEN }
      .useAuthenticator(YOUR_AUTHENTICATOR)
      .addInterceptor(YOUR_INTERCEPTOR) //optional
      .apiDateFormat(YOUR_API_DATE_FORMAT)
      .build()
```

### &#x20;Usage

Implement `ProcessRenderer.Listener` and its method `display(templateConfig: FXTemplateConfig)` and register for listening

```
class MainViewModel: ProcessRenderer.Listener {

	private val flowX: ProcessRenderer by inject()
    
	override fun display(templateConfig: FXTemplateConfig) {
        	when (templateConfig.componentIdentifier) {
        	// navigate to the required UI component based on the componentIdentifier
        	}
  	}
	
	fun register() {
        flowX.addListener(this)
    }

    fun unregister() {
        flowX.removeListener(this)
    }
}
```

It is recommended to unregister from listening in order to avoid unwanted behavior.

#### **Start a process:**

```
flowx.startProcess(processName: String, processData: Any, replaceProcess: Boolean)
```

`processName` - the name of the process

`processData` - request body for starting the process (if needed)

`replaceProcess` - start a process by replacing the existing process (default is false)

#### **Listen for data**

```
class BaseFXViewModel : BaseViewModel() {

    internal val flowX: ProcessRenderer by inject()
    var actions: List<Action> = emptyList()
    lateinit var data: YOUR_CLASS
    private val dataObserver = Observer<JsonObject> {
        data = it.toString().fromJson(gson, YOUR_CLASS)
        processData()
    }

    private val actionsObserver = Observer<Array<Action>> {
        actions = it.toList()
        processData()
    }

    fun startListening() {
        flowX.observeData(YOUR_PROCESS_NAME, YOUR_COMPONENT_NAME) { dataLiveData, actionsLiveData ->

            dataLiveData.observeForever(dataObserver)
            actionsLiveData.observeForever(actionsObserver)
        }
    }

    fun clear {
        flowX.observeData(YOUR_PROCESS_NAME, YOUR_COMPONENT_NAME) { dataLiveData, actionsLiveData ->
            dataLiveData.removeObserver(dataObserver)
            actionsLiveData.removeObserver(actionsObserver)
        }
    }
}
```

#### Run an action

The classic way to run an action is:

```
flowX.executeAction(YOUR_PROCESS_NAME, action, customParams, {
            // action executed successfully

        }, {
            // error
        })
```

where `customParams` represents the custom parameters that should be sent for this action; usually a `JSONObject`

In order to run an internal action, you need to call the following method:

```
flowX.executeInternalAction(processId, tokenId, actionName, { fxResult-> 
	 fxResult.handle(onSuccess, onError)
```

#### Cleanup

You can dismiss one process by running the following:

```
flowX.dismissProcess(YOUR_PROCESS_NAME)
```

You can dismiss all the existing processes and close all the socket connections using:

```
flowX.clear()
```
