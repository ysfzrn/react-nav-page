//
//  ReactNavPageController.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 11.04.2024.
//

import UIKit

@objc(ReactNavPageController)
public class ReactNavPageController: UIViewController, UIGestureRecognizerDelegate{
    var routeName: String = ""
    var rootTag: NSNumber = 0
    var bridge: RCTBridge
    var initialProps: NSDictionary
    var pageTitle: String = ""
    var navOptions: NSDictionary?
    
    
    init(routeName: String, bridge: RCTBridge, initialProps:NSDictionary, pageTitle: String, navOptions: NSDictionary?) {
        self.routeName = routeName
        self.bridge = bridge
        self.initialProps = initialProps
        self.pageTitle = pageTitle
        self.navOptions = navOptions
        super.init(nibName: nil, bundle: nil)
    }
    
    public override func viewDidLoad() {
        super.viewDidLoad()
        let initialProps: [String: Any] = [
            "params": self.initialProps
        ]
        
        let reactRootView = RootViewUtil.createRootView(bridge, moduleName: routeName, initProps: initialProps)
        self.rootTag = reactRootView?.reactTag ?? 0
        self.view = reactRootView
        setNavigationBar()
    }
    
    public override func viewDidAppear(_ animated: Bool) {
        ReactNavPageImpl.sharedInstance.currentViewController = self
    }
    
    public override func viewWillAppear(_ animated: Bool) {
        let headerShow = self.navOptions?["headerShow"] as? Bool ?? GlobalConfig.headerShow
        if(headerShow == false){
            self.navigationController?.setNavigationBarHidden(true, animated: true)
        }else{
            self.navigationController?.setNavigationBarHidden(false, animated: true)
        }
        let headerTransparent = self.navOptions?["headerTransparent"] as? Bool ?? GlobalConfig.headerTransparent
        self.navigationController?.navigationBar.isTranslucent = headerTransparent
    }
    
    func setNavigationBar(){
            let headerBackgroundColor = self.navOptions?["headerBackgroundColor"] as? String ?? GlobalConfig.headerBackgroundColor
            let hederNavBarAlpha = self.navOptions?["hederNavBarAlpha"] as? Float ?? GlobalConfig.hederNavBarAlpha
            
            
            let appearance = UINavigationBarAppearance()
            appearance.configureWithTransparentBackground()
            appearance.backgroundColor = hexStringToUIColor(hexColor: headerBackgroundColor, alpha: CGFloat(hederNavBarAlpha))
            self.navigationItem.standardAppearance = appearance
            self.navigationItem.scrollEdgeAppearance = appearance
            self.navigationItem.compactAppearance = appearance
            
            self.setTitleView()
            self.setLeftBarButton()
    }
    
    func setTitleView(){
            let initialProps: [String: Any] = [
                "title": self.pageTitle
            ]
            
            let titleRootView = RootViewUtil.createRootView(self.bridge, moduleName: "TitleView", initProps: initialProps)
            
            let customTitleView = UIView(frame: CGRect(x: 0, y: 0, width: 200, height: 44))
            customTitleView.backgroundColor = .clear
            titleRootView!.backgroundColor = .clear
            titleRootView!.frame = CGRect(x: 0, y: 0, width: 200, height: 44)
            customTitleView.addSubview(titleRootView!)
            self.navigationItem.titleView = customTitleView
        
    }
    
    func setLeftBarButton(){
        let initialProps: [String: Any] = [
            "title": pageTitle
        ]
        let viewControllersCount = getTopViewController().navigationController?.viewControllers.count ?? 0
        if (viewControllersCount > 1) {
            let backNavView = UIView(frame: CGRect(x: 0, y: 0, width: 50, height: 44))
            let backRootView = RootViewUtil.createRootView(bridge, moduleName: "LeftButtonView", initProps: initialProps)
            
            backNavView.backgroundColor = .clear
            backRootView?.backgroundColor = .clear
            backRootView?.frame = CGRect(x: 0, y: 0, width: 50, height: 44)
            backNavView.addSubview(backRootView!)
            
            let tapGesture = UITapGestureRecognizer(target: self, action: #selector(leftButtonAction))
            backNavView.addGestureRecognizer(tapGesture)
            
            let backNav = UIBarButtonItem(
                customView: backNavView
            )
            navigationItem.leftBarButtonItem = backNav
            getTopViewController().navigationController?.interactivePopGestureRecognizer?.delegate = self
        }
    }
    
    @objc private func leftButtonAction() {
        ReactNavPageImpl.sharedInstance.sendAppBarPressEvent(name: "onAppBarPress", payload: ["button": "left", "routeName":routeName, "rootTag": rootTag])
    }
    
   
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
