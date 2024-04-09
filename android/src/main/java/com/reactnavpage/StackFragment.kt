package com.reactnavpage

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.facebook.react.ReactRootView

class StackFragment: Fragment() {
  private var reactRootView: ReactRootView? = null

  override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View? {
    val currentRoute = findNavController().currentBackStackEntry?.destination?.route
    val params = arguments?.getBundle("params")
    val mergedParams = composeLaunchOptions(params!!)

    val reactInstanceManager = ReactNavPageModule.navigationValues.getReactInstance()
    reactRootView = ReactRootView(requireContext())
    reactRootView!!.setIsFabric(true)
    reactRootView?.startReactApplication(reactInstanceManager, currentRoute, mergedParams)
    reactRootView!!.fitsSystemWindows = true
    return  reactRootView
  }

  private fun composeLaunchOptions(params: Bundle): Bundle? {
    val composedLaunchOptions: Bundle = params
    composedLaunchOptions.putBoolean("concurrentRoot", true)
    return composedLaunchOptions
  }
}
