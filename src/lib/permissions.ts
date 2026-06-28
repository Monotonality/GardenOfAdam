import type { App, AppAccess } from "./apps"

export type PermissionLevel = "public" | "user" | "approved" | "owner"

export interface UserPermissions {
  userId: string
  email: string
  isOwner: boolean
  approvedApps: string[] // slugs of approved apps
}

/**
 * Check if a user can access a given app based on their permissions.
 */
export function canAccessApp(
  app: App,
  permissions: UserPermissions | null
): boolean {
  switch (app.access) {
    case "public":
      return true
    case "user":
      return permissions !== null
    case "approved":
      return (
        permissions !== null &&
        (permissions.isOwner || permissions.approvedApps.includes(app.slug))
      )
    case "owner":
      return permissions !== null && permissions.isOwner
    default:
      return false
  }
}

/**
 * Filter the app list to only show apps the user can access.
 */
export function getAccessibleApps(
  apps: App[],
  permissions: UserPermissions | null
): App[] {
  return apps.filter((app) => canAccessApp(app, permissions))
}
