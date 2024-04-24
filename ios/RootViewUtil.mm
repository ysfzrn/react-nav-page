#import <React/RCTRootView.h>
#import "RCTAppSetupUtils.h"
#import "RootViewUtil.h"
#import "ReactNavPageHeaderView.h"

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


- (BOOL)isReactNavPageHeaderView {
    return [self isKindOfClass:[ReactNavPageHeaderView class]];
}

+ (UIView *)findAppBarInView:(UIView *)view {
    if ([view respondsToSelector:@selector(isReactNavPageHeaderView)]) {
        return view;
    }
    
    for (UIView *subview in view.subviews) {
        UIView *foundView = [self findAppBarInView:subview];
        if (foundView) {
            return foundView;
        }
    }
    
    return nil;
}

+ (UIView *)cloneView:(UIView *)view {
    NSData *archivedData = [NSKeyedArchiver archivedDataWithRootObject:view];
    UIView *clonedView = [NSKeyedUnarchiver unarchiveObjectWithData:archivedData];
    return clonedView;
}
//foundView = [self cloneView:view];

+ (UIView *)findReactNavPageHeaderViewInView:(UIView *)view {
    // Eğer verilen view bir ReactNavPageHeaderView ise doğrudan geri dön
    NSLog(@"aaa-%@", view);

    if ([view isKindOfClass:NSClassFromString(@"ReactNavPageHeaderView")]) {
        return [self cloneView:view];
    }
    
    // Eğer view'in altında başka bir view varsa, onları da tarayarak ReactNavPageHeaderView bulmaya çalış
    for (UIView *subview in view.subviews) {
        UIView *foundView = [self findReactNavPageHeaderViewInView:subview];
        if (foundView) {
            return [self cloneView:foundView];
        }
    }
    
    // Eğer hiçbir alt view'de ReactNavPageHeaderView bulunamadıysa nil döndür
    return nil;
}

@end



