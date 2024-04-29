package com.reactnavpage

import android.graphics.Color
import android.os.Bundle
import android.widget.RelativeLayout
import androidx.navigation.NavArgumentBuilder
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavOptions
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

  override fun setRoot(
    type: String?,
    routeName: String?,
    title: String?,
    initialProps: ReadableMap?,
    navOptions: ReadableMap?,
    tabBar: ReadableMap?,
    stacks: ReadableMap?
  ) {
    UiThreadUtil.runOnUiThread {
      if (currentActivity != null) {
        val currentActivity = currentActivity as ReactNavPageActivity
        if (routeName != null) {
          currentActivity.setRoot(type, routeName, stacks, tabBar, initialProps, title, navOptions)
        }
      }
    }
  }


  override fun changeTab(index: Double) {
    UiThreadUtil.runOnUiThread(Runnable {
      val currentActivity = currentActivity as ReactNavPageActivity
      navigationValues.changeTab(index.toInt())
      navigationStateUpdate(currentActivity, "changeTab")
    })
  }

  override fun push(
    routeName: String?,
    title: String?,
    navOptions: ReadableMap?,
    params: ReadableMap?
  ) {
    UiThreadUtil.runOnUiThread(Runnable {
      val currentActivity = currentActivity as ReactNavPageActivity
      val navController = navigationValues.getCurrentNavController()
      val navigator = navController.navigatorProvider.getNavigator(FragmentNavigator::class.java);
      val bundle = Bundle()

      val screenNavOptions = Arguments.toBundle(navOptions);
      val screenProps = Arguments.toBundle(params);

      bundle.putBundle("params", screenProps);
      bundle.putBundle("navOptions", screenNavOptions)
      bundle.putString("title", title)

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
          currentActivity.postponeEnterTransition()
          navController.navigate(routeName, options )
          navigationStateUpdate(currentActivity, "push")
        }
      }

    })
  }


  override fun pop() {
    UiThreadUtil.runOnUiThread(Runnable {
      val currentActivity = currentActivity as ReactNavPageActivity
      val currentRoute = navigationValues.getCurrentRoute()
      val navController = navigationValues.getCurrentNavController()
      val currentRouteTag = navController.currentDestination?.label

      if (currentRouteTag != null) {
        navigationValues.removeReactRootView(currentRouteTag.toString())
      }
      navController.popBackStack()
      navigationStateUpdate(currentActivity, "pop")
    })
  }

  override fun addListener(eventName: String?) = Unit;

  override fun removeListeners(count: Double) = Unit;
  override fun setNavBarAlpha(alpha: Double) {
    val appBarContainer = currentActivity?.findViewById<RelativeLayout>(R.id.appBarContainer)
    appBarContainer?.setBackgroundColor(getColorWithAlpha(
      Color.parseColor("#2196F3"),
      alpha.toFloat()
    ))
  }

  companion object {
    const val NAME = "ReactNavPage"
    val navigationValues = NavigationValues()
  }
}
