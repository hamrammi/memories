export const TOGGLE_SUBDIRS = 'TOGGLE_SUBDIRS'

export function toggleSubdirs(directoryId) {
  return {
    type: TOGGLE_SUBDIRS,
    payload: {
      directoryId
    }
  }
}
