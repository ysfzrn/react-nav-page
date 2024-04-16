package com.reactnavpage

import android.os.Bundle
import androidx.navigation.NavArgumentBuilder
import androidx.navigation.NavController
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavOptions
import androidx.navigation.createGraph
import androidx.navigation.fragment.FragmentNavigator
import androidx.navigation.fragment.fragment
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

  override fun setRoot(
    type: String?,
    routeName: String?,
    initialProps: ReadableMap?,
    stacks: ReadableMap?,
    tabBar: ReadableMap?
  ) {
    UiThreadUtil.runOnUiThread {
      if (currentActivity != null) {
        val currentActivity = currentActivity as ReactNavPageActivity
        if (routeName != null) {
          currentActivity.setRoot(type, routeName, stacks, tabBar, initialProps)
        }
      }
    }
  }

  override fun changeTab(index: Double) {
    UiThreadUtil.runOnUiThread(Runnable {
      navigationValues.changeTab(index.toInt())
    })
  }



   override fun push(routeName: String?, params: ReadableMap?) {
    UiThreadUtil.runOnUiThread(Runnable {
      val currentActivity = currentActivity as ReactNavPageActivity
      val navController = navigationValues.getCurrentNavController()
      val navigator = navController.navigatorProvider.getNavigator(FragmentNavigator::class.java);
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
          //navController.graph.findStartDestination().id
          navController.graph.findStartDestination().id.let {
            builder.setEnterAnim(androidx.navigation.ui.R.anim.nav_default_enter_anim)
            builder.setExitAnim(androidx.navigation.ui.R.anim.nav_default_exit_anim)
            builder.setPopEnterAnim(androidx.navigation.ui.R.anim.nav_default_pop_enter_anim)
            builder.setPopExitAnim(androidx.navigation.ui.R.anim.nav_default_pop_exit_anim)
          }

          val options = builder.build()

          if (routeName != null) {
            navController.navigate(routeName, options )
          }
        }

    })
  }


  override fun pop() {
    UiThreadUtil.runOnUiThread(Runnable {
      val currentRoute = navigationValues.getCurrentRoute()
      if (currentRoute != null) {
        navigationValues.removeReactRootView(currentRoute)
      }
      val navController = navigationValues.getCurrentNavController()
      navController.popBackStack()
    })
  }

  override fun addListener(eventName: String?) = Unit;

  override fun removeListeners(count: Double) = Unit;

  companion object {
    const val NAME = "ReactNavPage"
    val navigationValues = NavigationValues()
  }
}
