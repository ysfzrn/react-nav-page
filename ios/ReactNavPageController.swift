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
    weak var appBar: UIView?
    var initialProps: NSDictionary
    var customTitleView: UIView?
    
    init(routeName: String, bridge: RCTBridge, initialProps:NSDictionary, appBar:UIView?) {
        self.routeName = routeName
        self.bridge = bridge
        self.initialProps = initialProps
        self.appBar = appBar
        super.init(nibName: nil, bundle: nil)
    }
    
    public override func viewDidLoad() {
        super.viewDidLoad()
        print("viewDidLoad")
        let initialProps: [String: Any] = [
            "params": self.initialProps
        ]
        let reactRootView = RootViewUtil.createRootView(bridge, moduleName: routeName, initProps: initialProps)
        self.rootTag = reactRootView?.reactTag ?? 0
        self.view = reactRootView
    }
    
    public override func applicationFinishedRestoringState() {
        super.applicationFinishedRestoringState()
        print("lifecycle applicationFinishedRestoringState")
        self.appBar?.removeFromSuperview()
        self.appBar = nil
        navigationItem.titleView = nil
    }

    
    public override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        setBar()
    }


    public func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
        print("The interactive pop gesture recognizer is being called.")
        return true
    }
    
    
    func setBar(){
        if((self.appBar) != nil){
            DispatchQueue.main.async {
                self.customTitleView = UIView(frame: CGRect(x: 0, y: 0, width: 200, height: 44))
                self.customTitleView?.backgroundColor = .clear
                self.appBar?.backgroundColor = .clear
                self.appBar!.frame = CGRect(x: 0, y: 0, width: 200, height: 44)
                self.customTitleView?.addSubview(self.appBar!)
               
               // UIViewController'ın titleView özelliğine özelleştirilmiş customTitleView'i ata
                self.navigationItem.titleView = self.customTitleView
              //navigationController?.navigationBar.prefersLargeTitles = true
                let appearance = UINavigationBarAppearance()
                appearance.configureWithOpaqueBackground()
                appearance.backgroundColor = UIColor.purple
                appearance.titleTextAttributes = [.foregroundColor: UIColor.white]
                self.navigationItem.standardAppearance = appearance
                self.navigationItem.scrollEdgeAppearance = appearance
                self.navigationItem.compactAppearance = appearance
            }
        }else{
            title = routeName
        }
    }
    
   
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}



class CustomNavigationBar: UINavigationBar {
    
    // Sol bileşen
    var leftComponent: UIView? {
        didSet {
            updateNavigationBar()
        }
    }
    
    // Sağ bileşen
    var rightComponent: UIView? {
        didSet {
            updateNavigationBar()
        }
    }
    
    // Merkez bileşen
    var centerComponent: UIView? {
        didSet {
            updateNavigationBar()
        }
    }
    
    // Navigation bar'ı güncelleyen yardımcı metot
    private func updateNavigationBar() {
        // Sol bileşen
        if let leftView = leftComponent {
            let leftItem = UIBarButtonItem(customView: leftView)
            self.topItem?.leftBarButtonItem = leftItem
        } else {
            self.topItem?.leftBarButtonItem = nil
        }
        
        // Sağ bileşen
        if let rightView = rightComponent {
            let rightItem = UIBarButtonItem(customView: rightView)
            self.topItem?.rightBarButtonItem = rightItem
        } else {
            self.topItem?.rightBarButtonItem = nil
        }
        
        // Merkez bileşen
        if let centerView = centerComponent {
            self.topItem?.titleView = centerView
        } else {
            self.topItem?.titleView = nil
        }
    }
}


