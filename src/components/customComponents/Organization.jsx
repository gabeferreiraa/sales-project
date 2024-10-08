import React, { useState } from "react";
import { Button } from "../ui/button";
import OrgImage from "./OrgImage";
import OrgModal from "./OrgModal";

const Organization = ({
  id,
  name,
  status,
  notes,
  users,
  handleDeleteOrg,
  addUserToOrg,
  updateOrgDetails,
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
      <h1 className="text-lg">{name}</h1>
      <OrgImage organization={name} />
      <p>{status}</p>
      <Button variant="outline" onClick={handleExpandView}>
        Expand view
      </Button>
      <OrgModal
        open={modalOpen}
        onClose={handleCloseModal}
        orgDetails={{ id, name, status, notes, users }}
        addUserToOrg={addUserToOrg}
        handleDeleteOrg={handleDeleteOrg}
        updateOrgDetails={updateOrgDetails}
      />
    </div>
  );
};

export default Organization;
