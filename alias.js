import { resolve } from 'path'

const root = p => resolve(__dirname, p)

export const alias = {
  '~': root('.'),
  '~/': root('./'),
  '~~': root('.'),
  '~~/': root('./'),
  '@': root('.'),
  '@/': root('./'),
  '@@': root('.'),
  '@@/': root('./'),
}
