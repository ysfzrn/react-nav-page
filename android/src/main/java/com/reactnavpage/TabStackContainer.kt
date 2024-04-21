package com.reactnavpage

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.Menu
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.NavArgumentBuilder
import androidx.navigation.NavDestination
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavOptions
import androidx.navigation.createGraph
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.fragment.fragment
import androidx.navigation.ui.setupWithNavController
import com.facebook.react.ReactRootView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.google.android.material.bottomnavigation.BottomNavigationView


class TabStackContainer(
  val stacks: ReadableMap?,
  private val tabBar: ReadableMap?,
  private val initialProps: ReadableMap?
): Fragment(), NavigationValues.TabChangeListener {
  private val eventManager = EventManager();
  private lateinit var tabs: ReadableArray
  private lateinit var customTabBar:ReactRootView
  private lateinit var bottomNavigationView:BottomNavigationView

  override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View? {
    ReactNavPageModule.navigationValues.addTabListener(this)
    val layout = inflater.inflate(R.layout.tabbar_layout, container, false);
    bottomNavigationView = layout.findViewById<BottomNavigationView>(R.id.bottomNavigationView)
    val navHostFragment = childFragmentManager.findFragmentById(R.id.tab_nav_container) as NavHostFragment
    val navController = navHostFragment.navController

    val newTabs = stacks?.getArray("tabs")
    if (newTabs != null) {
      tabs = newTabs
    }
    val tabBarName = tabBar?.getString("tabBarComponentName")
    val tabBarHeight = tabBar?.getDouble("tabBarHeight")
    if (tabBarHeight != null) {
      createBottomNavigationView(bottomNavigationView,  tabBarHeight, tabBarName)
    }


    val startDestination = tabs.getMap(0).getString("routeName")
    val mainNavGraph = navController.navInflater.inflate(R.navigation.nav_graph)
    mainNavGraph.setStartDestination(startDestination!!)


    for (i in 0 until tabs.size()) {
      val tab= tabs.getMap(i)
      val tabRoute = tab.getString("routeName")
      val bundle = Bundle()
      val screenProps = Arguments.toBundle(initialProps);
      bundle.putBundle("params", screenProps);
      bottomNavigationView.menu.add(Menu.NONE, i, Menu.NONE, "")

      val argumentBuilder = NavArgumentBuilder();
      argumentBuilder.defaultValue = bundle
      val argument = argumentBuilder.build()


      val navGraph = navController.createGraph(
        startDestination = tabRoute!!,
      ) {
        fragment<StackFragment>(route = tabRoute){
          label = tabRoute
          argument("params") {
            this.defaultValue = bundle
          }
        }
      }

      mainNavGraph.addAll(navGraph)
    }
    navController.setGraph(mainNavGraph, null)

    ReactNavPageModule.navigationValues.setCurrentNavController(navController)
    ReactNavPageModule.navigationValues.setTabNavController(navController)

    return layout
  }

  private fun createBottomNavigationView(
    bottomNavigationView: BottomNavigationView,
    tabBarHeight: Double,
    tabBarName: String?
  ){
    val layoutParams = bottomNavigationView.layoutParams
    layoutParams.height = dpToPx(tabBarHeight)
    bottomNavigationView.layoutParams = layoutParams

    val reactInstanceManager = ReactNavPageModule.navigationValues.getReactInstance()
    customTabBar = ReactRootView(context)
    customTabBar.setIsFabric(true)
    customTabBar.startReactApplication(reactInstanceManager, tabBarName, null)
    bottomNavigationView.addView(customTabBar)
  }

  override fun onDestroy() {
    super.onDestroy()
    customTabBar.unmountReactApplication()
  }

  override fun onChangeTab(index: Int) {
    val params = Arguments.createMap().apply {
      putInt("tabIndex", index)
    }
    val reactContext = ReactNavPageModule.navigationValues.getReactInstance().currentReactContext
    eventManager.sendEvent(reactContext as ReactApplicationContext?, "onTabChange", params)

    bottomNavigationView.selectedItemId = index
    val currentNavController = ReactNavPageModule.navigationValues.getCurrentNavController()
    val destinationId = currentNavController.graph.findStartDestination().id

    val tab = tabs.getMap(index)
    val tabRoute = tab.getString("routeName")

    val builder = NavOptions.Builder().setLaunchSingleTop(true).setRestoreState(true)
    builder.setPopUpTo(
      destinationId,
      inclusive = false,
      saveState = true
    )


    builder.setEnterAnim(androidx.navigation.ui.R.anim.nav_default_enter_anim)
    builder.setExitAnim(androidx.navigation.ui.R.anim.nav_default_exit_anim)
    builder.setPopEnterAnim(androidx.navigation.ui.R.anim.nav_default_pop_enter_anim)
    builder.setPopExitAnim(androidx.navigation.ui.R.anim.nav_default_pop_exit_anim)


    val options = builder.build()

    if (tabRoute != null) {
      try {
        activity?.postponeEnterTransition()
        currentNavController.navigate(tabRoute, options)
      } catch (e: IllegalArgumentException) {
        val name = NavDestination.getDisplayName(currentNavController.context, destinationId)
        Log.i(
          "TAB_STACK",
          "Ignoring onNavDestinationSelected for MenuItem $name as it cannot be found " +
            "from the current destination ${currentNavController.currentDestination}",
          e
        )
      }
    }
  }
}
