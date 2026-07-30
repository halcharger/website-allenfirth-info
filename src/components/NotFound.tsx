import type { ReactNode } from 'react'
import { Container } from './Container'
import { Button } from './Button'

export function NotFound({ children }: { children?: ReactNode }) {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-medium tracking-wide text-accent uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text">
        Page not found
      </h1>
      <div className="mt-3 max-w-md text-text-muted">
        {children ?? (
          <p>The page you are looking for does not exist or has been moved.</p>
        )}
      </div>
      <div className="mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </Container>
  )
}
