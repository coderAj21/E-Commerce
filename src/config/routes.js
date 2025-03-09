export const routes = {
  home: {
    listing: "/",
    home: "/home",
  },
  products: {
    details: (id) => `product/${id}`,
  },
  order: {
    listing: "/order",
  },
  cart: {
    listing: "/cart",
  },
  Wishlist: {
    listing: "/wishlist",
  },
  filter: {
    listing: (params = {}) =>
      `/filter?` +
      new URLSearchParams({
        ...params,
        minPrice: 0,
        maxPrice: 10000,
      }).toString(),
  },
  auth: {
    login: "/auth/login",
    otp: "auth/otp",
    forget_password: "/auth/forget_password",
    profile: "/auth/profile",
  },
  footer: {
    about_us: "/about_us",
    contact_us: "/contact_us",
  },
  checkout:{
    index:"/checkout"
  }
};
