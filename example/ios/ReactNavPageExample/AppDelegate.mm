#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RootViewUtil.h"
#import "ReactNavPageImpl.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"ReactNavPageExample";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  BOOL result = [super application:application didFinishLaunchingWithOptions:launchOptions];
  [ReactNavPageImpl setBridge:self.bridge];
  UINavigationController *navController = [RootViewUtil wrapperNavigationController:self.window.rootViewController storyboardName:@"LaunchScreen"];
  self.window.rootViewController = navController;

  return result;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
