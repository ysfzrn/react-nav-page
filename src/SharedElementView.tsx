import React from 'react';
import SharedElementViewComponent from './SharedElementViewNativeComponent';
import { type ViewProps } from 'react-native';

type Props = ViewProps & {
  sharedID: string;
};

export const SharedElementView = (props: Props) => {
  const { sharedID } = props || {};
  return (
    <SharedElementViewComponent
      {...props}
      sharedID={sharedID}
      nativeID={sharedID}
    />
  );
};
