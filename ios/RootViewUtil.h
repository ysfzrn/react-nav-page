@interface RootViewUtil : NSObject

+ (UINavigationController *)wrapperNavigationController:(UIViewController *)viewController storyboardName:(NSString *)storyboardName;
+ (UIView *)createRootView:(RCTBridge *)bridge moduleName:(NSString *)moduleName initProps:(NSDictionary *)initProps;

@end

