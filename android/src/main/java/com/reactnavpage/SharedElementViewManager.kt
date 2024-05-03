package com.reactnavpage

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.SharedElementViewManagerInterface
import com.facebook.react.views.view.ReactClippingViewManager
import com.facebook.react.views.view.ReactViewGroup

@ReactModule(name = SharedElementViewManager.NAME)
class SharedElementViewManager : ReactClippingViewManager<ReactViewGroup>(),
  SharedElementViewManagerInterface<ReactViewGroup> {

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): ReactViewGroup {
    return ReactViewGroup(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: ReactViewGroup?, color: String?) {
    view?.backgroundColor = Color.parseColor(color)
  }

  @ReactProp(name = "sharedID")
  override fun setSharedID(view: ReactViewGroup?, sharedID: String?) {
    if (sharedID != null) {
      view?.transitionName = sharedID
      view?.isTransitionGroup = true
    }
  }

  companion object {
    const val NAME = "SharedElementView"
  }
}
