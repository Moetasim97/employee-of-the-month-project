export interface User {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  phone: string;
  address: string;
  title: string;
  monthlyRecognitions: number;
  totalRecognitions: number;
  brief: string;
  counter:number;
}

export const dummyUser: User = {
  id: 1,
  email: "yara@itworx.com",
  name: "Yara",
  address: "Madinaty",
  profileImage:
    "https://fastly.picsum.photos/id/727/200/300.jpg?hmac=YAlAwltwjf1ivXTPLvMU4JLzPsOLmXi9_O1aoYF7hcg",
  title: "Software Engineer",
  phone: "+201000000000",
  totalRecognitions: 1000,
  monthlyRecognitions: 234,
  brief: "I am a software engineer",
  counter:4
};
