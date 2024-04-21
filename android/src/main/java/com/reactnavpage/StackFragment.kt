package com.reactnavpage

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.fragment.findNavController
import com.facebook.react.ReactRootView
import com.facebook.react.bridge.ReactApplicationContext

class StackFragment: Fragment() {
  private var reactRootView: ReactRootView? = null
  private var tag: String = ""


  override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View? {
    val destination = findNavController().currentBackStackEntry?.destination
    val currentRoute = destination?.route
    val destinationLabel = destination?.label
    val params = arguments?.getBundle("params")
    val mergedParams = composeLaunchOptions(params!!)
    val reactInstanceManager = ReactNavPageModule.navigationValues.getReactInstance()
    reactRootView = ReactNavPageModule.navigationValues.getReactRootView(destinationLabel.toString())

    if(reactRootView != null){
      reactRootView!!.setIsFabric(true)
      reactRootView!!.fitsSystemWindows = true
      tag = reactRootView!!.rootViewTag.toString()
      return reactRootView
    }

    reactRootView = ReactRootView(requireContext())
    reactRootView!!.setIsFabric(true)
    reactRootView?.startReactApplication(reactInstanceManager, currentRoute, mergedParams)
    reactRootView!!.fitsSystemWindows = true
    val rootViewTag = reactRootView!!.rootViewTag.toString()
    ReactNavPageModule.navigationValues.putReactRootView(rootViewTag, reactRootView!!)
    findNavController().currentDestination?.label = reactRootView!!.rootViewTag.toString()
    tag = rootViewTag;

    return  reactRootView
  }

  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    val handler = Handler(Looper.getMainLooper())
    handler.postDelayed({
      activity?.startPostponedEnterTransition()
    }, 300)
  }


  override fun onDestroy() {
    super.onDestroy()
    //reactRootView?.unmountReactApplication()
    val reactRootViews = ReactNavPageModule.navigationValues.getReactRootViews()
    if(!reactRootViews.containsKey(tag)){
      val handler = Handler(Looper.getMainLooper())
      handler.postDelayed({
        reactRootView?.unmountReactApplication()
      }, 500)
    }
  }

  private fun composeLaunchOptions(params: Bundle): Bundle? {
    val composedLaunchOptions: Bundle = params
    composedLaunchOptions.putBoolean("concurrentRoot", true)
    return composedLaunchOptions
  }
}
