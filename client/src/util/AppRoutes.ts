/**
 * Module with application routes related stuff.
 */

/**
 * Enum with application routes.
 */
export enum AppRoutes {
  ItemList = '/',
  ScheduleItem = '/schedule-item/:id/',
}
  
/**
 * Composes path for one of the takeoff routes.
 * 
 * @param path component path to replace the ID substitute in
 * @param takeoffId ID of the takeoff to compose path for
 */
export function composeScheduleItemPath(id: number): string {
  return AppRoutes.ScheduleItem.replace('/:id/', `/${id}/`);
}
