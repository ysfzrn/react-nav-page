package com.reactnavpage

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

open class EventManager {
  fun sendEvent(reactContext: ReactApplicationContext?, eventName: String, params: WritableMap?) {
    println("sendEvent $eventName $params")
    reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit(eventName, params)
  }
}
