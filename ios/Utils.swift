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

func findView(withTag tag: Int, in view: UIView) -> UIView? {
    // Eğer view'ın tag'i aranan tag'e eşitse, view'i döndür
    if view.tag == tag {
        return view
    }
    
    // Eğer view'in altında subview'ler varsa, her birini kontrol et
    for subview in view.subviews {
        // Her bir subview için findView fonksiyonunu tekrar çağır
        if let foundView = findView(withTag: tag, in: subview) {
            // Eğer aranan view bulunduysa, bulunan view'i döndür
            return foundView
        }
    }
    
    // Aranan view bu view'in altında bulunamadı, nil döndür
    return nil
}

 

