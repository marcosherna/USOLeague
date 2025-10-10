import { useState, useCallback, useMemo } from "react";

type Rule =
  | { type: "required"; message: string }
  | { type: "email"; message: string }
  | { type: "minLength"; value: number; message: string }
  | { type: "maxLength"; value: number; message: string }
  | { type: "custom"; validate: (val: string) => boolean; message: string };

interface UseInputOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export function useInput(
  initialValue = "",
  rules: Rule[] = [],
  options: UseInputOptions = { validateOnChange: false, validateOnBlur: true }
) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Memoriza las reglas para evitar recalcular si el padre crea un nuevo array
  const memoizedRules = useMemo(() => rules, [JSON.stringify(rules)]);

  const validate = useCallback(() => {
    for (const rule of memoizedRules) {
      switch (rule.type) {
        case "required":
          if (!value || value.trim() === "") {
            setError(rule.message);
            return false;
          }
          break;
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setError(rule.message);
            return false;
          }
          break;
        case "minLength":
          if (value.length < rule.value) {
            setError(rule.message);
            return false;
          }
          break;
        case "maxLength":
          if (value.length > rule.value) {
            setError(rule.message);
            return false;
          }
          break;
        case "custom":
          if (!rule.validate(value)) {
            setError(rule.message);
            return false;
          }
          break;
      }
    }
    setError(null);
    return true;
  }, [value, memoizedRules]);

  const onChangeText = useCallback(
    (text: string) => {
      setValue(text);
      setDirty(true);
    //   if (options.validateOnChange) validate();
    },
    [validate, options.validateOnChange]
  );

  const onBlur = useCallback(() => {
    setTouched(true);
    // if (options.validateOnBlur) validate();
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
    setTouched(false);
    setDirty(false);
  }, [initialValue]);

  return {
    value,
    error,
    touched,
    dirty,
    onChangeText,
    onBlur,
    validate,
    reset,
    setValue,
  };
}
