---
sidebar_position: 2
---

# Using the iOS Renderer

## iOS Project Requirements

The minimum requirements are:

* iOS 14
* Swift 5.0

## Installing the library

The iOS Renderer is available through Cocoapods dependency manager.

#### Prerequisites

* Cocoapods gem installed

#### Cocoapods private trunk setup

Add the private trunk repo to your local Cocoapods installation with the command:

```
pod repo add repo-specs-name git@github.com/[repo-specs-name].git
```

#### Adding the dependency

Add the source of the private repository in the Podfile

```
source 'git@github.com/[repo-specs-name].git'
```

Add the pod and then run `pod install`

```
pod 'FlowX'
```

#### Library dependencies

* Socket.IO-Client-Swift
* Alamofire
* SVProgressHUD
* SDWebImageSwiftUI

## Configuring the library

The SDK has 3 types of configurations, available through 3 shared instances.

It is recommended to call the configuration methods at app launch.

Otherwise, make sure you do it before the start of any FlowX process.

### FXConfig

This config is used for general purpose properties.

#### Properties

| Name          | Description                                                           | Type                    | Requirement                 |
| ------------- | --------------------------------------------------------------------- | ----------------------- | --------------------------- |
| baseURL       | The base URL used for REST networking                                 | String                  | Mandatory                   |
| socketBaseURL | The URL user for socket networking                                    | URL                     | Mandatory                   |
| language      | The language used for retrieving enumerations and substitution tags   | String                  | Mandatory. Defaults to "en" |
| stepViewType  | The type of the custom step view class                                | FXStepViewProtocol.Type | Optional                    |
| logEnabled    | Value indicating whether console logging is enabled. Default is false | Bool                    | Optional                    |

**Sample**

```
FXConfig.sharedInstance.configure { (config) in
    config.baseURL = environmentConfig.baseURL
    config.socketBaseURL = environmentConfig.socketBaseURL
    config.language = "en" 
    config.logEnabled = true
    config.stepViewType = CustomStepView.self
}
```

### FXSessionConfig

This config is used for providing networking or auth session-specific properties.

The library expects a session instance managed by the container app. Request adapting and retrying are handled by the container app.

#### Properties

| Name           | Description                                         | Type    |
| -------------- | --------------------------------------------------- | ------- |
| sessionManager | Alamofire session instance used for REST networking | Session |
| token          | JWT authentication token                            | String  |

#### Sample

```
FXSessionConfig.sharedInstance.configure { config in
    config.sessionManager = sessionManager()
    config.token = environmentConfig.authorizationToken
}   
```

### FXTheme

This config is used for providing custom theming properties, such as colors and fonts.

| Name                 | Description | Type    |
| -------------------- | ----------- | ------- |
| primaryColor         |             | UIColor |
| primaryDisabledColor |             | UIColor |
| blackColor           |             | UIColor |
| whiteColor           |             | UIColor |
| gray1Color           |             | UIColor |
| gray2Color           |             | UIColor |
| gray3Color           |             | UIColor |
| gray4Color           |             | UIColor |
| gray5Color           |             | UIColor |
| accentColor          |             | UIColor |
| successColor         |             | UIColor |
| warningColor         |             | UIColor |
| errorColor           |             | UIColor |
| heading1Font         |             | UIFont  |
| heading2Font         |             | UIFont  |
| heading3Font         |             | UIFont  |
| heading4Font         |             | UIFont  |
| paragraph1Font       |             | UIFont  |
| paragraph2Font       |             | UIFont  |
| captionFont          |             | UIFont  |
| buttonFont           |             | UIFont  |
| linkFont             |             | UIFont  |
| smallButtonFont      |             | UIFont  |

#### Sample

```
FXTheme.sharedInstance.configure { config in
    config.primaryColor = UIColor(red: 60.0/255.0, green: 170.0/255.0, blue: 170.0/255.0, alpha: 1.0)
}
```

## Using the library

The following library's public APIs are called using the shared instance of FlowX, `FlowX.sharedInstance`.

### How to start and end FlowX session

After all the configurations are set, you can start a FlowX session by calling the `startSession()` method.&#x20;

This is optional, as the session starts lazily when the first process is started.

`FlowX.sharedInstance.startSession()`

When you want to end a FlowX session, you can call the `endSession()` method. This also does a complete clean-up of the started processes.

You might want to use this method in a different scenario, for instance when the user logs out.

`FlowX.sharedInstance.endSession()`

### How to start a process

You can start a process by calling the following method.

The container app is responsible with presenting the navigation controller holding the process navigation.

```
public func startOrRestartProcess(navigationController: UINavigationController,
                                  name: String,
                                  params: [String: Any]?,
                                  isModal: Bool = false)
```

`navigationController` - the instance of UINavigationController which will hold the process navigation stack

`name` - the name of the process

`params` - the start parameters, if any

`isModal` - a boolean indicating whether the process is modally displayed.

#### Sample

```
FlowX.sharedInstance.startOrRestartProcess(navigationController: processNavigationController,
                                           name: processName,
                                           params: startParams,
                                           isModal: true)
```

```
self.present(processNavigationController, animated: true, completion: nil)
```

### How to end a process

You can manually end a process by calling the `stopProcess(name: String)` method.

This is useful when you want to explicitly ask the FlowX shared instance to clean up the instance of the process sent as parameter.&#x20;

For example, it could be used for modally displayed processes that are dismissed by the user, in which case the `dismissRequested(forProcess process: String, navigationController: UINavigationController)` method of the FXDataSource will be called.

#### Sample

```
FlowX.sharedInstance.stopProcess(name: processName)
```

### How to run an action

The custom components which the container app provides will contain FlowX actions to be executed. In order to run an action you need to call the following method:

```
public func runAction(action: [String: Any],
                      params: [String: Any]? = nil)
```

`action` - the action object provided in the original `data` dictionary

`params` - the parameters for the action

### How to run an upload action

```
public func runUploadAction(action: [String: Any],
                             image: UIImage)
```

`image` - the image to upload

```
public func runUploadAction(action: [String: Any],
                           fileURL: URL)
```

`fileURL` - the local URL of the image

### Getting a substitution tag by key

```
public func getTag(withKey key: String) -> String?
```

All substitution tags will be retrieved by the SDK before starting the first process and will be stored in memory.&#x20;

Whenever the container app needs a substitution tag value for populating the UI of the custom components, it can request the substitution tag using the method above, providing the key.

### Handling authorization token changes

When the access token of the auth session changes, you can update it in the renderer using the `func updateAuthorization(token: String)` method.

### FXDataSource

The library offers a way of communication with the container app through the `FXDataSource` protocol.

The data source is a public property of FlowX shared instance.

`public weak var dataSource: FXDataSource?`

```
public protocol FXDataSource: AnyObject {
    func controllerFor(componentIdentifier: String) -> FXController?
    
    func viewFor(componentIdentifier: String) -> FXView?
    
    func navigationController() -> UINavigationController?

    func errorReceivedForAction(name: String?)
    
    func validate(validatorName: String, value: String) -> Bool
    
    func dismissRequested(forProcess process: String, navigationController: UINavigationController)
    
}
```

* `func controllerFor(componentIdentifier: String) -> FXController?`

This method is used for providing a custom component view controller, by the component identifier.

* `func viewFor(componentIdentifier: String) -> FXView?`

The method is used for providing a custom view used in a generated screen, by the component identifier

* `func navigationController() -> UINavigationController?`

This method is used for providing a navigation controller. It can be either a custom `UINavigationController` class, or just a regular `UINavigationController` instance themed by the container app.

* `func errorReceivedForAction(name: String?)`

This method is called when an error occurs after an action is executed.

* `func validate(validatorName: String, value: String) -> Bool`

This method is used for custom validators. It provides the name of the validator and the value to be validated. The method returns a boolean indicating whether the value is valid or not.

* `func dismissRequested(forProcess process: String, navigationController: UINavigationController)`

This method is called, on a modally displayed process navigation, when the user attempts to dismiss the modal navigation. Typically it is used when you want to present a confirmation pop-up.

The container app is responsible with dismissing the UI and calling the stop process APIs.

#### FXController

FXController is an open class, which helps the container app provide custom component screens to the renderer. It needs to be subclassed for each custom screen.

```
open class FXController: UIViewController {
    
    public var data: [String: Any]?

    open func titleForScreen() -> String? {
        return nil
    }
    
    open func populateUI(data: [String: Any]) {
        
    }
    
    open func updateUI(data: [String: Any]) {
        
    }
    
}
```



* `var data: [String: Any]?`

`data` is a dictionary property, containing the two keys needed by the custom component, `data` and `actions`.&#x20;

* `func titleForScreen() -> String?`

This method is used for setting the screen title. It is called by the renderer when the view controller is displayed.

* `func populateUI(data: [String: Any])`

This method is called by the renderer, after the controller has been presented, when the data is available.

This will happen asynchronously. It is the container app's responsibility to make sure that the initial state of the view controller does not have default/residual values displayed.

* `func updateUI(data: [String: Any])`

This method is called by the renderer when an already displayed view controller needs to update the data shown.

#### FXView

FXView is a protocol that helps the container app provide custom subviews of a generated screen to the renderer. It needs to be implemented by `UIView` instances. Similar to `FXController` it has a data property and a populate method.

```
public protocol FXView: UIView {
    var data: [String: Any]? { get set }
    func populateUI(data: [String: Any]?)
}
```

* `var data: [String: Any]?`

`data` is a dictionary property containing the information needed by the custom view.

* `func populateUI(data: [String: Any]?)`

This method is called by the renderer after the screen containing the view has been displayed.

It is the container app's responsibility to make sure that the initial state of the view does not have default/residual values displayed.

**NOTE:** It is mandatory for views implementing the FXView protocol to provide the intrinsic content size. Sample:

```
override var intrinsicContentSize: CGSize {
    return CGSize(width: UIScreen.main.bounds.width, height: 100)
}
```