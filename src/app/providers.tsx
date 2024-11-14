'use client'

import {store} from '@/store'
import React from 'react';
import {Provider} from 'react-redux'

export const Providers = ({children}: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>;