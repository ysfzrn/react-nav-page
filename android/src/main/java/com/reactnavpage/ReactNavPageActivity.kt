package com.reactnavpage

import android.content.res.Resources
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.util.SparseArray
import android.view.Menu
import androidx.fragment.app.Fragment
import androidx.fragment.app.commit
import androidx.navigation.NavArgumentBuilder
import androidx.navigation.NavController
import androidx.navigation.NavController.OnDestinationChangedListener
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavOptions
import androidx.navigation.createGraph
import androidx.navigation.findNavController
import androidx.navigation.fragment.FragmentNavigator
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import com.facebook.react.ReactActivity
import com.facebook.react.ReactRootView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.google.android.material.bottomnavigation.BottomNavigationView
import kotlin.math.roundToInt


open class ReactNavPageActivity: ReactActivity() {
  private val eventManager = EventManager();
  private var currentStackType: String = "STACK"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_layout)
    ReactNavPageModule.navigationValues.setReactInstance(reactInstanceManager)

    val splashFragment = mainComponentName?.let { StackContainer(it) }
    if (splashFragment != null) {
      supportFragmentManager.beginTransaction()
        .add(R.id.main_container, splashFragment, mainComponentName).commitNow()
    }
  }

  open fun setRoot(type: String?, routeName: String, stacks: ReadableMap?, tabBar: ReadableMap?, initialProps: ReadableMap?){
    if(type == "STACK"){
      ReactNavPageModule.navigationValues.clearReactRootViews()
      val stackFragment = StackContainer(routeName)
      loadFragment(stackFragment, "STACK")
      currentStackType = "STACK"
    }else if(type == "TAB_STACK"){
      ReactNavPageModule.navigationValues.clearReactRootViews()
      val tabStackFragment = TabStackContainer(stacks, tabBar, initialProps)
      loadFragment(tabStackFragment, "TAB_STACK")
      currentStackType = "TAB_STACK"
    }
    ReactNavPageModule.navigationValues.getCurrentNavController().removeOnDestinationChangedListener(routeChangeListener)
    ReactNavPageModule.navigationValues.getCurrentNavController().addOnDestinationChangedListener(routeChangeListener)
  }

  private fun loadFragment(stackFragment: Fragment, tag:String){
    supportFragmentManager.beginTransaction()
      .setReorderingAllowed(true)
      .setCustomAnimations(
        androidx.navigation.ui.R.anim.nav_default_enter_anim,
        androidx.navigation.ui.R.anim.nav_default_exit_anim,
        androidx.navigation.ui.R.anim.nav_default_pop_enter_anim,
        androidx.navigation.ui.R.anim.nav_default_pop_exit_anim)
      .replace(R.id.main_container, stackFragment, tag)
      .commitNow()
  }

  override fun invokeDefaultOnBackPressed() {
    //super.invokeDefaultOnBackPressed()
    if(!onSupportNavigateUp()){
      this.finish()
    }
  }

  override fun onDestroy() {
    super.onDestroy()
    ReactNavPageModule.navigationValues.clearReactRootViews()
  }

  override fun onSupportNavigateUp(): Boolean {
    return onBackHandler()
      || super.onSupportNavigateUp()
  }

  private fun onBackHandler(): Boolean {
    val currentRoute = ReactNavPageModule.navigationValues.getCurrentRoute()
    if (currentRoute != null) {
      ReactNavPageModule.navigationValues.removeReactRootView(currentRoute)
    }
    val navController = ReactNavPageModule.navigationValues.getCurrentNavController()
    navController.popBackStack()
    return true
  }

  private val routeChangeListener =
    OnDestinationChangedListener { controller, destination, arguments ->
      val route = destination.route.toString()
      val reactContext = ReactNavPageModule.navigationValues.getReactInstance().currentReactContext
      Log.d("onRouteChange", route)
      val params = Arguments.createMap().apply {
        putString("routeName", route)
      }

      val handler = Handler(Looper.getMainLooper())
      handler.postDelayed({
        eventManager.sendEvent(reactContext as ReactApplicationContext?, "onRouteChange", params)
      }, 100)
    }
}
