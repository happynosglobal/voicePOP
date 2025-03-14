import React, { useMemo, useState } from 'react'
import useUserStore from '../../../stores/user';

const useAddContractForm = () => {
  const { user } = useUserStore();
  const initialFormData = useMemo(() => ({
    company_id: "",
    ad_type: "",
    contract_from: "",
    contract_to: "",
    comment: "",
    status: "",
    use_yn: "Y",
    user_id: user?.user_id || ""
  }), [user?.user_id])
  const [formData, setFormData] = useState(initialFormData);
  console.log(formData)
  return {
    initialFormData,
    formData,
    setFormData
  }
}

export default useAddContractForm;