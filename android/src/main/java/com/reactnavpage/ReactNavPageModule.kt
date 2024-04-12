package com.reactnavpage

import android.os.Bundle
import androidx.navigation.NavArgumentBuilder
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavOptions
import androidx.navigation.findNavController
import androidx.navigation.fragment.FragmentNavigator
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = ReactNavPageModule.NAME)
class ReactNavPageModule(reactContext: ReactApplicationContext) :
  NativeReactNavPageSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }



  override fun setRoot(routeName: String?) {
    UiThreadUtil.runOnUiThread(Runnable {
      if(currentActivity != null){
        val currentActivity = currentActivity as ReactNavPageActivity
        if (routeName != null) {
          currentActivity.setRoot(routeName)
        }
      }
    })
  }

   override fun push(routeName: String?, params: ReadableMap?) {
    UiThreadUtil.runOnUiThread(Runnable {
      val currentActivity = currentActivity as ReactNavPageActivity
      val navController = currentActivity.navController
      val navigator = navController?.navigatorProvider?.getNavigator(FragmentNavigator::class.java);

      val bundle = Bundle()
      val screenProps = Arguments.toBundle(params);
      bundle.putBundle("params", screenProps);

      val argumentBuilder = NavArgumentBuilder();
      argumentBuilder.defaultValue = bundle
      val argument = argumentBuilder.build()

      val destination = navigator?.createDestination()
      destination?.route = routeName
      destination?.label = routeName
      destination?.addArgument("params", argument)
      destination?.setClassName(StackFragment::class.java.name)

      if (destination != null) {
        navController.graph.addDestination(destination)
        val builder = NavOptions.Builder()
        navController.graph.findStartDestination().id

        val options = builder.build()
        currentActivity.postponeEnterTransition()
        if (routeName != null) {
          navController.navigate(routeName, options )
        }
      }
    })
  }

  override fun pop() {
    UiThreadUtil.runOnUiThread(Runnable {
      val currentActivity = currentActivity as ReactNavPageActivity
      val navController = currentActivity.navController
      navController?.popBackStack()
    })
  }

  override fun addListener(eventName: String?) = Unit;

  override fun removeListeners(count: Double) = Unit;

  companion object {
    const val NAME = "ReactNavPage"
    val navigationValues = NavigationValues()
  }
}
