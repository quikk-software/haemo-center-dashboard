export const COMPANY_LEGAL_NAME = "iatro GmbH";
export const APP_NAME = "haemo";

export const LOGIN_URL =
  "http://localhost:8079/realms/haemo/protocol/openid-connect/token";

export const USER_DATA_URL = (id: string) =>
  `http://localhost:8079/admin/realms/haemo/users/${id}`;
