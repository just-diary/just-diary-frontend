import { readFile, readdir, writeFile } from 'node:fs/promises'
import ttf2woff2 from 'ttf2woff2'

// find all .ttf files in the fonts directory
const files = await readdir('assets/fonts')
const ttfFiles = files.filter(file => file.endsWith('.ttf'))

// convert each .ttf file to .woff2
for (const file of ttfFiles) {
  console.log(`Converting ${file} to WOFF2`)
  const ttf = await readFile(`assets/fonts/${file}`)
  const woff2 = ttf2woff2(ttf)
  await writeFile(`public/fonts/${file.replace('.ttf', '.woff2')}`, woff2)
  console.log(`Converte ${file} to WOFF2 successfully`)
}
