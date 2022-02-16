import { FunctionComponent } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, IButton } from '.'

export const PlusButton: FunctionComponent<IButton> = (props) => {
  return <Button {...props} leftIcon={<AiOutlinePlus className={`text-md`} />} />
}
