'use client'
import { useState } from 'react'

export default function CopyInstall({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="bg-gray-950 border border-gray-700 rounded-lg p-3 mb-3">
        <code className="text-xs text-green-400 break-all">{command}</code>
      </div>
      <button
        onClick={handleCopy}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
      >
        {copied ? '✓ Copied!' : 'Copy install command'}
      </button>
    </div>
  )
}
