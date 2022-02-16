import { FunctionComponent } from 'react'

import Link from 'next/link'

import { Button, IButton } from '.'

interface ILinkButton extends IButton {
  href?: string
}

export const LinkButton: FunctionComponent<ILinkButton> = ({ href = '#', ...rest }) => {
  return (
    <Link href={href}>
      <a>
        <Button {...rest} />
      </a>
    </Link>
  )
}
