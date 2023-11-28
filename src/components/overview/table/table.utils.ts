import logger from "@/core/logger";

// Sorry @mui :)
export const removeMuiLicenseMissing = () => {
  const missingLicenseXpath = "//div[text()='MUI X Missing license key']";
  const missingLicenseElement = document.evaluate(
    missingLicenseXpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue;

  if (!missingLicenseElement) {
    logger.debug("MUI License not found :(");
    return;
  }

  if ((missingLicenseElement as HTMLElement).style.display !== "none") {
    (missingLicenseElement as HTMLElement).style.display = "none";
    logger.debug("MUI License removed d7:^)");
    return;
  }
};
