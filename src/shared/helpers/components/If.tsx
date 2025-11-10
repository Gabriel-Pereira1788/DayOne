import React from 'react';

type Props = {
  condition: boolean;
  elseRender?: React.JSX.Element;
} & React.PropsWithChildren;

export function If({ condition, elseRender, children }: Props) {
  if (!condition && !!elseRender) {
    return elseRender;
  }
  return <>{condition && children}</>;
}
