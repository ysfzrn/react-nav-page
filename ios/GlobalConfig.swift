//
//  GlobalConfig.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 26.04.2024.
//

struct GlobalConfig {
    static var headerShow:Bool = true
    static var headerTransparent:Bool = false
    static var headerBackgroundColor:String = "#9c27b0"
    static var hederNavBarAlpha:Float = 1.0
    
    
    static func getConfig() -> [String: Any] {
        return [
            "headerShow": headerShow,
            "headerTransparent": headerTransparent,
            "headerBackgroundColor":headerBackgroundColor,
            "hederNavBarAlpha":hederNavBarAlpha,
        ]
    }
    
    static func setConfig(config: [String: Any]) {
        if let headerShowValue = config["headerShow"] as? Bool {
            headerShow = headerShowValue
        }
        if let headerTransparentValue = config["headerTransparent"] as? Bool {
            headerTransparent = headerTransparentValue
        }
        if let headerBackgroundColorValue = config["headerBackgroundColor"] as? String {
            headerBackgroundColor = headerBackgroundColorValue
        }
        if let hederNavBarAlphaValue = config["hederNavBarAlpha"] as? Float {
            hederNavBarAlpha = hederNavBarAlphaValue
        }
    }
}
