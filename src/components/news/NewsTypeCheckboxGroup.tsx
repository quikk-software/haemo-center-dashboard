import React, { useCallback } from "react";
import type { FunctionComponent } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { setIsAdmin, setIsSponsored } from "@/components/news/newsSlice";
import useLanguage from "@/i18n/useLanguage";

interface NewsTypeCheckboxGroupProps {
  isSponsored: boolean;
  isAdmin: boolean;
  userIsCenter: boolean;
}

const NewsTypeCheckboxGroup: FunctionComponent<NewsTypeCheckboxGroupProps> = ({
  isSponsored,
  isAdmin,
  userIsCenter,
}) => {
  const { t } = useLanguage();
  const dispatch = useDispatch();

  const handleIsSponsoredChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setIsSponsored(event.target.checked));
    },
    [dispatch],
  );

  const handleIsAdminChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setIsAdmin(event.target.checked));
    },
    [dispatch],
  );

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={isSponsored}
            disabled={userIsCenter}
            onChange={handleIsSponsoredChange}
          />
        }
        label={t("news:checkbox.isSponsored")}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isAdmin}
            disabled={userIsCenter}
            onChange={handleIsAdminChange}
          />
        }
        label={t("news:checkbox.isAdmin")}
      />
    </FormGroup>
  );
};

export default NewsTypeCheckboxGroup;
