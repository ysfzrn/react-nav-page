import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';

interface SourceProps {
  uri?: string;
  type?: string;
  local?: boolean;
}

interface NativeProps extends ViewProps {
  color?: string;
  sharedID: string;
  source?: SourceProps;
}

export default codegenNativeComponent<NativeProps>('SharedElementImage');
