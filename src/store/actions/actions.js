export const TOGGLE_SUBDIRECTORIES = 'TOGGLE_SUBDIRECTORIES'
export const LOAD_DIRECTORY_CONTENT = 'LOAD_DIRECTORY_CONTENT'

export function toggleSubdirectories(directoryId) {
  return {
    type: TOGGLE_SUBDIRECTORIES,
    payload: {
      directoryId
    }
  }
}

export function loadDirectoryContent (directoryId) {
  return {
    type: LOAD_DIRECTORY_CONTENT,
    payload: {
      directoryId
    }
  }
}
