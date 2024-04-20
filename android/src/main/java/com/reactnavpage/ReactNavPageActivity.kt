package com.reactnavpage

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.fragment.app.Fragment
import androidx.navigation.NavController.OnDestinationChangedListener
import com.facebook.react.ReactActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.google.android.material.bottomnavigation.BottomNavigationView


open class ReactNavPageActivity: ReactActivity() {
  private val eventManager = EventManager();
  private var currentStackType: String = "STACK"
  var navigationState: MutableMap<String, MutableList<Map<String, String>>> = mutableMapOf()


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
      navigationStateUpdate(this, "root")
    }else if(type == "TAB_STACK"){
      ReactNavPageModule.navigationValues.clearReactRootViews()
      val tabStackFragment = TabStackContainer(stacks, tabBar, initialProps)
      loadFragment(tabStackFragment, "TAB_STACK")
      currentStackType = "TAB_STACK"
      navigationStateUpdate(this, "root")
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
    val navController = ReactNavPageModule.navigationValues.getCurrentNavController()
    val currentRoute = ReactNavPageModule.navigationValues.getCurrentRoute()
    if (currentRoute != null) {
      val currentTab = ReactNavPageModule.navigationValues.getSelectedTab()
      navigationState[currentTab.toString()]?.let { routeList ->
        if (routeList.isNotEmpty()) {
          if(routeList.size > 1){
            ReactNavPageModule.navigationValues.removeReactRootView(currentRoute)
            navController.popBackStack()
          }else{
            navController.popBackStack()
          }
        }
      }
    }
    navigationStateUpdate(this, "pop")
    if(navController.currentBackStackEntry?.id == null){
      this.finish()
    }

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
        Log.d("onRouteChange", navigationState.toString())
      }, 100)
    }
}
