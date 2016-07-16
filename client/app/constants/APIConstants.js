export default class APIConstants {
  static google = {
    formResponses: {
      index: '/google/form_responses',
      show: (id) => `/google/form_responses/${id}`,
    },
  };
}
