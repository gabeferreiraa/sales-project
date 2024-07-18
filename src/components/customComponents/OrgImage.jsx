import React, { useState, useEffect } from "react";

async function getLogoURL(orgName) {
  const encodedName = encodeURIComponent(orgName);
  const logoURL = `https://logo.clearbit.com/${encodedName}.com`;
  try {
    const response = await fetch(logoURL);
    if (response.ok) {
      return logoURL;
    }
    throw new Error("Logo not found");
  } catch (error) {
    console.error("Error fetching logo:", error);
    return ""; // Return an empty string if the logo is not found
  }
}

const OrgImage = ({ orgName }) => {
  const [logoURL, setLogoURL] = useState("");

  useEffect(() => {
    async function fetchLogo() {
      const url = await getLogoURL(orgName);
      setLogoURL(url);
    }

    fetchLogo();
  }, [orgName]);

  return (
    <div>
      {logoURL ? (
        <img className="rounded" src={logoURL} alt={`${orgName} logo`} />
      ) : (
        <p>Logo not found</p>
      )}
    </div>
  );
};

export default OrgImage;
