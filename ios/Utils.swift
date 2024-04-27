//
//  Utils.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 13.04.2024.
//

import Foundation


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

func hexStringToUIColor(hexColor: String, alpha: CGFloat) -> UIColor {
   let stringScanner = Scanner(string: hexColor)

   if(hexColor.hasPrefix("#")) {
     stringScanner.scanLocation = 1
   }
   var color: UInt32 = 0
   stringScanner.scanHexInt32(&color)

   let r = CGFloat(Int(color >> 16) & 0x000000FF)
   let g = CGFloat(Int(color >> 8) & 0x000000FF)
   let b = CGFloat(Int(color) & 0x000000FF)

   return UIColor(red: r / 255.0, green: g / 255.0, blue: b / 255.0, alpha: alpha)
 }
