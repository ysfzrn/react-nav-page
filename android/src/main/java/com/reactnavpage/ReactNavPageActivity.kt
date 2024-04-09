package com.reactnavpage

import android.os.Bundle
import androidx.navigation.NavController
import androidx.navigation.createGraph
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.fragment.fragment
import com.facebook.react.ReactActivity

open class ReactNavPageActivity: ReactActivity() {

  private var navHostFragment: NavHostFragment? = null
  var navController: NavController? = null

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
  }

}
