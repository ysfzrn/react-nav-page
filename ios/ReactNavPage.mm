#import "ReactNavPage.h"
#import "react_nav_page-Swift.h"
/**
 * Declare the ObjC implementation for that native module class
 */
@implementation ReactNavPage {
    ReactNavPageImpl *moduleImpl;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        moduleImpl = [ReactNavPageImpl new];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

RCT_EXPORT_MODULE(ReactNavPage)

- (NSNumber *)multiply:(double)a b:(double)b {
    return [moduleImpl multiplyWithA:a b:b];
}

- (void)pop { 
    [moduleImpl pop];
}


- (void)push:(NSString *)routeName { 
    [moduleImpl pushWithRouteName:routeName];
}


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params{
    return std::make_shared<facebook::react::NativeReactNavPageSpecJSI>(params);
}

@end
