import React, { useState } from "react";
import type { ChangeEvent, FormEvent, FunctionComponent } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import useCreateCenterUser from "@/api/users/useCreateCenterUser";
import { PostCenterUserRequest } from "@/@types/user";
import { useSnackbarComponent } from "@/components/layout/Snackbar";

const Index: FunctionComponent = () => {
  const [formValues, setFormValues] = useState({
    centerName: {
      value: "",
      error: false,
      errorMessage: "Gebe einen Zentrumsnamen ein",
    },
    firstName: {
      value: "",
      error: false,
      errorMessage: "Gebe den Vornamen des Vertretungsberechtigten ein",
    },
    lastName: {
      value: "",
      error: false,
      errorMessage: "Gebe den Nachnamen des Vertretungsberechtigten ein",
    },
    businessLocationNumber: {
      value: "",
      error: false,
      errorMessage: "Gebe die Betriebsstättennummer ein",
    },
    street: {
      value: "",
      error: false,
      errorMessage: "Gebe die Straße ein",
    },
    houseNumber: {
      value: "",
      error: false,
      errorMessage: "Gebe die Hausnummer ein",
    },
    zipCode: {
      value: "",
      error: false,
      errorMessage: "Gebe die PLZ ein",
    },
    city: {
      value: "",
      error: false,
      errorMessage: "Gebe die Stadt ein",
    },
    country: {
      value: "",
      error: false,
      errorMessage: "Gebe das Land ein",
    },
    latitude: {
      value: undefined,
      error: false,
      errorMessage: "Gebe den Breitengrad ein",
    },
    longitude: {
      value: undefined,
      error: false,
      errorMessage: "Gebe den Längengrad ein",
    },
    email: {
      value: "",
      error: false,
      errorMessage: "Gebe die E-Mail ein",
    },
    alias: {
      value: "",
      error: false,
      errorMessage: "Gebe den Benutzernamen ein",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "Gebe ein Password ein",
    },
  });

  const { request } = useCreateCenterUser();
  const { displaySuccess, displayWarning, displayError } =
    useSnackbarComponent();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        // @ts-ignore
        ...formValues[name],
        value,
      },
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues: any = { ...formValues };

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      // @ts-ignore
      const currentValue = formValues[currentField].value;

      if (currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
      }
    }

    setFormValues(newFormValues);

    const centerUserRequest: PostCenterUserRequest = {
      businessLocationNumber: newFormValues.businessLocationNumber.value,
      alias: newFormValues.alias.value,
      centerName: newFormValues.centerName.value,
      firstName: newFormValues.firstName.value,
      lastName: newFormValues.lastName.value,
      street: newFormValues.street.value,
      houseNumber: newFormValues.houseNumber.value,
      zipCode: newFormValues.zipCode.value,
      city: newFormValues.city.value,
      country: newFormValues.country.value,
      latitude: newFormValues.latitude.value,
      longitude: newFormValues.longitude.value,
      email: newFormValues.email.value,
      password: newFormValues.password.value,
    };

    try {
      await request(centerUserRequest);
      displaySuccess(
        "Zentrum erfolgreich angelegt. Zentren können in Keycloak eingesehen werden.",
      );
    } catch (e: any) {
      displayError(
        `Beim Anlegen des Zentrums ist ein Fehler aufgetreten: ${
          e.error?.detail ?? "Fehlermeldung nicht gefunden"
        }.`,
      );
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} autoComplete="off">
      <Stack gap={4}>
        <Stack direction="column" gap={2}>
          <Typography>Zentrumsdaten</Typography>
          <TextField
            label="Name des Zentrums"
            variant="outlined"
            fullWidth
            required
            name="centerName"
            value={formValues.centerName.value}
            onChange={handleChange}
            error={formValues.centerName.error}
            helperText={
              formValues.centerName.error && formValues.centerName.errorMessage
            }
          />
          <TextField
            label="Vorname des Vertretungsberechtigten"
            variant="outlined"
            fullWidth
            required
            name="firstName"
            value={formValues.firstName.value}
            onChange={handleChange}
            error={formValues.firstName.error}
            helperText={
              formValues.firstName.error && formValues.firstName.errorMessage
            }
          />
          <TextField
            label="Nachname des Vertretungsberechtigten"
            variant="outlined"
            fullWidth
            required
            name="lastName"
            value={formValues.lastName.value}
            onChange={handleChange}
            error={formValues.lastName.error}
            helperText={
              formValues.lastName.error && formValues.lastName.errorMessage
            }
          />
          <TextField
            label="Betriebsstättennummer"
            variant="outlined"
            fullWidth
            required
            name="businessLocationNumber"
            value={formValues.businessLocationNumber.value}
            onChange={handleChange}
            error={formValues.businessLocationNumber.error}
            helperText={
              formValues.businessLocationNumber.error &&
              formValues.businessLocationNumber.errorMessage
            }
          />
        </Stack>
        <Stack direction="column" gap={2}>
          <Typography>Geographische Daten</Typography>
          <TextField
            label="Straße"
            variant="outlined"
            fullWidth
            required
            name="street"
            value={formValues.street.value}
            onChange={handleChange}
            error={formValues.street.error}
            helperText={
              formValues.street.error && formValues.street.errorMessage
            }
          />
          <TextField
            label="Hausnummer"
            variant="outlined"
            fullWidth
            required
            name="houseNumber"
            value={formValues.houseNumber.value}
            onChange={handleChange}
            error={formValues.houseNumber.error}
            helperText={
              formValues.houseNumber.error &&
              formValues.houseNumber.errorMessage
            }
          />
          <TextField
            label="PLZ"
            variant="outlined"
            fullWidth
            required
            name="zipCode"
            value={formValues.zipCode.value}
            onChange={handleChange}
            error={formValues.zipCode.error}
            helperText={
              formValues.zipCode.error && formValues.zipCode.errorMessage
            }
          />
          <TextField
            label="Ort"
            variant="outlined"
            fullWidth
            required
            name="city"
            value={formValues.city.value}
            onChange={handleChange}
            error={formValues.city.error}
            helperText={formValues.city.error && formValues.city.errorMessage}
          />
          <TextField
            label="Land (Germany)"
            variant="outlined"
            fullWidth
            required
            name="country"
            value={formValues.country.value}
            onChange={handleChange}
            error={formValues.country.error}
            helperText={
              formValues.country.error && formValues.country.errorMessage
            }
          />
          <TextField
            label="Breitengrad"
            variant="outlined"
            fullWidth
            required={false}
            name="latitude"
            value={formValues.latitude.value}
            onChange={handleChange}
            error={formValues.latitude.error}
            helperText={
              formValues.latitude.error && formValues.latitude.errorMessage
            }
          />
          <TextField
            label="Längengrad"
            variant="outlined"
            fullWidth
            required={false}
            name="longitude"
            value={formValues.longitude.value}
            onChange={handleChange}
            error={formValues.longitude.error}
            helperText={
              formValues.longitude.error && formValues.longitude.errorMessage
            }
          />
        </Stack>
        <Stack direction="column" gap={2}>
          <Typography>Anmeldedaten</Typography>
          <TextField
            label="E-Mail"
            variant="outlined"
            fullWidth
            required
            name="email"
            value={formValues.email.value}
            onChange={handleChange}
            error={formValues.email.error}
            helperText={formValues.email.error && formValues.email.errorMessage}
          />
          <TextField
            label="Benutzername"
            variant="outlined"
            fullWidth
            required
            name="alias"
            value={formValues.alias.value}
            onChange={handleChange}
            error={formValues.alias.error}
            helperText={formValues.alias.error && formValues.alias.errorMessage}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            name="password"
            value={formValues.password.value}
            onChange={handleChange}
            error={formValues.password.error}
            helperText={
              formValues.password.error && formValues.password.errorMessage
            }
          />
        </Stack>
        <Button variant="contained" type="submit">
          Zentrum anlegen
        </Button>
      </Stack>
    </Box>
  );
};

export default Index;
