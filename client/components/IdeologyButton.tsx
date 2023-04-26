import { Button } from '@mantine/core'

import { ChildrenProps } from '../../shared/types'

interface IdeologyButtonProps extends ChildrenProps {
  [key: string]: unknown
}

export default function IdeologyButton({
  children,
  ...props
}: IdeologyButtonProps) {
  return (
    <Button
      variant="outline"
      size="md"
      styles={() => ({
        root: {
          width: '10rem',
          height: 'auto',
          aspectRatio: '1 / 1',
        },
      })}
      {...props}
    >
      {!props.loading && children}
    </Button>
  )
}
