export const TOGGLE_SUBDIRECTORIES = 'TOGGLE_SUBDIRECTORIES'
export const SEARCH_MEMORIES__LOAD_DIRECTORY_CONTENT = 'LOAD_DIRECTORY_CONTENT'
export const ADD_MEMORY__MARK_DIRECTORY_AS_ACTIVE = 'ADDMEMORY::MARK_DIRECTORY_AS_ACTIVE'

export function toggleSubdirectories(directoryId, component) {
  return {
    type: TOGGLE_SUBDIRECTORIES,
    payload: { directoryId },
    meta: { component }
  }
}

export function SearchMemoriesLoadDirectoryContent (directoryId) {
  return {
    type: SEARCH_MEMORIES__LOAD_DIRECTORY_CONTENT,
    payload: { directoryId }
  }
}

export function AddMemoryMarkDirectoryAsActive (directoryId) {
  return {
    type: ADD_MEMORY__MARK_DIRECTORY_AS_ACTIVE,
    payload: { directoryId }
  }
}
