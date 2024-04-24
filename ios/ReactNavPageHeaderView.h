// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>

#ifndef ReactNavPageHeaderViewNativeComponent_h
#define ReactNavPageHeaderViewNativeComponent_h

NS_ASSUME_NONNULL_BEGIN

@interface ReactNavPageHeaderView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END

#endif /* ReactNavPageHeaderViewNativeComponent_h */
#endif /* RCT_NEW_ARCH_ENABLED */
