#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"
#import "react_nav_page-Swift.h"

@interface SharedElementImageManager : RCTViewManager
@end

@implementation SharedElementImageManager

RCT_EXPORT_MODULE(SharedElementImage)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)
RCT_EXPORT_VIEW_PROPERTY(sharedID, NSString)

@end
