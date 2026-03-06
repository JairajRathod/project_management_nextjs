// // signup
// // login

// import connectDB from "@/libs/connectDB";
// import { User } from "@/models/user.model";
// import customError from "@/utils/customError";

// // password-reset
// export async function signup(userDetails) {
//   // connect the database
//     await connectDB();

//     console.log(userDetails);

//     // destructuring the required details
//     const { email, name, image } = userDetails;

//     // creating the user in the database
//     const isUserCreated = await User.create({
//       fullname: name,
//       email: email,
//       password: null, // because google login
//       role: "MEMBER",
//       avatar: image,
//       isVerified: true,
//       isActive: true,
//     });

//     // throwing error if user not created
//     if (!isUserCreated) {
//       throw new customError("User not created", 400);
//     }
// }

// export async function login() {}

// export async function passwordReset() {}
