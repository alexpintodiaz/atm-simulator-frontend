import NumberFormat from 'react-number-format'
import { ArrowsClockwise } from 'phosphor-react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
} from 'keep-react'
import { useCallback, useState } from 'react'
import { useAccounts } from '../hooks/use-accounts'
import { useUserStore } from '../store/user-store'
import { AccountTransferPayload } from '../api/interfaces/accounts-api'

interface TransferModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
}

export const TransferModal = ({
  isModalOpen,
  handleCloseModal,
}: TransferModalProps) => {
  const [receipt, setReceipt] = useState('')
  const [value, setValue] = useState(0)

  const accountNumber = useUserStore(
    (store) => store.accounts[0].account_number,
  )

  const { accountTransfer, isLoading } = useAccounts()

  const handleReceiptChange = useCallback((value: string) => {
    setReceipt(value)
  }, [])

  const handleValueChange = useCallback((value: number) => {
    setValue(value)
  }, [])

  const handleConfirm = useCallback(
    async (receipt: string, value: number) => {
      const payload: AccountTransferPayload = {
        account_number: receipt,
        amount: value,
      }
      const resp = await accountTransfer(accountNumber, payload)

      if (resp) {
        handleCloseModal()
      }
    },
    [accountNumber, handleCloseModal, accountTransfer],
  )

  return (
    <Modal isOpen={isModalOpen} onOpenChange={handleCloseModal}>
      <ModalBody>
        <ModalContent>
          <ModalHeader className='mb-6 space-y-3'>
            <div className='flex'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-metal-50 dark:bg-metal-800'>
                <ArrowsClockwise size={28} color='#305bb8' />
              </div>
              <ModalTitle className='mt-2 ml-3'>
                Transfer between accounts
              </ModalTitle>
            </div>
            <div className='grid grid-cols-2 gap-y-4'>
              <span className='pt-2'>Receiving account:</span>
              <NumberFormat
                className='ml-4 py-2 px-4 rounded-lg !border outline-none focus:border-[#09BACA]'
                value={receipt}
                onValueChange={({ value }) => handleReceiptChange(value)}
                name='receipt'
              />
              <span className='pt-2'>Investment:</span>
              <NumberFormat
                className='ml-4 py-2 px-4 rounded-lg !border outline-none focus:border-[#09BACA]'
                value={value}
                onValueChange={({ value }) => handleValueChange(Number(value))}
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
              onClick={() => handleConfirm(receipt, value)}>
              {isLoading ? <Spinner color='info' size='md' /> : 'Send'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  )
}
