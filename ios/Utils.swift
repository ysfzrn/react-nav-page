//
//  Utils.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 13.04.2024.
//

import Foundation
import React

//https://stackoverflow.com/a/31215012
func getTopViewController()->UIViewController{
    return topViewControllerWithRootViewController(rootViewController: UIApplication.shared.keyWindow!.rootViewController!)
}
func topViewControllerWithRootViewController(rootViewController:UIViewController)->UIViewController{
    if rootViewController is UITabBarController{
        let tabBarController = rootViewController as! UITabBarController
        return topViewControllerWithRootViewController(rootViewController: tabBarController.selectedViewController!)
    }
    if rootViewController is UINavigationController{
        let navBarController = rootViewController as! UINavigationController
        return topViewControllerWithRootViewController(rootViewController: navBarController.visibleViewController!)
    }
    if let presentedViewController = rootViewController.presentedViewController {
        return topViewControllerWithRootViewController(rootViewController: presentedViewController)
    }
    return rootViewController
}


func findView(withNativeID nativeID: String, in view: UIView) -> UIView? {
    if view == view as? RCTUIImageViewAnimated {
        return view
    }
    
    for subview in view.subviews {
        if let foundView = findView(withNativeID: nativeID, in: subview) {
            return foundView
        }
    }
    
    return nil
}


