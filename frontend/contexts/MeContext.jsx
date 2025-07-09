import React, { createContext } from 'react';

// No default value (undefined) enforces usage inside provider
const MeContext = createContext(undefined);
export default MeContext;