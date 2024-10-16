/// <reference types="vite/client" />



interface Post{
    success: boolean;
    message: string;
}

 interface U {
    name: string;
    email: string;
    number: string;
    password: string;
     success?: boolean;
     message?: string;
}

interface Pic{
    pic: string;
    picId: string;
}