//
//  ReactNavPageController.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 11.04.2024.
//

import UIKit

@objc(ReactNavPageController)
public class ReactNavPageController: UIViewController{
    var routeName: String = ""
    var rootTag: NSNumber = 0
    var bridge: RCTBridge
    var initialProps: NSDictionary
    
    
    init(routeName: String, bridge: RCTBridge, initialProps:NSDictionary) {
        self.routeName = routeName
        self.bridge = bridge
        self.initialProps = initialProps
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
        title = routeName
    }
    
   
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
