package com.reactnavpage

import android.content.Context
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.transition.TransitionInflater
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.facebook.react.ReactRootView
import com.facebook.react.bridge.Arguments

class StackFragment: Fragment() {
  private var reactRootView: ReactRootView? = null
  private var tag: String = ""

  override fun onAttach(context: Context) {
    super.onAttach(context)
    val screenParams = arguments?.getBundle("params")
    val sharedID = screenParams?.getString("sharedID")
    if(sharedID != null){
      activity?.postponeEnterTransition()
      postponeEnterTransition()
    }
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val screenParams = arguments?.getBundle("params")
    val sharedID = screenParams?.getString("sharedID")
    if(sharedID != null){
      sharedElementEnterTransition = TransitionInflater.from(context).inflateTransition(R.transition.shared_transition)
    }
  }



  override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View? {
    val destination = findNavController().currentBackStackEntry?.destination
    val currentRoute = destination?.route
    val destinationLabel = destination?.label
    val screenParams = arguments?.getBundle("params")

    val params = screenParams?.getBundle("params")
    val title = screenParams?.getString("title")
    var screenNavOptions = screenParams?.getBundle("navOptions")

    if (title != null) {
      Log.d("screenNavOptions", title)
    }

    if(screenNavOptions == null){
      screenNavOptions = Arguments.toBundle(getConfigMap())
    }
    Log.d("screenNavOptions", screenNavOptions.toString())

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
      startPostponedEnterTransition()
    }, 100)

  }


  override fun onDestroy() {
    super.onDestroy()
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
