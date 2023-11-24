export const COMPANY_LEGAL_NAME = "iatro GmbH";
export const APP_NAME = "haemo";

export const LOGIN_URL =
    `${process.env.PUBLIC_LOGIN_TOKEN_BASE_URL}/realms/haemo/protocol/openid-connect/token`;

export const USER_DATA_URL = (id: string) =>
    `${process.env.PUBLIC_LOGIN_TOKEN_BASE_URL}/admin/realms/haemo/users/${id}`;
