#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"
#import "react_nav_page-Swift.h"

@interface SharedElementViewManager : RCTViewManager
@end

@implementation SharedElementViewManager

RCT_EXPORT_MODULE(SharedElementView)

- (UIView *)view
{
  return [[SharedElementViewImpl alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)
RCT_EXPORT_VIEW_PROPERTY(sharedID, NSString)

@end
