package com.reactnavpage

import android.content.res.Resources
import kotlin.math.roundToInt

fun dpToPx(dp: Double): Int {
  return (dp.roundToInt() * Resources.getSystem().displayMetrics.density).roundToInt()
    .toInt()
}

fun navigationStateUpdate(activity: ReactNavPageActivity, eventType: String){
  val currentTab = ReactNavPageModule.navigationValues.getSelectedTab()
  val navController = ReactNavPageModule.navigationValues.getCurrentNavController()
  var currentRoute = navController.currentBackStackEntry?.destination?.route

  if(eventType == "root"){
    ReactNavPageModule.navigationValues.setSelectedTab(0)
    ReactNavPageModule.navigationValues.getSelectedTab()
    activity.navigationState.clear()
    activity.navigationState[currentTab.toString()] = mutableListOf()
    val newRouteMap = mutableMapOf<String, String>()
    newRouteMap["routeName"] = currentRoute.toString()
    activity.navigationState[currentTab.toString()]?.add(newRouteMap)
  }else if(eventType == "push"){
    val newRouteMap = mutableMapOf<String, String>()
    newRouteMap["routeName"] = currentRoute.toString()
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
