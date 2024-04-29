package com.reactnavpage

import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap


object GlobalConfig {
  var hederNavBarAlpha: Double = 1.0
  var headerShow: Boolean = true
  var headerTransparent: Boolean = false
  var headerBackgroundColor:String = "#9c27b0"

  fun getConfig(): HashMap<String, Any> {
    return hashMapOf(
      "hederNavBarAlpha" to hederNavBarAlpha,
      "headerShow" to headerShow,
      "headerTransparent" to headerTransparent,
      "headerBackgroundColor" to headerBackgroundColor
    )
  }

  fun setConfig(config: HashMap<String, Any>) {
    hederNavBarAlpha = config["hederNavBarAlpha"] as? Double ?: hederNavBarAlpha
    headerShow = config["headerShow"] as? Boolean ?: headerShow
    headerTransparent = config["headerTransparent"] as? Boolean ?: headerTransparent
    headerBackgroundColor = config["headerBackgroundColor"] as? String ?: headerBackgroundColor
  }
}

fun getConfigMap(): WritableNativeMap {
  val config = WritableNativeMap()
  config.putDouble("hederNavBarAlpha", GlobalConfig.hederNavBarAlpha)
  config.putBoolean("headerShow", GlobalConfig.headerShow)
  config.putBoolean("headerTransparent", GlobalConfig.headerTransparent)
  config.putString("headerBackgroundColor", GlobalConfig.headerBackgroundColor)

  return config
}

