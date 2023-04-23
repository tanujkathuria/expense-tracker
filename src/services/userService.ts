import apiClient from "./api-client";

export interface User {
    id: number;
    name: string;
}

class UserService{

    getAllUsers(){
        return apiClient
        .get<User[]>("/users")
    }

    deleteUser(id: number){
        return apiClient.delete("/users/" + id)
    }

    createUser(user: User){
        return apiClient
        .post("/users/", user)
    }

    updateUser(user: User){
        return apiClient.patch("/users/" + user.id, user)
    }

}

export default new UserService();