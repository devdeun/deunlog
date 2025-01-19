import * as fs from 'node:fs/promises'

import { Octokit, type RestEndpointMethodTypes } from '@octokit/rest'
import fg from 'fast-glob'

import type { ProcessedResult } from './sharp-api.js'

export type GitTreeBlob = RestEndpointMethodTypes['git']['createTree']['parameters']['tree'][number]

export const GITHUB_TOKEN = process.env['GITHUB_TOKEN']
export const GITHUB_REPOSITORY = process.env['GITHUB_REPOSITORY']!
export const [owner, repo] = GITHUB_REPOSITORY.split('/')

export const GITHUB_PULL_REQUEST = JSON.parse(process.env['GITHUB_PULL_REQUEST']!)

if (!GITHUB_TOKEN) {
  console.log('::error:: There is no GITHUB_TOKEN environment variable')
  process.exit(1)
}

export const api = new Octokit({
  auth: `token ${GITHUB_TOKEN}`,
})

export const createComment = (content: string) => {
  return api.rest.issues.createComment({
    owner: owner,
    repo: repo,
    issue_number: GITHUB_PULL_REQUEST.number,
    body: content,
  })
}

const imageToBase64 = async (path: string) => {
  const buffer = await fs.readFile(path)
  const base64 = buffer.toString('base64')
  return base64
}

export const createTreeBlobs = async (image: ProcessedResult) => {
  const blobs: GitTreeBlob[] = []

  if (image.convertedToAvif) {
    blobs.push({
      path: image.path,
      mode: '040000',
      type: 'blob',
      sha: null,
    })
  }

  const filePath = image.convertedToAvif ? image.avifPath! : image.path
  const encodedImage = await imageToBase64(filePath)

  const imageBlob = await api.rest.git.createBlob({
    owner,
    repo,
    content: encodedImage,
    encoding: 'base64',
  })

  blobs.push({
    path: filePath,
    mode: '100644',
    type: 'blob',
    sha: imageBlob.data.sha,
  })

  const mdxFiles = await fg('src/content/post/**/*.mdx')

  for (const mdxPath of mdxFiles) {
    console.log('::✧:: Processing MDX:', mdxPath)
    const content = await fs.readFile(mdxPath, 'utf-8')
    const mdxBlob = await api.rest.git.createBlob({
      owner,
      repo,
      content: content,
      encoding: 'utf-8',
    })

    blobs.push({
      path: mdxPath,
      mode: '100644',
      type: 'blob',
      sha: mdxBlob.data.sha,
    })
  }

  return blobs
}

export const createCommit = async ({
  message,
  treeBlobs,
}: {
  message: string
  treeBlobs: GitTreeBlob[]
}) => {
  const recentCommitSHA = GITHUB_PULL_REQUEST.head.sha

  const latestCommit = await api.rest.git.getCommit({
    owner,
    repo,
    commit_sha: recentCommitSHA,
  })
  const baseTreeSha = latestCommit.data.tree.sha

  const newTree = await api.rest.git.createTree({
    owner,
    repo,
    base_tree: baseTreeSha,
    tree: treeBlobs,
  })
  console.log('✧ newTree', newTree.data.url)

  const commit = await api.rest.git.createCommit({
    owner,
    repo,
    message,
    tree: newTree.data.sha,
    parents: [recentCommitSHA],
  })
  console.log('✧ created commit', commit.data.url)

  await api.rest.git.updateRef({
    owner,
    repo,
    ref: `heads/${GITHUB_PULL_REQUEST.head.ref}`,
    sha: commit.data.sha,
  })

  return commit.data
}
