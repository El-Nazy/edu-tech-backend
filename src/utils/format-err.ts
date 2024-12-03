export default function formatErr(message) {
  return {
    errors: [
      {
        message: message || 'An error occured.',
      },
    ],
  }
}
