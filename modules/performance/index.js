/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Perf from 'react-addons-perf';

// Only apply the contents of this file, if in development mode.
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  window.startPerf = () => {
    Perf.start();
  };

  window.stopPerf = () => {
    Perf.stop();

    const measurements = Perf.getLastMeasurements();

    console.warn('Inclusive Timings');
    Perf.printInclusive(measurements);

    console.warn('Exclusive Timings');
    Perf.printExclusive(measurements);

    console.warn('Wasted Timings');
    Perf.printWasted(measurements);
  };
}
