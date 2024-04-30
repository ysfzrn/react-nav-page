//
//  PanNavigationController.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 30.04.2024.
//

import Foundation
import UIKit
import Hero
import Closures


class PanNavigationController : UINavigationController {
        
    init(vc : UIViewController) {
        super.init(rootViewController: vc)
        self.hero.isEnabled = true
        self.modalPresentationStyle = .fullScreen
        self.hero.modalAnimationType = .none
    }
        
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
        
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.view.addPanGesture { (pan) in
            self.handlePan(panGR: pan)
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
                
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillAppear(animated)
                
    }
            
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
                
    }
                        
}


extension PanNavigationController {
    
    func setHeroId(index: Int) {
        self.view.hero.modifiers = [
            .scale(0),
//            .source(heroID: "imageView" + String(index))
        ]
//        self.view.hero.id = "view" + String(index)
    }
    
    func handlePan(panGR: UIPanGestureRecognizer) {
                                                
        let translation = panGR.translation(in: self.view)
//        panGR.setTranslation(.zero, in: self.view)
        
        let progress:CGFloat = min(
            (translation.x / 2.0) / view.center.x + abs((translation.y / 2.0) / view.center.y),
            0.5
        )
        
        let position = CGPoint(x:translation.x/2.0 + view.center.x, y:translation.y/2.0 + view.center.y)
        
        switch panGR.state {
            case .began:
                hero.dismissViewController()
                
            case .changed:
                Hero.shared.update(progress)
                Hero.shared.apply(modifiers: [.position(position), .scale(min(1 - (progress / 4.0), 1.02)), .cornerRadius(40), .ignoreSubviewModifiers(recursive: true)], to: view)
                
                UIView.animate(withDuration: 0.15) {
                    self.presentingViewController?.view.alpha = 0.9
                }
                                                
            default:
                                        
                UIView.animate(withDuration: 0.15) {
                    self.presentingViewController?.view.alpha = 1.0
                }
                
                if (progress + panGR.velocity(in: self.view).x + panGR.velocity(in: self.view).y) > 0 {
                    Hero.shared.finish()
                } else {
                    Hero.shared.cancel()
                }
            }
      }
}
