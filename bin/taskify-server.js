#!/usr/bin/env node

/**
 * Taskify Server — starts JSS with the right settings for Taskify.
 *
 * Usage: taskify-server [--port 3005] [--database taskify]
 */

import { execFileSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

var PORT = 3005
var DATABASE = 'taskify'

process.argv.forEach(function (arg, i) {
  if (arg === '--port' && process.argv[i + 1]) PORT = parseInt(process.argv[i + 1], 10)
  if (arg === '--database' && process.argv[i + 1]) DATABASE = process.argv[i + 1]
})

var __dirname = dirname(fileURLToPath(import.meta.url))
var jss = resolve(__dirname, '..', 'node_modules', '.bin', 'jss')

console.log('Taskify Server v0.0.1')
console.log('Port: ' + PORT)
console.log('Database: ' + DATABASE)
console.log('')

try {
  execFileSync(jss, [
    'start',
    '--port', String(PORT),
    '--root', '.',
    '--mongo',
    '--mongo-database', DATABASE,
    '--public',
    '--notifications'
  ], { stdio: 'inherit' })
} catch (err) {
  process.exit(err.status || 1)
}
