export const extractToken = (header: string | undefined) => {
  if (!header || !header.startsWith('Bearer ')) {
    return null
  }
  return header.split(' ')[1]
}