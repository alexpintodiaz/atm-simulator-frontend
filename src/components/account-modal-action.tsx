import NumberFormat from 'react-number-format'
import { Money, Fire } from 'phosphor-react'
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

  const { accountDepositWithdrawals, isLoading } = useAccounts()

  const handleChange = useCallback((value: number) => {
    setValue(value)
  }, [])

  const handleConfirm = useCallback(
    async (type: TransactionType, amount: number) => {
      await accountDepositWithdrawals(accountNumber, type, amount)
      handleCloseModal()
    },
    [accountDepositWithdrawals, accountNumber, handleCloseModal],
  )

  return (
    <Modal isOpen={isModalOpen} onOpenChange={handleCloseModal}>
      <ModalBody>
        <ModalContent>
          <ModalHeader className='mb-6 space-y-3'>
            <div className='flex'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-metal-50 dark:bg-metal-800'>
                {transactionType === 'deposit' ? (
                  <Money size={28} color='#2a9d8f' />
                ) : (
                  <Fire size={28} color='#d41c1c' />
                )}
              </div>
              <ModalTitle className='mt-2 ml-3'>
                Select Transaction Type
              </ModalTitle>
            </div>
            <div className='space-y-1'>
              <div className='flex items-center gap-6 px-4 pb-4'>
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
                  <Label htmlFor='withdraw'>Withdrawal</Label>
                </fieldset>
              </div>
              <span>Investment:</span>
              <NumberFormat
                className='w-1/2 ml-4 py-2 px-4 rounded-lg !border outline-none focus:border-[#09BACA]'
                value={value}
                onValueChange={({ value }) => handleChange(Number(value))}
                name='value'
                prefix={'$'}
                thousandSeparator={true}
              />
            </div>
          </ModalHeader>
          <ModalFooter className='flex justify-evenly'>
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
