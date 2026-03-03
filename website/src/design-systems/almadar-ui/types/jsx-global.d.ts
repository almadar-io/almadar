// React 19 moves JSX to React.JSX namespace
// This shim re-exports it globally for tsup DTS compatibility
//
// @react-three/fiber v8 augments the old global JSX.IntrinsicElements.
// React 19 uses React.JSX, so we bridge ThreeElements into React.JSX
// to fix the "Property 'mesh' does not exist" errors.
import 'react';
import type { ThreeElements } from '@react-three/fiber';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
