//
//  ReactNavPage.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 6.04.2024.
//
import Foundation
import React
import Hero

@objc(ReactNavPageImplDelegate)
public protocol ReactNavPageImplDelegate {
    func sendNavigationEvent(name: String, payload: Dictionary<String, Any>)
    func sendTabChangeEvent(name: String, payload: Dictionary<String, Any>)
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
    
    public func sendTabChangeEvent(name: String, payload: Dictionary<String, Any>) {
        self.delegate?.sendTabChangeEvent(name: name, payload: payload)
    }
    
    
    @objc public func push(routeName: NSString, params: NSDictionary) -> Void {
           DispatchQueue.main.async {
               let rootViewController = getTopViewController();
               let rootVC = ReactNavPageController(routeName: routeName as String, bridge: ReactNavPageImpl.sharedInstance.bridge!, initialProps: params)
               if(routeName == "SharedDetail"){
                   if let myView = findView(withNativeID: "spidermanContainer", in: rootVC.view!) {
                       // Bulundu!
                       print("viewWillAppear Bulundu!")
                       myView.hero.id = "spiderman"
                   } else {
                       // Bulunamadı
                       print("viewWillAppear Bulunamadı!")
                   }
                   
                   rootViewController.navigationController?.hero.isEnabled = true
                   rootViewController.navigationController?.isNavigationBarHidden = true
               }else{
                   rootViewController.navigationController?.hero.isEnabled = false
                   rootViewController.navigationController?.isNavigationBarHidden = false
               }
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
                let rootVC = ReactNavPageController(routeName: routeName as String, bridge: ReactNavPageImpl.sharedInstance.bridge!, initialProps: initialProps as NSDictionary)
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
                
                var tabStacks = stacks["tabs"] as! NSArray
                for stack in tabStacks {
                    let tabStack = stack as? NSDictionary
                    let tabName = tabStack?["routeName"] as? String
                    
                    let rootVC = ReactNavPageController(routeName: tabName! as String, bridge: ReactNavPageImpl.sharedInstance.bridge!, initialProps: initialProps as NSDictionary)
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
