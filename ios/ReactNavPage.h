
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNReactNavPageSpec.h"
@interface ReactNavPage : NSObject <NativeReactNavPageSpec>

#else
#import <React/RCTBridgeModule.h>

@interface ReactNavPage : NSObject <RCTBridgeModule>
#endif

@end
