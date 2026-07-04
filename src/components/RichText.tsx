import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/**
 * Renders Lexical rich-text from Payload. Falls back to nothing when the field
 * is empty. Wrap in a `.rl-richtext` container for the storefront's type scale.
 */
export function RichText({ data, className }: { data: unknown; className?: string }) {
  if (!data || typeof data !== 'object') return null
  return (
    <div className={className ?? 'rl-richtext'}>
      <LexicalRichText data={data as SerializedEditorState} />
    </div>
  )
}
