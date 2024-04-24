# react-nav-page

This project is still in progress. I'm trying to write a native navigation library and share my experiences. You can follow it on Medium.

- [Writing a Native Navigation Library for React Native - PART 1](https://medium.com/@ysfzrn/writing-a-native-navigation-library-for-react-native-part-1-24b4ab118810)
- [Writing a Native Navigation Library for React Native — PART 2](https://medium.com/@ysfzrn/writing-a-native-navigation-library-for-react-native-part-2-9c72f4bbaa66)
- [Writing a Native Navigation Library for React Native — PART 3](https://medium.com/@ysfzrn/writing-a-native-navigation-library-for-react-native-part-3-39b06fb2fb87)
- [Writing a Native Navigation Library for React Native — PART 4](https://medium.com/@ysfzrn/writing-a-native-navigation-library-for-react-native-part-4-66bc52531584)
- [Writing a Native Navigation Library for React Native — PART 5](https://medium.com/@ysfzrn/writing-a-native-navigation-library-for-react-native-part-5-9e320b43fd13)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)


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
        
        let appProps: [String: Any] = [
            "routeName": self.routeName
        ]
        
        let appBarRootView = RootViewUtil.createRootView(bridge, moduleName: "AppBar", initProps: appProps)
        
       print(appBarRootView!.frame)
        
       let customTitleView = UIView(frame: CGRect(x: 0, y: 0, width: 200, height: 44))
       customTitleView.backgroundColor = .clear
       appBarRootView?.backgroundColor = .clear
       appBarRootView!.frame = CGRect(x: 50, y: 0, width: 100, height: 44)
       customTitleView.addSubview(appBarRootView!)
       
       // UIViewController'ın titleView özelliğine özelleştirilmiş customTitleView'i ata
       navigationItem.titleView = customTitleView
      //navigationController?.navigationBar.prefersLargeTitles = true
        
    }
    
    @objc func leftButtonTapped() {
        print("Left button tapped")
        // Buraya sol butona tıklandığında gerçekleşmesini istediğiniz işlemleri ekleyebilirsiniz
    }
    
    @objc func rightButtonTapped() {
        print("Left button tapped")
        // Buraya sol butona tıklandığında gerçekleşmesini istediğiniz işlemleri ekleyebilirsiniz
    }
    
    public func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
        print("The interactive pop gesture recognizer is being called.")
        setBar()
        return true
    }
    
    
    
    func setBar(){
        if((self.appBar) != nil){
            
            let navcontroller = navigationController!

            let bannerWidth = navcontroller.navigationItem.accessibilityFrame.size.width
            let bannerHeight = navcontroller.navigationBar.frame.size.height


            let bannerX = bannerWidth / 2 - 120 / 2
            let bannerY = bannerHeight / 2 - 60 / 2

            //self.appBar!.frame = CGRect(x: bannerX, y: bannerY, width: bannerWidth, height: bannerHeight)
            let view = UIView(frame: CGRect(x: bannerX, y: bannerY, width: bannerWidth, height: bannerHeight))
            //self.appBar!.frame = navcontroller.navigationBar.frame
            //view.addSubview(self.appBar!)
            //getTopViewController().navigationItem.titleView = self.appBar!
            //navigationItem.titleView = self.appBar!
            navcontroller.navigationBar.addSubview(self.appBar!)

        }else{
            print("self.appBar", self.appBar as Any)
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


