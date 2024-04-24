package com.reactnavpage

import android.annotation.SuppressLint
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.Toolbar
import androidx.fragment.app.Fragment
import androidx.navigation.NavController.OnDestinationChangedListener
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import com.facebook.react.ReactActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.google.android.material.appbar.AppBarLayout
import com.google.android.material.bottomnavigation.BottomNavigationView


open class ReactNavPageActivity: ReactActivity() {
  private val eventManager = EventManager();
  private var currentStackType: String = "STACK"
  var navigationState: MutableMap<String, MutableList<Map<String, String>>> = mutableMapOf()
  private lateinit var appBarConfiguration: AppBarConfiguration



  @SuppressLint("MissingInflatedId")
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
    postponeEnterTransition()
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

  open fun setActionBar(appBarConfiguration: AppBarConfiguration){
    val toolbar = findViewById<androidx.appcompat.widget.Toolbar>(R.id.my_toolbar)
    setSupportActionBar(toolbar)
    val navController = ReactNavPageModule.navigationValues.getCurrentNavController()
    setupActionBarWithNavController(navController, appBarConfiguration)
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
    val currentLabel = navController.currentDestination?.label
    if (currentRoute != null) {
      val currentTab = ReactNavPageModule.navigationValues.getSelectedTab()
      navigationState[currentTab.toString()]?.let { routeList ->
        if (routeList.isNotEmpty()) {
          if(routeList.size > 1){
            ReactNavPageModule.navigationValues.removeReactRootView(currentLabel.toString())
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

      val params = Arguments.createMap().apply {
        putString("routeName", route)
      }

      val handler = Handler(Looper.getMainLooper())
      handler.postDelayed({
        eventManager.sendEvent(reactContext as ReactApplicationContext?, "onRouteChange", params)
      }, 100)
    }
}
