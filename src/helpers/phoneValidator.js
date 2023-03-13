export function phoneValidator(phone) {
  const re =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  console.log('abc', re.test(phone));
  if (phone.length > 0 && !re.test(phone)) {
    return 'Ooops! We need a valid phone number.';
  }
  return '';
}
