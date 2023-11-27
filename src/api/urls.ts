export function getLoginURL() {
    if (process.env.NEXT_PUBLIC_EXTERNAL_KEYCLOAK_BASE_URL) {
      return `${process.env.NEXT_PUBLIC_EXTERNAL_KEYCLOAK_BASE_URL}/realms/haemo/protocol/openid-connect/token`;
    }
    return "http://localhost:8079/realms/haemo/protocol/openid-connect/token";
}

export function getUserDataURL(id: string) {
    if (process.env.NEXT_PUBLIC_EXTERNAL_KEYCLOAK_BASE_URL) {
      return `${process.env.NEXT_PUBLIC_EXTERNAL_KEYCLOAK_BASE_URL}/admin/realms/haemo/users/${id}`;;
    }
    return `http://localhost:8079/admin/realms/haemo/users/${id}`;
}
