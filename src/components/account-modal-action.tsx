import NumberFormat from 'react-number-format'
import { CloudArrowUp } from 'phosphor-react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Checkbox,
  Label,
  Spinner,
} from 'keep-react'
import { useCallback, useState } from 'react'
import { useAccounts } from '../hooks/use-accounts'
import { useUserStore } from '../store/user-store'
import { TransactionType } from '../api/interfaces/accounts-api'

interface AccountModalActionProps {
  isModalOpen: boolean
  handleCloseModal: () => void
}

export const AccountModalAction = ({
  isModalOpen,
  handleCloseModal,
}: AccountModalActionProps) => {
  const [transactionType, setTransactionType] =
    useState<TransactionType>('deposit')

  const [value, setValue] = useState(0)

  const accountNumber = useUserStore(
    (store) => store.accounts[0].account_number,
  )

  const { accountDeposit, isLoading } = useAccounts()

  const handleChange = useCallback((value: number) => {
    setValue(value)
  }, [])

  const handleConfirm = useCallback(
    async (type: TransactionType, amount: number) => {
      await accountDeposit(accountNumber, type, amount)
      handleCloseModal()
    },
    [accountDeposit, accountNumber, handleCloseModal],
  )

  return (
    <Modal isOpen={isModalOpen} onOpenChange={handleCloseModal}>
      <ModalBody>
        <ModalContent>
          <ModalHeader className='mb-6 space-y-3'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-metal-50 dark:bg-metal-800'>
              <CloudArrowUp size={28} color='#1B4DFF' />
            </div>
            <div className='space-y-1 bg-red-100'>
              <ModalTitle>Select Transaction Type</ModalTitle>
              <>
                <fieldset className='flex items-center gap-2'>
                  <Checkbox
                    id='deposit'
                    variant='circle'
                    checked={transactionType === 'deposit'}
                    onChange={() => setTransactionType('deposit')}
                  />
                  <Label htmlFor='deposit'>Deposit</Label>
                </fieldset>
                <fieldset className='flex items-center gap-2'>
                  <Checkbox
                    id='withdraw'
                    variant='circle'
                    checked={transactionType === 'withdraw'}
                    onChange={() => setTransactionType('withdraw')}
                  />
                  <Label htmlFor='withdraw'>Withdraw</Label>
                </fieldset>
              </>
              <span>Investment:</span>
              <NumberFormat
                className='p-2 rounded-lg !border outline-none focus:border-[#1072ba]'
                value={value}
                onValueChange={({ value }) => handleChange(Number(value))}
                name='value'
                prefix={'$'}
                thousandSeparator={true}
              />
            </div>
          </ModalHeader>
          <ModalFooter>
            <Button
              size='sm'
              variant='outline'
              color='secondary'
              onClick={handleCloseModal}>
              Cancel
            </Button>

            <Button
              size='sm'
              color='primary'
              onClick={() => handleConfirm(transactionType, value)}>
              {isLoading ? <Spinner color='info' size='md' /> : 'Confirm'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  )
}
