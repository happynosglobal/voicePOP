import React from 'react'
import LoadingSpinner from '../../../components/loading/LoadingSpinner'
import EmptyState from '../../../components/emptyState/EmptyState'
import Tooltip from '../../../components/tooltip/Tooltip'
import ContractTable from './table/ContractTable'
import AddContractModal from './modal/AddContractModal'

const ContractList = ({ activeRow, contractModalRef }) => {

  return (
    <>
      <div className="relative flex-1 p-5 bg-sky-50 rounded-[10px] border border-blue-200">
        <LoadingSpinner isLoading={false} />
        {activeRow ? (
          <ContractTable
            activeRow={activeRow}
            contractModalRef={contractModalRef}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <EmptyState text="자세한 계약 내용을 확인하려면 항목을 클릭하세요." />
          </div>
        )}
      </div>
      {/* 계약추가 모달 */}
      <AddContractModal activeRow={activeRow} modalRef={contractModalRef} />
    </>
  )
}

export default ContractList