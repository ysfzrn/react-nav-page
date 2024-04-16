package com.reactnavpage

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.createGraph
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.fragment.fragment

class StackContainer(
  private val routeName:String
): Fragment() {
  private var created = false
  private var layout: View? = null
  override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View? {
    if(created){
      return  layout
    }
    layout = inflater.inflate(R.layout.stack_layout, container, false);
    return layout
  }


  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    val navHostFragment = childFragmentManager.findFragmentById(R.id.nav_host) as NavHostFragment
    val navController = navHostFragment.navController
    val params = Bundle()
    val newGraph = navController.createGraph(
      startDestination = routeName
    ) {
      fragment<StackFragment>(route = routeName){
        label = routeName
        argument("params") {
          this.defaultValue = params
        }
      }
    }
    navController.setGraph(newGraph, null)
    ReactNavPageModule.navigationValues.setCurrentNavController(navController)
  }
}
