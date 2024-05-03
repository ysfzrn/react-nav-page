#import "SharedElementImage.h"

#import <React/RCTConversions.h>
#import <RCTTypeSafety/RCTConvertHelpers.h>

#import <react/renderer/components/RNReactNavPageSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNReactNavPageSpec/EventEmitters.h>
#import <react/renderer/components/RNReactNavPageSpec/Props.h>
#import <react/renderer/components/RNReactNavPageSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "react_nav_page-Swift.h"

using namespace facebook::react;

@interface SharedElementImage () <RCTSharedElementImageViewProtocol>

@end

@implementation SharedElementImage {
    UIView * _view;
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<SharedElementImageComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const SharedElementImageProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<SharedElementImageProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<SharedElementImageProps const>(props);

    if (oldViewProps.color != newViewProps.color) {
        NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
        [_view setBackgroundColor:[self hexStringToColor:colorToConvert]];
    }
    
    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> SharedElementImageCls(void)
{
    return SharedElementImage.class;
}

- hexStringToColor:(NSString *)stringToConvert
{
    NSString *noHashString = [stringToConvert stringByReplacingOccurrencesOfString:@"#" withString:@""];
    NSScanner *stringScanner = [NSScanner scannerWithString:noHashString];
    
    unsigned hex;
    if (![stringScanner scanHexInt:&hex]) return nil;
    int r = (hex >> 16) & 0xFF;
    int g = (hex >> 8) & 0xFF;
    int b = (hex) & 0xFF;
    
    return [UIColor colorWithRed:r / 255.0f green:g / 255.0f blue:b / 255.0f alpha:1.0f];
}

@end
