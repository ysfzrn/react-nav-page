package com.reactnavpage

import android.content.res.Resources
import android.graphics.Color
import kotlin.math.roundToInt


fun dpToPx(dp: Double): Int {
  return (dp.roundToInt() * Resources.getSystem().displayMetrics.density).roundToInt()
    .toInt()
}

fun pxToDp(px: Int): Float {
  val displayMetrics = Resources.getSystem().displayMetrics
  return px / displayMetrics.density
}

fun navigationStateUpdate(activity: ReactNavPageActivity, eventType: String){
  val currentTab = ReactNavPageModule.navigationValues.getSelectedTab()
  val navController = ReactNavPageModule.navigationValues.getCurrentNavController()
  val currentRouteTag = navController.currentDestination?.label
  val currentRoute = navController.currentBackStackEntry?.destination?.route

  if(eventType == "root"){
    ReactNavPageModule.navigationValues.setSelectedTab(0)
    ReactNavPageModule.navigationValues.getSelectedTab()
    activity.navigationState.clear()
    activity.navigationState[currentTab.toString()] = mutableListOf()
    val newRouteMap = mutableMapOf<String, String>()
    newRouteMap["routeName"] = currentRoute.toString()
    newRouteMap["tag"] = currentRouteTag.toString()
    activity.navigationState[currentTab.toString()]?.add(newRouteMap)
  }else if(eventType == "push"){
    val newRouteMap = mutableMapOf<String, String>()
    newRouteMap["routeName"] = currentRoute.toString()
    newRouteMap["tag"] = currentRouteTag.toString()
    activity.navigationState[currentTab.toString()]?.add(newRouteMap)
  }else if(eventType == "pop"){
    activity.navigationState[currentTab.toString()]?.let { routeList ->
      if (routeList.isNotEmpty()) {
        if(routeList.size > 1){
          routeList.removeAt(routeList.size - 1)
        }else{
          val currentTabKey = findRouteKeyForPage(currentRoute.toString(), activity.navigationState)
          currentTabKey?.toInt()?.let { ReactNavPageModule.navigationValues.changeTab(it) }
        }
      }
    }
  }else if(eventType == "changeTab"){
    if (!activity.navigationState.containsKey(currentTab.toString())) {
      activity.navigationState[currentTab.toString()] = mutableListOf()
      val newRouteMap = mutableMapOf<String, String>()
      newRouteMap["routeName"] = currentRoute.toString()
      newRouteMap["tag"] = currentRouteTag.toString()
      activity.navigationState[currentTab.toString()]?.add(newRouteMap)
    }
  }
}


fun findRouteKeyForPage(pageName: String, navigationState: MutableMap<String, MutableList<Map<String, String>>>): String? {
  for ((key, value) in navigationState) {
    for (item in value) {
      if (item["routeName"] == pageName) {
        return key
      }
    }
  }
  return null
}

fun getColorWithAlpha(color: Int, ratio: Float): Int {
  var newColor = 0
  val alpha = Math.round(Color.alpha(color) * ratio)
  val r = Color.red(color)
  val g = Color.green(color)
  val b = Color.blue(color)
  newColor = Color.argb(alpha, r, g, b)
  return newColor
}
