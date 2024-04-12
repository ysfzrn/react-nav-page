//
//  ReactNavPage.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 6.04.2024.
//
import Foundation
import React

@objc(ReactNavPageImplDelegate)
public protocol ReactNavPageImplDelegate {
    func sendNavigationEvent(name: String, payload: Dictionary<String, Any>)
}
 
@objc(ReactNavPageImpl)
public class ReactNavPageImpl : NSObject {
    @objc public static var sharedInstance = ReactNavPageImpl()
    @objc public weak var delegate: ReactNavPageImplDelegate? = nil
    var bridge: RCTBridge?
    
    @objc(setBridge:)
    class func setBridge(bridge: RCTBridge) {
        ReactNavPageImpl.sharedInstance.bridge = bridge
    }
    
    public func sendEvent(name: String, payload: Dictionary<String, Any>) {
        self.delegate?.sendNavigationEvent(name: name, payload: payload)
    }
    
    
    @objc public func push(routeName: NSString, params: NSDictionary) -> Void {
           DispatchQueue.main.async {
               let rootViewController = self.getTopViewController();
               let rootVC = ReactNavPageController()
               rootVC.routeName = routeName as String
               
               let initialProps: [String: Any] = [
                   "params": params
               ]
               
               let reactRootView = RootViewUtil.createRootView(ReactNavPageImpl.sharedInstance.bridge, moduleName: routeName as String, initProps: initialProps)
               rootVC.view = reactRootView
               rootVC.rootTag = reactRootView?.reactTag ?? 0
               
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
            let rootVC = ReactNavPageController()
            rootVC.routeName = routeName as String
            let reactRootView = RootViewUtil.createRootView(ReactNavPageImpl.sharedInstance.bridge, moduleName: routeName as String, initProps: nil)
            rootVC.view = reactRootView
            rootVC.rootTag = reactRootView?.reactTag ?? 0
            
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
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                self.sendEvent(name: "onRouteChange", payload: ["routeName": routeName, "rootTag": rootVC.rootTag ])
            }
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

extension UINavigationController: UINavigationControllerDelegate {
    
    open override func viewDidLoad() {
        super.viewDidLoad()
        delegate = self
    }
    
    public func navigationController(_ navigationController: UINavigationController, willShow viewController: UIViewController, animated: Bool) {
        if let reactNavPageController = viewController as? ReactNavPageController {
                let routeName = reactNavPageController.routeName
                let rootTag = reactNavPageController.rootTag
                ReactNavPageImpl.sharedInstance.sendEvent(name: "onRouteChange", payload: ["routeName": routeName, "rootTag":rootTag ])
        }
    }
    
}
