@interface RootViewUtil : NSObject

+ (UINavigationController *)wrapperNavigationController:(UIViewController *)viewController storyboardName:(NSString *)storyboardName;
+ (UIView *)createRootView:(RCTBridge *)bridge moduleName:(NSString *)moduleName initProps:(NSDictionary *)initProps;
- (BOOL)isReactNavPageHeaderView;
+ (UIView *)findAppBarInView:(UIView *)view;
+ (UIView *)findReactNavPageHeaderViewInView:(UIView *)view;
@end

