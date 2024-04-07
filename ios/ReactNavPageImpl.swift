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
            rootVC.title = "Welcome"
            
            let reactRootView = RootViewUtil.createRootView(ReactNavPageImpl.sharedInstance.bridge, moduleName: routeName as String, initProps: nil)
            rootVC.view = reactRootView
            
            rootVC.view.backgroundColor = .systemPink
            rootViewController.navigationController?.pushViewController(rootVC, animated: true)
        }
    }
    
    @objc public func pop() -> Void {
        DispatchQueue.main.async {
            let rootViewController = self.getTopViewController();
            rootViewController.navigationController?.popViewController(animated: true)
        }
    }
    
    @objc public func multiply(a: Float, b: Float) -> NSNumber {
        DispatchQueue.main.async {
            let rootViewController = self.getTopViewController();
            
            
            let rootVC = UIViewController()
            rootVC.title = "Welcome"
            
            //let navVC = UINavigationController(rootViewController: rootVC)
            //navVC.modalPresentationStyle = .fullScreen
            
            let reactRootView = RootViewUtil.createRootView(ReactNavPageImpl.sharedInstance.bridge, moduleName: "Support", initProps: nil)
            rootVC.view = reactRootView
            
            //xxx!!.rootViewController?.navigationController?.pushViewController(rootVC, animated: true)
            
            //rootViewController.present(rootVC, animated: true)
            rootViewController.navigationController?.pushViewController(rootVC, animated: true)
         }
        
        
        return a*b*2 as NSNumber
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

class SecondViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemRed
        title = "About"
        
        let button = UIButton()
        button.setTitle("Go to Third", for: .normal)
        button.addTarget(self, action: #selector(goToThird), for: .touchUpInside)
        button.backgroundColor = .systemRed
        button.frame = CGRect(x: 100, y: 100, width: 250, height: 60)
        
        view.addSubview(button)
        NSLayoutConstraint.activate([
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            button.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }
    
    @objc private func goToThird(){
        let vc = ThirdViewController()
        vc.title = "Third"
        vc.view.backgroundColor = .systemPink
        navigationController?.pushViewController(vc, animated: true)
    }
}

class ThirdViewController: UIViewController {
    let button = UIButton()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .cyan
        title = "ThirdViewController"
        
        
        button.setTitle("Push Another Controller", for: .normal)
        view.addSubview(button)
        
        button.backgroundColor = .red
        button.setTitleColor(.white, for: .normal)
        button.frame=CGRect(x: 100, y: 200, width: 200, height: 52)
        button.addTarget(self, action: #selector(didTapButton), for: .touchUpInside)
    }
    
    @objc private func didTapButton(){
        let vc = UIViewController()
        vc.view.backgroundColor = .lightGray
        
        
        navigationController?.present(vc, animated: true)
        
    }
}
