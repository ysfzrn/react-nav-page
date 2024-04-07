#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Foundation/Foundation.h>


@interface ReactNavPageImpl : RCTEventEmitter
+ (instancetype)sharedInstance;
+ (void)setBridge:(RCTBridge *)bridge;
@end
