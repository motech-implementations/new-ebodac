import {
  FETCH_VACCINEE_CONFIG,
  CREATE_VACCINEE_CONFIG,
  SAVE_VACCINEE_CONFIG,
  DELETE_VACCINEE_CONFIG,
  FETCH_KCP_CONFIG,
  CREATE_KCP_CONFIG,
  SAVE_KCP_CONFIG,
  DELETE_KCP_CONFIG,
  FETCH_SITE_CONFIG,
  CREATE_SITE_CONFIG,
  SAVE_SITE_CONFIG,
  DELETE_SITE_CONFIG,
  FETCH_VISIT_CONFIG,
  CREATE_VISIT_CONFIG,
  SAVE_VISIT_CONFIG,
  DELETE_VISIT_CONFIG,
} from '../actions/types';

const initialState = {
  vaccinee: [],
  keyCommunityPerson: [],
  site: [],
  visit: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VACCINEE_CONFIG:
      return {
        ...state,
        vaccinee: action.payload.data,
      };
    case CREATE_VACCINEE_CONFIG:
      return {
        ...state,
        vaccinee: [...state.vaccinee, action.payload.data],
      };
    case SAVE_VACCINEE_CONFIG:
      return {
        ...state,
        vaccinee: state.vaccinee.map((item) => {
          if (item.id !== action.payload.data.id) {
            return item;
          }
          return {
            ...item,
            ...action.payload.data,
          };
        }),
      };
    case DELETE_VACCINEE_CONFIG:
      return {
        ...state,
        vaccinee: state.vaccinee.filter(item => item.id !== action.payload),
      };
    case FETCH_KCP_CONFIG:
      return {
        ...state,
        keyCommunityPerson: action.payload.data,
      };
    case CREATE_KCP_CONFIG:
      return {
        ...state,
        keyCommunityPerson: [...state.keyCommunityPerson, action.payload.data],
      };
    case SAVE_KCP_CONFIG:
      return {
        ...state,
        keyCommunityPerson: state.keyCommunityPerson.map((item) => {
          if (item.id !== action.payload.data.id) {
            return item;
          }
          return {
            ...item,
            ...action.payload.data,
          };
        }),
      };
    case DELETE_KCP_CONFIG:
      return {
        ...state,
        keyCommunityPerson: state.keyCommunityPerson.filter(item => item.id !== action.payload),
      };
    case FETCH_SITE_CONFIG:
      return {
        ...state,
        site: action.payload.data,
      };
    case CREATE_SITE_CONFIG:
      return {
        ...state,
        site: [...state.site, action.payload.data],
      };
    case SAVE_SITE_CONFIG:
      return {
        ...state,
        site: state.site.map((item) => {
          if (item.id !== action.payload.data.id) {
            return item;
          }
          return {
            ...item,
            ...action.payload.data,
          };
        }),
      };
    case DELETE_SITE_CONFIG:
      return {
        ...state,
        site: state.site.filter(item => item.id !== action.payload),
      };
    case FETCH_VISIT_CONFIG:
      return {
        ...state,
        visit: action.payload.data,
      };
    case CREATE_VISIT_CONFIG:
      return {
        ...state,
        visit: [...state.visit, action.payload.data],
      };
    case SAVE_VISIT_CONFIG:
      return {
        ...state,
        visit: state.visit.map((item) => {
          if (item.id !== action.payload.data.id) {
            return item;
          }
          return {
            ...item,
            ...action.payload.data,
          };
        }),
      };
    case DELETE_VISIT_CONFIG:
      return {
        ...state,
        visit: state.visit.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};
