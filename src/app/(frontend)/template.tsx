import React from 'react'

// A template re-mounts on every navigation, so the `.rl-view` fade replays on
// each route change — giving a consistent, library-free page-enter transition.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="rl-view">{children}</div>
}
