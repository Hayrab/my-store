import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./profile.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import userServices from "@/services/user";
import { User } from "@/types/user.type";

type PropsTypes = {
  profile: User | any;
  setProfile: Dispatch<SetStateAction<{}>>;
  session: any;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProfileMemberView = ({
  profile,
  setProfile,
  session,
  setToaster,
}: PropsTypes) => {
  const [changeImage, setChangeImage] = useState<File | any>({});
  const [isLoading, setIsLoading] = useState<string>("");

  const handleChangeProfileForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(
      data,
      session.data?.accessToken
    );
    try {
      if (result.status === 200) {
        setIsLoading("");
        setProfile({
          ...profile,
          fullname: data.fullname,
          phone: data.phone,
        });
        form.reset();
        setToaster({
          variant: "success",
          message: "Success Update Profile",
        });
      }
    } catch (error) {
      setIsLoading("");
      setToaster({
        variant: "danger",
        message: "Failed Update Picture",
      });
    }
  };

  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("avatar");
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    const newName = "profile." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newImageUrl: string) => {
          if (status) {
            const data = {
              image: newImageUrl,
            };
            const result = await userServices.updateProfile(
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading("");
              setProfile({
                ...profile,
                image: newImageUrl,
              });
              setChangeImage({});
              form.reset();
              setToaster({
                variant: "success",
                message: "Success Update Profile Picture",
              });
            } else {
              setIsLoading("");
            }
          }
        }
      );
    } else {
      setIsLoading("");
      setChangeImage({});
      setToaster({
        variant: "danger",
        message: "Failed Update Profile Picture",
      });
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;
    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };
    try {
      const result = await userServices.updateProfile(
        data,
        session.data?.accessToken
      );
      if (result.status === 200) {
        setIsLoading("");
        setToaster({
          variant: "success",
          message: "Success Update Password",
        });
        form.reset();
      }
    } catch (error) {
      setIsLoading("");
      setToaster({
        variant: "danger",
        message: "Failed Update Password",
      });
    }
  };
  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__row}>
          <div className={styles.profile__main__row__avatar}>
            <h2 className={styles.profile__main__row__avatar__title}>Avatar</h2>
            {profile.image ? (
              <Image
                className={styles.profile__main__row__avatar__image}
                src={profile.image}
                alt="profile"
                height={200}
                width={200}
              />
            ) : (
              <div className={styles.profile__main__row__avatar__image}>
                {profile?.fullname?.charAt(0)}
              </div>
            )}
            <form onSubmit={handleChangeProfilePicture}>
              <label
                className={styles.profile__main__row__avatar__label}
                htmlFor="upload-image"
              >
                {changeImage.name ? (
                  <p>{changeImage.name}</p>
                ) : (
                  <>
                    <p>
                      Upload a new avatar, Larger image will be resized
                      automatically
                    </p>
                    <p>
                      Maximum upload size is <b>1 MB</b>
                    </p>
                  </>
                )}
              </label>
              <input
                className={styles.profile__main__row__avatar__input}
                type="file"
                name="image"
                id="upload-image"
                onChange={(e: any) => {
                  e.preventDefault();
                  setChangeImage(e.currentTarget.files[0]);
                }}
              />
              <Button
                className={styles.profile__main__row__avatar__button}
                type="submit"
              >
                {isLoading === "avatar" ? "Loading" : "Update Avatar"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__profile}>
            <h2 className={styles.profile__main__row__profile__title}>
              Profile
            </h2>
            <form onSubmit={handleChangeProfileForm}>
              <Input
                label="Fullname"
                name="fullname"
                type="text"
                defaultValue={profile.fullname}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                defaultValue={profile.email}
                disabled
              />
              <Input
                label="Phone"
                name="phone"
                type="number"
                defaultValue={profile.phone}
              />
              <Input
                label="Role"
                name="role"
                type="string"
                defaultValue={profile.role}
                disabled
              />

              {/* <Input
            label="Password"
            name="password"
            type="password"
            defaultValue={profile.password}
          /> */}
              <Button type="submit" variant="primary">
                {isLoading === "profile" ? "Loading" : "Update Profile"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__password}>
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <Input
                name="old-password"
                label="Old password"
                type="password"
                disabled={profile.type === "google"}
                placeholders="Old Your New Password"
              />
              <Input
                name="new-password"
                label="New password"
                type="password"
                disabled={profile.type === "google"}
                placeholders="Enter Your New Password"
              />
              <Button
                type="submit"
                disabled={isLoading === "password" || profile.type === "google"}
              >
                {isLoading === "password" ? "Loading.." : "Update Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
