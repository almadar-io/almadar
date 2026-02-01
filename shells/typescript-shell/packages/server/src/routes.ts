/**
 * Event Routes Registration
 *
 * Main routes file - registers all trait event routes.
 * All data operations flow through trait event handlers with guard enforcement.
 *
 * @packageDocumentation
 */

import type { Express } from 'express';
import atomsViewerRouter from './routes/features/atoms-viewer/routes.js';
import moleculesViewerRouter from './routes/features/molecules-viewer/routes.js';
import productCRUDRouter from './routes/features/product-crud/routes.js';
import cardGridViewerRouter from './routes/features/card-grid-viewer/routes.js';
import dashboardViewerRouter from './routes/features/dashboard-viewer/routes.js';
import masterDetailViewerRouter from './routes/features/master-detail-viewer/routes.js';
import searchFilterDemoRouter from './routes/features/search-filter-demo/routes.js';
import tabsDemoRouter from './routes/features/tabs-demo/routes.js';
import breadcrumbDemoRouter from './routes/features/breadcrumb-demo/routes.js';
import paginationDemoRouter from './routes/features/pagination-demo/routes.js';
import wizardDemoRouter from './routes/features/wizard-demo/routes.js';
import loadingStateDemoRouter from './routes/features/loading-state-demo/routes.js';
import emptyStateDemoRouter from './routes/features/empty-state-demo/routes.js';
import errorStateDemoRouter from './routes/features/error-state-demo/routes.js';
import modalDemoRouter from './routes/features/modal-demo/routes.js';
import drawerDemoRouter from './routes/features/drawer-demo/routes.js';
import accordionDemoRouter from './routes/features/accordion-demo/routes.js';
import alertDemoRouter from './routes/features/alert-demo/routes.js';
import gameDemoRouter from './routes/features/game-demo/routes.js';
import layoutViewerRouter from './routes/features/layout-viewer/routes.js';
import containerViewerRouter from './routes/features/container-viewer/routes.js';

/**
 * Register all trait event routes
 */
export function registerRoutes(app: Express): void {
  app.use('/api/atoms-viewer', atomsViewerRouter);
  app.use('/api/molecules-viewer', moleculesViewerRouter);
  app.use('/api/product-crud', productCRUDRouter);
  app.use('/api/card-grid-viewer', cardGridViewerRouter);
  app.use('/api/dashboard-viewer', dashboardViewerRouter);
  app.use('/api/master-detail-viewer', masterDetailViewerRouter);
  app.use('/api/search-filter-demo', searchFilterDemoRouter);
  app.use('/api/tabs-demo', tabsDemoRouter);
  app.use('/api/breadcrumb-demo', breadcrumbDemoRouter);
  app.use('/api/pagination-demo', paginationDemoRouter);
  app.use('/api/wizard-demo', wizardDemoRouter);
  app.use('/api/loading-state-demo', loadingStateDemoRouter);
  app.use('/api/empty-state-demo', emptyStateDemoRouter);
  app.use('/api/error-state-demo', errorStateDemoRouter);
  app.use('/api/modal-demo', modalDemoRouter);
  app.use('/api/drawer-demo', drawerDemoRouter);
  app.use('/api/accordion-demo', accordionDemoRouter);
  app.use('/api/alert-demo', alertDemoRouter);
  app.use('/api/game-demo', gameDemoRouter);
  app.use('/api/layout-viewer', layoutViewerRouter);
  app.use('/api/container-viewer', containerViewerRouter);
}
