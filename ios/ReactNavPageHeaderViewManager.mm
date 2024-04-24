#import "ReactNavPageHeaderView.h"
#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"
#import "react_nav_page-Swift.h"


@interface ReactNavPageHeaderViewManager : RCTViewManager
@end

@implementation ReactNavPageHeaderViewManager

RCT_EXPORT_MODULE(ReactNavPageHeaderView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
