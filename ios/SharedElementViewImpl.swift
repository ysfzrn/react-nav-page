//
//  SharedElementViewImpl.swift
//  react-nav-page
//
//  Created by Yusuf Zeren on 30.04.2024.
//
import Hero

@objc(SharedElementViewImpl)
public class SharedElementViewImpl: UIView {
  override init(frame: CGRect) {
    super.init(frame: frame)
  }
    
  @objc public var sharedID: String = "" {
       didSet {
           if let parentView = self.superview {
               parentView.hero.id = sharedID
           }
       }
   }
    
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
 
  
}
