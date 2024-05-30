import mongoose, { Schema, Types, model } from "mongoose";

const userSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      min: 5,
      max: 255,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    codeCountry: {
      type: String,
    },
    profileImage: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dz5dpvxg7/image/upload/v1706484939/fast-plate/Screenshot_2022-09-10_040814_vhfktx.png",
      },
      id: {
        type: String,
        default: "fast-plate/Screenshot_2022-09-10_040814_vhfktx.png",
      },
    },
    coverImages: [
      {
        url: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.models.userModel || model("User", userSchema);
export default userModel;
