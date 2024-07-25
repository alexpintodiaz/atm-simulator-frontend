import { Card, CardContent, CardDescription, CardTitle } from 'keep-react'
import { FC } from 'react'

interface CardComponentProps {
  title: string
  text: string
  className?: string
}

export const CardComponent: FC<CardComponentProps> = ({
  className,
  title,
  text,
}) => {
  return (
    <Card className={`max-w-md ${className}`}>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{text}</CardDescription>
      </CardContent>
    </Card>
  )
}
