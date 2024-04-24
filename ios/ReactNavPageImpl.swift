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
    func sendTabChangeEvent(name: String, payload: Dictionary<String, Any>)
}
 
@objc(ReactNavPageImpl)
public class ReactNavPageImpl : NSObject {
    @objc public static var sharedInstance = ReactNavPageImpl()
    @objc public weak var delegate: ReactNavPageImplDelegate? = nil
    var appBarRootView: UIView?
    var appBar:UIView?
    var bridge: RCTBridge?
    
    
    deinit {
        print("lifecycle ReactNavPageImpl viewWillDisappear")
        ReactNavPageImpl.sharedInstance.appBar?.removeFromSuperview()
        ReactNavPageImpl.sharedInstance.appBar = nil
        ReactNavPageImpl.sharedInstance.appBarRootView?.removeFromSuperview()
        ReactNavPageImpl.sharedInstance.appBarRootView = nil
    }

    
    @objc(setBridge:)
    class func setBridge(bridge: RCTBridge) {
        ReactNavPageImpl.sharedInstance.bridge = bridge
        let initialProps: [String: Any] = [
            "params": ""
        ]
        ReactNavPageImpl.sharedInstance.appBarRootView = RootViewUtil.createRootView(bridge, moduleName: "AppBar", initProps: initialProps)
        ReactNavPageImpl.sharedInstance.appBar = RootViewUtil.findReactNavPageHeaderView(in: ReactNavPageImpl.sharedInstance.appBarRootView)
    }
    
    public func sendEvent(name: String, payload: Dictionary<String, Any>) {
        self.delegate?.sendNavigationEvent(name: name, payload: payload)
    }
    
    public func sendTabChangeEvent(name: String, payload: Dictionary<String, Any>) {
        self.delegate?.sendTabChangeEvent(name: name, payload: payload)
    }
    
    
    @objc public func push(routeName: NSString, params: NSDictionary) -> Void {
           DispatchQueue.main.async {
               if(ReactNavPageImpl.sharedInstance.appBar == nil){
                   ReactNavPageImpl.sharedInstance.appBar = RootViewUtil.findReactNavPageHeaderView(in: ReactNavPageImpl.sharedInstance.appBarRootView)
               }
               let rootViewController = getTopViewController();
               let rootVC = ReactNavPageController(routeName: routeName as String, bridge: self.bridge!, initialProps: params, appBar: ReactNavPageImpl.sharedInstance.appBar)
               rootViewController.navigationController?.pushViewController(rootVC, animated: true)
           }
    }
    
    @objc public func pop() -> Void {
        DispatchQueue.main.async {
            let rootViewController = getTopViewController();
            rootViewController.navigationController?.popViewController(animated: true)
            //rootViewController.navigationController?.popToRootViewController(animated: true)
        }
    }
    
    @objc public func changeTab(index: Float) -> Void {
        DispatchQueue.main.async {
             let rootViewController = getTopViewController();
            
             if(rootViewController.tabBarController?.selectedIndex == Int(index)){
                 rootViewController.navigationController?.popToRootViewController(animated: true)
             }else{
                 self.sendTabChangeEvent(name: "onTabChange", payload: ["tabIndex": index])
                 rootViewController.tabBarController?.selectedIndex = Int(index)
             }
        }
    }
    
    
    @objc public func setRoot(routeName: NSString, type: NSString, initialProps: NSDictionary, stacks: NSDictionary, tabBar: NSDictionary) -> Void {
        DispatchQueue.main.async {
            let initialProps: [String: Any] = [
                "params": initialProps
            ]
            
            // Transition Animation
            let transition = CATransition()
            transition.duration = 0.3
            transition.type = CATransitionType.fade
            transition.subtype = CATransitionSubtype.fromRight
            
            if(type == "STACK"){
                if(ReactNavPageImpl.sharedInstance.appBar == nil){
                    ReactNavPageImpl.sharedInstance.appBar = RootViewUtil.findReactNavPageHeaderView(in: ReactNavPageImpl.sharedInstance.appBarRootView)
                }

                let rootVC = ReactNavPageController(routeName: routeName as String, bridge: ReactNavPageImpl.sharedInstance.bridge!, initialProps: initialProps as NSDictionary, appBar: ReactNavPageImpl.sharedInstance.appBar)
                // Change rootViewController
                let navCtrller = RootViewUtil.wrapperNavigationController(rootVC, storyboardName: "LaunchScreen")
                UIApplication.shared.keyWindow?.layer.add(transition, forKey: kCATransition)
                UIApplication.shared.keyWindow?.rootViewController = navCtrller
                navCtrller?.navigationController?.pushViewController(rootVC, animated: false)
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                    self.sendEvent(name: "onRouteChange", payload: ["routeName": routeName ])
                }
            }else if(type == "TAB_STACK"){
                let tabBarName = tabBar["tabBarComponentName"] as? String
                let tabBarHeight = tabBar["tabBarHeight"] as? Float
                let tabBarController = TabBarController(tabBarName: tabBarName!, bridge:ReactNavPageImpl.sharedInstance.bridge! , initialProps:  initialProps as NSDictionary, tabBarHeight: tabBarHeight!)
                var navControllers: [UINavigationController] = []
                
                let tabStacks = stacks["tabs"] as! NSArray
                for stack in tabStacks {
                    let tabStack = stack as? NSDictionary
                    let tabName = tabStack?["routeName"] as? String
                    
                    if(ReactNavPageImpl.sharedInstance.appBar == nil){
                        ReactNavPageImpl.sharedInstance.appBar = RootViewUtil.findReactNavPageHeaderView(in: ReactNavPageImpl.sharedInstance.appBarRootView)
                    }
                    
                    let rootVC = ReactNavPageController(routeName: tabName! as String, bridge: ReactNavPageImpl.sharedInstance.bridge!, initialProps: initialProps as NSDictionary, appBar: ReactNavPageImpl.sharedInstance.appBar)
                    let nv =  UINavigationController(rootViewController: rootVC)
                    navControllers.append(nv)
                    print(tabName as Any)
                }
                tabBarController.setViewControllers(navControllers, animated: true)
                let navCtrller = RootViewUtil.wrapperNavigationController(tabBarController, storyboardName: "LaunchScreen")
                UIApplication.shared.keyWindow?.layer.add(transition, forKey: kCATransition)
                UIApplication.shared.keyWindow?.rootViewController = navCtrller
                navCtrller?.navigationController?.pushViewController(tabBarController, animated: false)
            }
        }
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
                ReactNavPageImpl.sharedInstance.sendEvent(name: "onRouteChange", payload: ["routeName": routeName ])
        }
    }
    
}
