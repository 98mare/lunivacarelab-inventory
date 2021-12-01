import { lazy } from "react";
import pMinDelay from 'p-min-delay';

export const AsyncLogin = lazy(()=> pMinDelay(import('../Components/Login/Login'), 300))

export const AsyncPublicLayout = lazy(() => pMinDelay(import('../layout/publicLayout'), 300));

export const AsyncAppLayout = lazy(() => pMinDelay(import('../layout/appLayout'), 300));

export const AsyncDashbord = lazy(() => pMinDelay(import('../Containers/DashBoardContainer'), 300));

export const AsyncGoodsIn = lazy(() => pMinDelay(import('../Components/GoodsIn/index'), 300));
export const AsyncGoodsInAdd = lazy(() => pMinDelay(import('../Components/GoodsIn/AddGoods'), 300));

export const AsyncGoodOut = lazy(() => pMinDelay(import('../Components/GoodsOut/index'), 300));
export const AsyncGoodsOutAdd = lazy(() => pMinDelay(import('../Components/GoodsOut/AddGoodsOut'), 300));

export const AsyncItems = lazy(() => pMinDelay(import('../Components/Item/index'), 300));
export const AsyncAddItems = lazy(() => pMinDelay(import('../Components/Item/AddItem'), 300));

export const AsyncType = lazy(() => pMinDelay(import('../Components/Type/index'), 300));
export const AsyncAddType = lazy(() => pMinDelay(import('../Components/Type/AddType'), 300));

export const AsyncCategory = lazy(() => pMinDelay(import('../Components/Category/index'), 300));
export const AsyncAddCategory = lazy(() => pMinDelay(import('../Components/Category/AddCategory'), 300));

export const AsyncLocation = lazy(() => pMinDelay(import('../Components/Location/index'), 300));
export const AsyncAddLocation = lazy(() => pMinDelay(import('../Components/Location/AddLocation'), 300));

export const AsyncRack = lazy(() => pMinDelay(import('../Components/Rack/index'), 300));
export const AsyncAddRack = lazy(() => pMinDelay(import('../Components/Rack/AddRack'), 300));

export const AsyncWastage = lazy(() => pMinDelay(import('../Components/Wastage/index'), 300));
export const AsyncAddWastage = lazy(() => pMinDelay(import('../Components/Wastage/AddWastage'), 300));

export const AsyncItemVsRatio = lazy(() => pMinDelay(import('../Components/ItemVsRatio/index'), 300));
export const AsyncAddItemVsRatio = lazy(() => pMinDelay(import('../Components/ItemVsRatio/AddItemVSRatio'), 300));

export const AsyncReports = lazy(() => pMinDelay(import('../Components/Reports/index'), 300));
export const AsyncAddReports = lazy(() => pMinDelay(import('../Components/Reports/AddReports'), 300));

export const AsyncSettings = lazy(() => pMinDelay(import('../Components/Common/Settings'), 300));

export const AsyncUnits = lazy(() => pMinDelay(import('../Components/Units/index'), 300));
export const AsyncAddUnits = lazy(() => pMinDelay(import('../Components/Units/AddUnits'), 300));