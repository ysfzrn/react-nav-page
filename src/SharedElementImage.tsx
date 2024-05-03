import React from 'react';
import SharedElementImageComponent from './SharedElementImageNativeComponent';
import { type ImageProps } from 'react-native';
import { Platform, Image } from 'react-native';
import { SharedElementView } from './SharedElementView';
const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');

interface SourceProps {
  uri?: string;
  type?: string;
  local?: boolean;
}

type Props = ImageProps & {
  sharedID: string;
  source: SourceProps;
};

export const SharedElementImage = (props: Props) => {
  const { sharedID } = props || {};

  if (Platform.OS === 'ios') {
    return (
      <SharedElementView
        nativeID={sharedID}
        sharedID={sharedID}
        style={props.style}
      >
        <Image {...props} nativeID={sharedID} resizeMode="cover" />
      </SharedElementView>
    );
  }

  const { source } = props || {};

  let resolvedAsset: SourceProps = { uri: '', type: '' };

  if (source?.uri) {
    resolvedAsset = source;
  } else {
    resolvedAsset = resolveAssetSource(source);
  }

  return (
    <SharedElementImageComponent
      {...props}
      sharedID={sharedID}
      nativeID={sharedID}
      source={{
        uri: resolvedAsset?.uri,
        type: source?.type,
        local: source?.uri ? false : true,
      }}
    />
  );
};
