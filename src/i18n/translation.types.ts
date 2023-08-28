export type Translation = {
  auth: {
    login: string;
    loginTitle: string;
    logout: string;
  };
  news: {
    title: string;
    createNewsFAB: string;
    createNewsButtonNoNewsScreen: string;
    textNoNewsScreen: string;
    backToPageOneButton: string;
    invalidPage: string;
    msg: {
      deletedNews: string;
      deleteNewsError: string;
      noFileSelected: string;
      unsupportedImageFormat: string;
      imageFileTooLarge: string;
      imageCouldNotBeProcessed: string;
      imageEmpty: string;
      linkEmpty: string;
      creatorNameEmpty: string;
      headlineEmpty: string;
      textEmpty: string;
      newsCreationSuccess: string;
      error: string;
      errorWithStatusCode: string;
    },
    altNewsImage: string;
    headlineFieldLabel: string;
    creatorNameFieldLabel: string;
    linkFieldLabel: string;
    textFieldLabel: string;
    imageSelectButton: string;
    imageChangeButton: string;
    createButton: string;
    updateButton: string;
    newsAppearance: string;
    linkEditorBehavior: string;
    backToNewsOverviewButton: string;
    backToNewsOverviewAriaLabel: string;
    newsEntryNotFound: string;
    deleteDialog: {
      title: string;
      cancelButton: string;
      deleteButton: string;
    },
    followNewsLinkButton: string;
    editButton: string;
    deleteButton: string;
    creatorName: string;
  };
};

export type TypesafeNamespace = keyof Translation;
export type TypesafeTranslation = keyof Translation[TypesafeNamespace];

export type TypeSafeIdentifier = `${TypesafeNamespace}:${TypesafeTranslation}`;
