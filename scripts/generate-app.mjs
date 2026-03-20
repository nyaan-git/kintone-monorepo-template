import prompts from 'prompts'
import { cpSync, readFileSync, writeFileSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const appsDir = resolve(rootDir, 'apps')
const templateDir = resolve(rootDir, 'templates/app-template')

async function main() {
  console.log('\n🚀 kintone アプリ ジェネレーター\n')

  // テンプレートの存在確認
  if (!existsSync(templateDir)) {
    console.error('❌ テンプレートが見つかりません: templates/app-template')
    process.exit(1)
  }

  const response = await prompts([
    {
      type: 'text',
      name: 'appName',
      message: 'アプリ名は？（例: customer-app）',
      validate: (value) => {
        if (!value) return 'アプリ名を入力してください'
        if (!/^[a-z][a-z0-9-]*$/.test(value)) {
          return '小文字英数字とハイフンのみ使用可能です（例: my-app）'
        }
        if (existsSync(resolve(appsDir, value))) {
          return `${value} は既に存在します`
        }
        return true
      }
    },
    {
      type: 'text',
      name: 'appId',
      message: 'kintone アプリIDは？',
      validate: (value) => {
        if (!value) return 'アプリIDを入力してください'
        if (!/^\d+$/.test(value)) return '数字を入力してください'
        return true
      }
    },
    {
      type: 'text',
      name: 'prodAppId',
      message: '本番用アプリIDは？（後で設定する場合は空エンター）',
    }
  ])

  if (!response.appName || !response.appId) {
    console.log('キャンセルしました')
    process.exit(1)
  }

  const newAppDir = resolve(appsDir, response.appName)

  // テンプレートをコピー
  console.log(`\n📁 ${response.appName} を作成中...`)
  cpSync(templateDir, newAppDir, { recursive: true })

  // プレースホルダーを置換する関数
  function replacePlaceholders(filePath) {
    let content = readFileSync(filePath, 'utf-8')
    content = content.replace(/\{\{APP_NAME\}\}/g, response.appName)
    content = content.replace(/\{\{APP_ID\}\}/g, response.appId)
    content = content.replace(/\{\{PROD_APP_ID\}\}/g, response.prodAppId || 'YOUR_PROD_APP_ID')
    writeFileSync(filePath, content)
  }

  // 各設定ファイルのプレースホルダーを置換
  replacePlaceholders(resolve(newAppDir, 'package.json'))
  replacePlaceholders(resolve(newAppDir, 'customize-manifest.json'))
  replacePlaceholders(resolve(newAppDir, 'customize-manifest.prod.json'))

  console.log(`\n✅ 完了！\n`)
  console.log(`次のステップ:`)
  console.log(`  cd apps/${response.appName}`)
  console.log(`  pnpm install`)
  console.log(`  pnpm dev:kintone`)
  console.log('')
}

main().catch(console.error)
