import { lazy } from "react";

export const AsyncLogin = lazy(()=> import('../Components/Login/Login'))

export const AsyncPublicLayout = lazy(() => import('../layout/publicLayout'));

export const AsyncAppLayout = lazy(() => import('../layout/appLayout'));

export const AsyncGoodsIn = lazy(() => import('../Components/GoodsIn/index'));