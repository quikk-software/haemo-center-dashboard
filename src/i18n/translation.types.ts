export type Translation = {
  auth: {
    login: string;
    loginTitle: string;
    logout: string;
  };
};

export type TypesafeNamespace = keyof Translation;
export type TypesafeTranslation = keyof Translation[TypesafeNamespace];

export type TypeSafeIdentifier = `${TypesafeNamespace}:${TypesafeTranslation}`;
