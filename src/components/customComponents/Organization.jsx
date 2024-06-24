import React, { useState } from "react";
import { Button } from "../ui/button";
import OrgImage from "./OrgImage";
import OrgModal from "./OrgModal";

const Organization = ({
  id,
  orgName,
  status,
  users,
  handleDeleteOrg,
  addUserToOrg,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleExpandView = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-between border p-4 font-bold text-md bg-white rounded-md shadow-md h-72">
      <h1 className="text-lg">{orgName}</h1>
      <OrgImage orgName={orgName} />
      <p>{status}</p>
      <Button variant="outline" onClick={handleExpandView}>
        Expand view
      </Button>
      <OrgModal
        open={modalOpen}
        onClose={handleCloseModal}
        orgDetails={{ id, orgName, status, users }}
        addUserToOrg={addUserToOrg}
        handleDeleteOrg={handleDeleteOrg}
      />
    </div>
  );
};

export default Organization;
