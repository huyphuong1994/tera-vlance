import { IRuleValidation, IValidateReturn } from './_interfaces';

export function checkValidateForm(
  props: IRuleValidation,
  validateDefault: IValidateReturn,
): IValidateReturn {
  const validate = validateDefault || {};
  if (props?.min?.value || props?.max?.value) {
    validate['isNumber'] = (value) => !isNaN(value) || 'Nhập một số hợp lệ';
  }

  return validate;
}
