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

- (void)pop { 
    [moduleImpl pop];
}


- (void)push:(NSString *)routeName { 
    [moduleImpl pushWithRouteName:routeName];
}

- (void)setRoot:(NSString *)routeName {
    [moduleImpl setRootWithRouteName:routeName];
}



- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params{
    return std::make_shared<facebook::react::NativeReactNavPageSpecJSI>(params);
}

@end
