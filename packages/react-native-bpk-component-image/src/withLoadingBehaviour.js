/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

// From Recompose: https://github.com/acdlite/recompose/blob/master/src/packages/recompose/getDisplayName.js
const getDisplayName = Component => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

const wrapDisplayName = (BaseComponent, hocName) =>
  `${hocName}(${getDisplayName(BaseComponent)})`;

export default function withLoadingBehavior(Component) {
  class WithLoadingBehavior extends React.Component {
    constructor() {
      super();

      this.state = {
        loaded: false,
      };
    }

    onLoad = () => {
      this.setState(() => ({
        loaded: true,
      }));
    };

    render() {
      return (
        <Component
          onLoad={this.onLoad}
          loaded={this.state.loaded}
          {...this.props}
        />
      );
    }
  }
  WithLoadingBehavior.displayName = wrapDisplayName(
    Component,
    'withLoadingBehavior',
  );
  return WithLoadingBehavior;
}
