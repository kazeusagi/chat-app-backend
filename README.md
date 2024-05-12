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
