import React from 'react'
import Cond from './Cond'
import { cn } from './_util'

export default function Media({
  as = 'img',
  outerClass,
  src,
  alt = '',
  cover,
  auto,
  priority,
  ...props
}) {
  const responsive = as === 'img' && src && src.includes('.webp') && !src.startsWith('http')
  const srcset = `/sm/${src} 640w, /md/${src} 1024w, /lg/${src}`

  return (
    <div className={cn('fui-media', outerClass)} style={cover ? coverOuterStyles : defaultOuterStyles}>
      <div className='fui-placeholder' style={placeholderStyles} />
      <Cond
        hide={!src}
        as={as}
        src={(!responsive && priority) ? src : undefined}
        data-lazy-src={(!responsive && !priority) ? src : undefined}
        srcSet={(responsive && priority) ? srcset : undefined}
        data-lazy-srcset={(responsive && !priority) ? srcset : undefined}
        sizes={responsive ? '100vw' : undefined}
        allowFullScreen={as === 'iframe'}
        title={as === 'iframe' ? alt : undefined}
        alt={alt}
        style={typeof as === 'string' ? defaultMediaStyles(as) : undefined}
        autoPlay={as === 'video' && auto}
        muted={as === 'video' && auto}
        loop={as === 'video' && auto}
        playsInline={as === 'video' && auto}
        {...props}
      />
    </div>
  )
}

const defaultOuterStyles = {
  overflow: 'hidden',
  position: 'relative',
  display: 'block',
  zIndex: '10',
}

const coverOuterStyles = {
  overflow: 'hidden',
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
}

const placeholderStyles = {
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundImage: 'linear-gradient(to right, #e0e0e0, #c0c0c0)',
}

const defaultMediaStyles = as => ({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  objectFit: as !== 'iframe' ? 'cover' : 'initial',
  objectPosition: as !== 'iframe' ? 'center' : 'initial',
})