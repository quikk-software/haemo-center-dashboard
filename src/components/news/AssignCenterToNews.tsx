import React, { useCallback, useEffect, useState } from "react";
import type { FunctionComponent } from "react";
import useListCenters from "@/api/feed/useListCenters";
import {
  Grid,
  OutlinedInput,
  Select,
  Checkbox,
  ListItemText,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { ADMIN_ROLE } from "@/auth/auth.constants";
import useLanguage from "@/i18n/useLanguage";
import { CenterNews, setNewsCenters } from "@/components/news/newsSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface AssignCenterToNewsProps {
  initialCenters: CenterNews[];
}

const AssignCenterToNews: FunctionComponent<AssignCenterToNewsProps> = ({
  initialCenters,
}) => {
  const [centers, setCenters] = useState<string[]>([]);

  const { t } = useLanguage();
  const { request, response } = useListCenters();

  const dispatch = useDispatch();
  const { roles } = useSelector((s: Store) => s.auth);

  useEffect(() => {
    setCenters(initialCenters.map((center) => center.centerId));
  }, [initialCenters]);

  useEffect(() => {
    (async () => {
      await request();
    })();
  }, []);

    const handleChange = useCallback((event: SelectChangeEvent<typeof centers>) => {
        const {
            target: {value},
        } = event;
        const newCenterIds = (typeof value === "string")? [value] : [...value];
        setCenters(newCenterIds);
        dispatch(setNewsCenters(newCenterIds.map((newCenterId) => {
            const centerName = response.find((r) => r.id === newCenterId)?.centerName || "";
            return {
                centerId: newCenterId,
                centerName,
            };
          }),
        ),
      );
    }, [response]);

  if (!roles.includes(ADMIN_ROLE) || !response) {
    return <></>;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="center-select-checkbox-label">
            {t("news:center.label")}
          </InputLabel>
          <Select
            labelId="center-select-checkbox-label"
            id="center-checkbox-label"
            multiple
            value={centers}
            onChange={handleChange}
            input={<OutlinedInput label={t("news:center.label")} />}
            renderValue={(selected) =>
              selected
                ?.map((s) => response.find((r) => r.id === s)?.centerName)
                ?.join(", ")
            }
            MenuProps={MenuProps}
          >
            {response.map(({ id, centerName }) => (
              <MenuItem key={id} value={id}>
                <Checkbox
                  checked={!!centers.find((centerId) => centerId === id)}
                />
                <ListItemText primary={centerName} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AssignCenterToNews;
