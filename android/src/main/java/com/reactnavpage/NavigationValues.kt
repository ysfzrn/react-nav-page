package com.reactnavpage

import androidx.navigation.NavController
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactRootView
import java.lang.ref.WeakReference

class NavigationValues {
  private lateinit var reactInstanceManager: ReactInstanceManager
  private lateinit var currentNavController: NavController
  private lateinit var currentRoute: String
  private lateinit var tabNavController: NavController
  private var listener = WeakReference<TabChangeListener>(null)
  private var selectedTab: Int = 0
  private val reactRootViews = mutableMapOf<String, ReactRootView>()

  fun putReactRootView(tag:String, reactRootView: ReactRootView){
    reactRootViews[tag] = reactRootView
  }

  fun getReactRootView(tag: String): ReactRootView? {
    return reactRootViews[tag]
  }

  fun getReactRootViews(): MutableMap<String, ReactRootView> {
    return reactRootViews
  }
  fun removeReactRootView(tag: String) {
    val reactRootView = getReactRootView(tag)
    //reactRootView?.unmountReactApplication()
    reactRootViews.remove(tag)
  }

  fun clearReactRootViews() {
    val tagsToRemove = mutableListOf<String>()
    reactRootViews.forEach { (tag, _) ->
      tagsToRemove.add(tag)
    }
    tagsToRemove.forEach { tag ->
      removeReactRootView(tag)
    }
  }


  fun setReactInstance(instance: ReactInstanceManager){
    this.reactInstanceManager = instance
  }

  fun getReactInstance(): ReactInstanceManager{
    return this.reactInstanceManager
  }

  fun setCurrentNavController(navController: NavController){
    this.currentNavController = navController
  }

  fun getCurrentNavController(): NavController{
    return this.currentNavController
  }

  fun setTabNavController(navController: NavController){
    this.tabNavController = navController
  }

  fun getTabNavController(): NavController{
    return this.tabNavController
  }

  fun addTabListener(listener: TabStackContainer){
    this.listener = WeakReference(listener)
  }


  fun changeTab(index: Int){
    this.selectedTab = index
    listener.get()?.onChangeTab(index)
  }


  fun getCurrentRoute(): String? {
    val currentNavController = getCurrentNavController()
    return currentNavController.currentDestination?.route
  }

  fun getSelectedTab(): Int{
    return this.selectedTab
  }

  fun setSelectedTab(value: Int){
    this.selectedTab = value
  }

  fun interface TabChangeListener{
    fun onChangeTab(index: Int)
  }
}
