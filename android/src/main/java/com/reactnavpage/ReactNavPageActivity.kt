package com.reactnavpage

import android.graphics.Color
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.FrameLayout
import android.widget.RelativeLayout
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.NavController.OnDestinationChangedListener
import com.facebook.react.ReactActivity
import com.facebook.react.ReactRootView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeMap
import com.google.android.material.appbar.AppBarLayout


open class ReactNavPageActivity: ReactActivity() {
  private val eventManager = EventManager();
  private var titleRootView: ReactRootView? = null
  private var leftButtonView: ReactRootView? = null
  private var currentStackType: String = "STACK"
  var navigationState: MutableMap<String, MutableList<Map<String, String>>> = mutableMapOf()


  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_layout)
    ReactNavPageModule.navigationValues.setReactInstance(reactInstanceManager)

    val config = WritableNativeMap()
    config.putDouble("hederNavBarAlpha", 0.0)
    config.putBoolean("headerShow", false)
    config.putBoolean("headerTransparent", false)
    config.putString("headerBackgroundColor", GlobalConfig.headerBackgroundColor)

    val initialProps = WritableNativeMap()

    val splashFragment = mainComponentName?.let { StackContainer(it, "", config, initialProps) }
    if (splashFragment != null) {
      supportFragmentManager.beginTransaction()
        .add(R.id.main_container, splashFragment, mainComponentName).commitNow()
    }
  }

  open fun setRoot(
    type: String?,
    routeName: String,
    stacks: ReadableMap?,
    tabBar: ReadableMap?,
    initialProps: ReadableMap?,
    title: String?,
    navOptions: ReadableMap?
  ){
    postponeEnterTransition()
    if(type == "STACK"){
      ReactNavPageModule.navigationValues.clearReactRootViews()
      val stackFragment = StackContainer(routeName, title, navOptions, initialProps)
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
      //.setReorderingAllowed(true)
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
      val destinationLabel = destination.label
      if (arguments != null) {
        setAppBar(arguments, route)
      }

      val reactContext = ReactNavPageModule.navigationValues.getReactInstance().currentReactContext

      val params = Arguments.createMap().apply {
        putString("routeName", route)
      }

      val handler = Handler(Looper.getMainLooper())
      handler.postDelayed({
        eventManager.sendEvent(reactContext as ReactApplicationContext?, "onRouteChange", params)
      }, 100)
    }

  private fun setAppBar(arguments: Bundle, route: String) {
    val reactInstanceManager = ReactNavPageModule.navigationValues.getReactInstance()
    val appBarContainer = findViewById<RelativeLayout>(R.id.appBarContainer)
    appBarContainer.removeAllViews()
    if(leftButtonView != null){
      leftButtonView!!.unmountReactApplication()
    }
    if(titleRootView != null){
      titleRootView!!.unmountReactApplication()
    }
    val screenParams = arguments.getBundle("params")
    val params = screenParams?.getBundle("params")
    val title = screenParams?.getString("title")
    val screenNavOptions = screenParams?.getBundle("navOptions")
    val headerHeight = GlobalConfig.headerHeight
    val headerShow = screenNavOptions?.getBoolean("headerShow", GlobalConfig.headerShow) ?: GlobalConfig.headerShow
    Log.d("headerShow", "$headerShow-${GlobalConfig.headerShow}")
    if(!headerShow){
      return
    }

    val backStackDisabled = screenParams?.getBoolean("backStackDisabled", false) ?: false
    val headerBackgroundColor = screenNavOptions?.getString("headerBackgroundColor", GlobalConfig.headerBackgroundColor) ?: GlobalConfig.headerBackgroundColor
    appBarContainer.setBackgroundColor(getColorWithAlpha(Color.parseColor(headerBackgroundColor),
      1.0F
    ))
    val headerTransparent = screenNavOptions?.getBoolean("headerTransparent", GlobalConfig.headerTransparent) ?: GlobalConfig.headerTransparent
    if(headerTransparent){
      appBarContainer.setBackgroundColor(getColorWithAlpha(Color.parseColor(headerBackgroundColor),
        0.0F
      ))
    }


    if(!backStackDisabled){
      val initialProps = Bundle()
      initialProps.putString("title", title)
      initialProps.putString("routeName", route)
      val layoutParams =
        FrameLayout.LayoutParams(dpToPx(50.0), dpToPx(headerHeight))

      leftButtonView = ReactRootView(this)
      leftButtonView!!.setIsFabric(true)
      leftButtonView!!.layoutParams = layoutParams
      leftButtonView!!.startReactApplication(reactInstanceManager, "LeftButtonView", initialProps)

      appBarContainer?.addView(leftButtonView, 0)
    }

    val initialProps = Bundle()
    initialProps.putString("title", title)
    val layoutParams =
      FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, dpToPx(headerHeight))

    titleRootView = ReactRootView(this)
    titleRootView!!.setIsFabric(true)
    titleRootView!!.layoutParams = layoutParams
    titleRootView!!.startReactApplication(reactInstanceManager, "TitleView", initialProps)
    appBarContainer?.addView(titleRootView)
  }
}
