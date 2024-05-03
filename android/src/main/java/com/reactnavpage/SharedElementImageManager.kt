package com.reactnavpage

import android.graphics.Color
import android.net.Uri
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.drawee.view.SimpleDraweeView
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.SharedElementImageManagerInterface

@ReactModule(name = SharedElementImageManager.NAME)
class SharedElementImageManager : SimpleViewManager<SharedElementImage>(),
  SharedElementImageManagerInterface<SharedElementImage> {

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): SharedElementImage {
    return SharedElementImage(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: SharedElementImage?, color: String?) {

  }

  @ReactProp(name = "sharedID")
  override fun setSharedID(view: SharedElementImage?, sharedID: String?) {
    if (sharedID != null) {
      view?.transitionName = sharedID
    }
  }

  @ReactProp(name = "source")
  override fun setSource(view: SharedElementImage?, value: ReadableMap?) {
    val uri = value?.getString("uri");
    val local = value?.getBoolean("local");

    if (uri != null && local != null) {
      view?.setSource(value)
    }
  }


  companion object {
    const val NAME = "SharedElementImage"
  }


}
