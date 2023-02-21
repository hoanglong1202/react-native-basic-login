export function passwordValidator(password) {
  if (!password) return "Password can't be empty.";

  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  if (
    !/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).[^-\s]*$/.test(
      password,
    )
  ) {
    return 'Password too weak';
  }

  return '';
}
