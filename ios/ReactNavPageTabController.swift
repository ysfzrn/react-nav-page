//
//  ReactNavPageTabController.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 13.04.2024.
//

import React


class TabBarController: UITabBarController, UITabBarControllerDelegate {
    var tabBarName: String = ""
    var bridge: RCTBridge
    var initialProps: NSDictionary
    var customTabBarView: UIView!
    var tabBarHeight: Float
    
    init(tabBarName:String, bridge: RCTBridge, initialProps: NSDictionary, tabBarHeight:Float) {
        self.tabBarName = tabBarName
        self.bridge = bridge
        self.initialProps = initialProps
        self.tabBarHeight = tabBarHeight
        super.init(nibName: nil, bundle: nil)
    }
  
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let initialProps: [String: Any] = [
            "params": self.initialProps
        ]
        
        customTabBarView = RootViewUtil.createRootView(bridge, moduleName: tabBarName, initProps: initialProps)
        customTabBarView?.backgroundColor = .clear
        view.addSubview(customTabBarView!)
        view.bringSubviewToFront(self.tabBar)
        tabBar.isHidden = true
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.isNavigationBarHidden = true
    }
   
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        let customTabBarViewHeight = self.tabBarHeight
        self.tabBar.frame.size.height = CGFloat(customTabBarViewHeight)
        tabBar.frame.origin.y = view.frame.height - CGFloat(customTabBarViewHeight)
        customTabBarView.frame = tabBar.frame
    }
    
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}


