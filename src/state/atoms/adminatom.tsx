import { atom } from "recoil";

export interface CourseType {
  courseid: number;
  title: string;
  description: string;
  imagelink: string;
  price: string;
}
export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const courseState = atom<{ isCourseLoading: boolean; singleCourse: null | CourseType, allCourse:[] }>({
  key: "courseState",
  default: {
    isCourseLoading: false,
    singleCourse: null,
    allCourse:[]
  },
});

export const userState = atom<{isUserLoading: boolean, isAuthenticated: boolean, user: null | UserType}>({
  key: "userState",
  default: {
    isUserLoading: false,
    isAuthenticated: false,
    user: null,
  },
});

export const BASE_URL = 'https://course-selling-backend-sigma.vercel.app/admin';
export const parseToken = () => {
  return localStorage.getItem('courseToken')
};