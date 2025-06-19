import React, { useState } from "react";

const useBroadcastManagement = () => {
  const [formData, setFormData] = useState({});

  return {
    formData,
    setFormData,
  };
};

export default useBroadcastManagement;
