[![npm version](https://img.shields.io/npm/v/@kazeusagi/chat-app-types.svg)](https://www.npmjs.com/package/@kazeusagi/chat-app-types)

![skill icons](https://skillicons.dev/icons?i=docker,nodejs,express,ts,prisma,mysql)

# Chat App

チャットアプリ練習 APIサーバー

prettierは動くが、ESLintがなぜか動かない...

## Issue

・ESLint未設定  
・tsxが動かない

- tsoaからImportが出来ない
  > import { Controller } from 'tsoa';  
  > tsoa/dist/indexからimportすると一応直る

・ts-nodeが動かない

- TypeError: Unknown file extension ".ts" for /home/user/app/prisma/seed/seed.ts
  > package.jsonのtype="module"を消せばとりあえず動く
- Error: Cannot find module '@/types'
  > ts-nodeはデフォルトでtsconfig.jsonのpathsを読み込まないらしい  
  > 修正するにはカスタムローダーを自作する必要あり

とりあえずtsxとts-nodeを併用するが、Typescript runnerが2つ存在するのは違和感があるので、そのうち何とかしたい
→tsxのみを使用する形に修正

・tsoaでprismaの型をimportできない

> https://github.com/lukeautry/tsoa/issues/1185  
> 上記issueの通りtsoaでは複雑な型を読み込めないらしく、prismaで生成された型を読み込めない  
> そのため、prismaの型をシンプルにした自作型を使用する（2元管理になってしまうので避けたかったが...）
