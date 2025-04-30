import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../../../components/loading/LoadingSpinner'
import EmptyState from '../../../components/emptyState/EmptyState'
import Tooltip from '../../../components/tooltip/Tooltip'
import ContractTable from './table/ContractTable'
import AddContractModal from './modal/AddContractModal'
import useHandleContract from '../hooks/useHandleContract'
import { getAdContract } from '../../../api/advertisement/advertisement'

const ContractList = ({ activeRow, contractModalRef }) => {
  const {
    limit,
    page,
    setPage,
    total,
    contractList,
    getContractList
  } = useHandleContract();
  const [mode, setMode] = useState("add");
  const [selectedContract, setSelectedContract] = useState(null);
  // 임시 광고계약 리스트 로드
  useEffect(() => {
    if (!activeRow) return;
    getContractList(activeRow);
  }, [activeRow, page]);

  const handleOpenEditModal = (mode, rowData) => {
    setMode(mode)
    if (mode === "add") {
      setSelectedContract(null);
      contractModalRef.current.showModal();
    } else if (mode === "modify" && rowData) {
      setSelectedContract(rowData);
      contractModalRef.current.showModal();
    }
  }
  return (
    <>
      <div className="relative flex-1 p-5 bg-sky-50 rounded-[10px] border border-blue-200">
        {activeRow ? (
          <ContractTable
            limit={limit}
            page={page}
            setPage={setPage}
            total={total}
            activeRow={activeRow}
            contractModalRef={contractModalRef}
            contractList={contractList}
            handleOpenEditModal={handleOpenEditModal}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <EmptyState text="자세한 계약 내용을 확인하려면 항목을 클릭하세요." />
          </div>
        )}
      </div>
      {/* 계약추가 모달 */}
      <AddContractModal
        activeRow={activeRow}
        modalRef={contractModalRef}
        mode={mode}
        getContractList={getContractList}
        selectedContract={selectedContract}
        setSelectedContract={setSelectedContract}
      />
    </>
  )
}

export default ContractList