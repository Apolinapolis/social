import axios from "axios";

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: { "API-KEY": "1721d0bf-4bc2-4cee-8d7e-6d0004333236" },
  withCredentials: true,
});

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    const response = await instance.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },

  follow(userId) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },
  getProfile(userId) {
    return profileAPI.getProfile(userId);
  },
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance.post(`auth/login`, { email, password, rememberMe, captcha});
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId);
  }, // trable? undefind
  getStatus(userId) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile) {
    let formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  saveProfile(profile) {
    return instance.put(`profile/`, profile)
  },
};


export const securityAPI = { getCaptchaUrl() { return instance.get(`security/get-captcha-url`)} };