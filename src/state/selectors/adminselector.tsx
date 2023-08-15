import { selector } from "recoil";
import { courseState, userState } from "../atoms/adminatom";


export const isCourseLoading = selector({
  key: 'isCourseLoaingState',
  get: ({get}) => {
    const state = get(courseState);
    return state.isCourseLoading;
  },
});

export const singleCourseDetail = selector({
  key: 'singleCourseDetailState',
  get: ({get}) => {
    const state = get(courseState);

    return state.singleCourse;
  },
});

export const allCourseDetail = selector({
    key: 'allCourseDetailState',
    get: ({get}) => {
      const state = get(courseState);
      return state.allCourse;
    },
  });

export const isAuthenticated  = selector({
    key:"isAuthenticatedState",
    get: ({get})=>{
        let {isAuthenticated} = get(userState);
        return isAuthenticated;
    }
})

export const isUserLoading = selector({
    key: 'userLoadingState',
    get: ({get}) => {
      const state = get(userState);
      return state.isUserLoading;
    },
  });

  export const userDetail = selector({
    key: 'userDetailState',
    get: ({get}) => {
      const state = get(userState);
  
      return state.user;
    },
  });
