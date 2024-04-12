package com.reactnavpage

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.navigation.NavController
import androidx.navigation.NavDestination
import androidx.navigation.createGraph
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.fragment.fragment
import com.facebook.react.ReactActivity
import androidx.navigation.NavController.OnDestinationChangedListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext


open class ReactNavPageActivity: ReactActivity() {

  private var navHostFragment: NavHostFragment? = null
  var navController: NavController? = null
  private val eventManager = EventManager();

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_layout)
    ReactNavPageModule.navigationValues.setReactInstance(reactInstanceManager)
    navHostFragment = supportFragmentManager.findFragmentById(R.id.nav_host) as NavHostFragment
    navController = navHostFragment!!.navController

    val params = Bundle()

    navController?.graph = navController?.createGraph(
      startDestination = mainComponentName!!
    ) {
      fragment<StackFragment>(mainComponentName!!)
      argument("params") {
        this.defaultValue = params
      }
    }!!
  }

  open fun setRoot(routeName:String){
    val params = Bundle()
    val newGraph = navController?.createGraph(
      startDestination = routeName
    ) {
      fragment<StackFragment>(route = routeName){
        label = routeName
        argument("params") {
          this.defaultValue = params
        }
      }
    }!!
    navController!!.setGraph(newGraph, null)
    navController?.removeOnDestinationChangedListener(routeChangeListener)
    navController?.addOnDestinationChangedListener(routeChangeListener)
  }

  private val routeChangeListener =
    OnDestinationChangedListener { controller, destination, arguments ->
      val reactContext = ReactNavPageModule.navigationValues.getReactInstance().currentReactContext
      val params = Arguments.createMap().apply {
        putString("routeName", destination.route.toString())
      }

      val handler = Handler(Looper.getMainLooper())
      handler.postDelayed({
        eventManager.sendEvent(reactContext as ReactApplicationContext?, "onRouteChange", params)
      }, 100)
    }
}
