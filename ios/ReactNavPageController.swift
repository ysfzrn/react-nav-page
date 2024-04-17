//
//  ReactNavPageController.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 11.04.2024.
//

import UIKit
import Hero
import React

@objc(ReactNavPageController)
public class ReactNavPageController: UIViewController{
    var routeName: String = ""
    var rootTag: NSNumber = 0
    var bridge: RCTBridge
    var initialProps: NSDictionary
    var rootView: UIView? = nil
    
    
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
        
        rootView = RootViewUtil.createRootView(bridge, moduleName: routeName, initProps: initialProps)
        self.rootTag = rootView?.reactTag ?? 0
        title = routeName
        self.view = rootView
        if let myView = findView(withNativeID: "spidermanContainer", in: self.view!) {
            // Bulundu!
            print("viewWillAppear Bulundu!")
            myView.hero.id = "spiderman"
        } else {
            // Bulunamadı
            print("viewWillAppear Bulunamadı!")
        }
    }
    
    
    public override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        if let myView = findView(withNativeID: "spidermanContainer", in: self.view!) {
            // Bulundu!
            print("viewWillAppear Bulundu!")
            myView.hero.id = "spiderman"
        } else {
            // Bulunamadı
            print("viewWillAppear Bulunamadı!")
        }
        
        //self.view.hero.modifiers = [.translate(y:100)]
        //self.view.hero.modifiers = [.fade, .scale(0.5)]
        //self.view.hero.modifiers = [.fade, .translate(CGPoint(x: 0, y: 800), z: 20)]
        //self.view.hero.modifiers = [.fade, .scale(0.5), .useNoSnapshot, .spring(stiffness: 250, damping: 25)]
        //self.view.hero.modifiers = [.scale(x: 1, y: 0.1, z: 1), .duration(1), .fade]
        //self.view.hero.modifiers = [.cascade]
        self.view.hero.modifiers = [.fade, .scale(0.5), .useNoSnapshot,  .cascade]
    }
    
    public override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        if let myView = findView(withNativeID: "spidermanContainer", in: self.view!) {
            // Bulundu!
            print("viewWillAppear Bulundu!")
            myView.hero.id = "spiderman"
        } else {
            // Bulunamadı
            print("viewWillAppear Bulunamadı!")
        }
    }
    
    

   
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
