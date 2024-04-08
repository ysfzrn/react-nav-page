//
//  ReactNavPage.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 6.04.2024.
//
import Foundation
import React
 
@objc(ReactNavPageImpl)
public class ReactNavPageImpl : NSObject {
    @objc static var sharedInstance = ReactNavPageImpl()
    var bridge: RCTBridge?
    
    @objc(setBridge:)
    class func setBridge(bridge: RCTBridge) {
        ReactNavPageImpl.sharedInstance.bridge = bridge
    }
    
    @objc public func push(routeName: NSString) -> Void {
        DispatchQueue.main.async {
            let rootViewController = self.getTopViewController();
            let rootVC = UIViewController()
            //rootVC.title = "Welcome"
            
            let reactRootView = RootViewUtil.createRootView(ReactNavPageImpl.sharedInstance.bridge, moduleName: routeName as String, initProps: nil)
            rootVC.view = reactRootView
            
            rootViewController.navigationController?.pushViewController(rootVC, animated: true)
        }
    }
    
    @objc public func pop() -> Void {
        DispatchQueue.main.async {
            let rootViewController = self.getTopViewController();
            rootViewController.navigationController?.popViewController(animated: true)
            //rootViewController.navigationController?.popToRootViewController(animated: true)
        }
    }
    
    
    @objc public func setRoot(routeName: NSString) -> Void {
        DispatchQueue.main.async {
            let rootVC = UIViewController()
            let reactRootView = RootViewUtil.createRootView(ReactNavPageImpl.sharedInstance.bridge, moduleName: routeName as String, initProps: nil)
            rootVC.view = reactRootView
            
            // Transition Animation
            let transition = CATransition()
            transition.duration = 0.3
            transition.type = CATransitionType.fade
            transition.subtype = CATransitionSubtype.fromRight
            
            // Change rootViewController
            let navCtrller = RootViewUtil.wrapperNavigationController(rootVC, storyboardName: "LaunchScreen")
            UIApplication.shared.keyWindow?.layer.add(transition, forKey: kCATransition)
            UIApplication.shared.keyWindow?.rootViewController = navCtrller
            
            navCtrller?.navigationController?.pushViewController(rootVC, animated: false)
        }
    }
    
    
    
    
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
}
