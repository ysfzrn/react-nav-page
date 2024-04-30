#import <React/RCTRootView.h>
#import "RCTAppSetupUtils.h"
#import "RootViewUtil.h"

static NSString *const kRNConcurrentRoot = @"concurrentRoot";


@implementation RootViewUtil

+ (UINavigationController *)wrapperNavigationController:(UIViewController *)viewController storyboardName:(NSString *)storyboardName{
    UIStoryboard *storyBoard = [UIStoryboard storyboardWithName:storyboardName bundle:nil];
    UIViewController *storyBoardViewController = [storyBoard instantiateInitialViewController];
    UIViewController *rootViewController = viewController;
    UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:storyBoardViewController];
    [navController setViewControllers:@[rootViewController] animated:YES];
    return navController;
}

+ (UIView *)createRootView:(RCTBridge *)bridge moduleName:(NSString *)moduleName initProps:(NSDictionary *)initProps {
  BOOL enableFabric = true;
  
  NSDictionary *initialProps = updateInitialProps(initProps, true);
  
  UIView *rootView = RCTAppSetupDefaultRootView(bridge, moduleName, initialProps, enableFabric);

  rootView.backgroundColor = [UIColor systemBackgroundColor];

  return rootView;
}


static NSDictionary *updateInitialProps(NSDictionary *initialProps, BOOL isFabricEnabled)
{
#ifdef RCT_NEW_ARCH_ENABLED
  NSMutableDictionary *mutableProps = [initialProps mutableCopy] ?: [NSMutableDictionary new];
  // Hardcoding the Concurrent Root as it it not recommended to
  // have the concurrentRoot turned off when Fabric is enabled.
  mutableProps[kRNConcurrentRoot] = @(true);
  return mutableProps;
#else
  return initialProps;
#endif
}

+ (UIView *)findSharedViewInView:(UIView *)view {
    // Eğer verilen view bir ReactNavPageHeaderView ise doğrudan geri dön
    NSLog(@"aaa-%@", view);

    if ([view isKindOfClass:NSClassFromString(@"SharedElementView")]) {
        return view;
    }
    
    // Eğer view'in altında başka bir view varsa, onları da tarayarak ReactNavPageHeaderView bulmaya çalış
    for (UIView *subview in view.subviews) {
        UIView *foundView = [self findSharedViewInView:subview];
        if (foundView) {
            return foundView;
        }
    }
    
    // Eğer hiçbir alt view'de ReactNavPageHeaderView bulunamadıysa nil döndür
    return nil;
}

@end

