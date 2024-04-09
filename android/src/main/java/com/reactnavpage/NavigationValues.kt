package com.reactnavpage

import com.facebook.react.ReactInstanceManager

class NavigationValues {
  private lateinit var reactInstanceManager: ReactInstanceManager

  fun setReactInstance(instance: ReactInstanceManager){
    this.reactInstanceManager = instance
  }

  fun getReactInstance(): ReactInstanceManager{
    return this.reactInstanceManager
  }
}
