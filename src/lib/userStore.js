import { create } from "zustand";

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUser: async (x) => {
        if (x) {
            set({
                currentUser: {
                    id: "THISISTHEID",
                    username: "John Doe",
                    email: "johndoe123@gmail.com",
                    phone: "4011234567",
                    vEmail: "info123@johndoe.com",  // Virtual Email
                    vPhone: "1234567890"            // Virtual Phone Number
                },
                isLoading: false
            });

            return new Promise((res, _) => {
                res({
                    currentUser: {
                        id: "THISISTHEID",
                        username: "John Doe",
                        email: "johndoe123@gmail.com",
                        phone: "4011234567",
                        vEmail: "info123@johndoe.com",  // Virtual Email
                        vPhone: "1234567890"            // Virtual Phone Number
                    },
                    isLoading: false
                });
            });
        } else {
            set({
                isLoading: false
            });

            return new Promise((_, rej) => {
                rej("404: No user found");
            })
        }

    },
    fetchNull: () => {
        
    }
}));