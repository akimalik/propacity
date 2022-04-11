import { Autocomplete, Chip, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type props = {
  suggestion: suggestionProps[],
  callback?: (a: suggestionProps[]) => any
}

export type suggestionProps = {
  title: string,
  value: string | number,
  tag?: string
}

export default function AutocompleteRequest({ suggestion, callback }: props) {
  const [value, setValue] = useState<suggestionProps[]>([]);
  useEffect(() => {
    callback && callback(value)
  }, [value])
  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...newValue
        ]);
      }}
      onKeyUp={(event: any) => {
        if (event.key === 'Enter') {
          // Prevent's default 'Enter' behavior.
          event.defaultMuiPrevented = true;
          let val = event.target.value
          let newItem: suggestionProps = { title: val, value: val, tag: 'notMatch' }
          !!val && setValue([...value, newItem])
          // your handler code
        }
      }}
      options={suggestion}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.title}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label="Search" placeholder="Search" />
      )}
    />
  );
}
