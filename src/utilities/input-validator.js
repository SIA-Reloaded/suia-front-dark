// Regex validators
const emailRegex = RegExp(/^[\w-w.]+@([\w-]+\.)+[\w-]{2,4}$/)

// ----------------------------

export const validateEmail = (emailCandidate) => {
  return emailRegex.test(emailCandidate)
    ? true
    : false;
}
