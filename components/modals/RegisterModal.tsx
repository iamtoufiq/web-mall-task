import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";
import axios from "axios";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      name: Yup.string().required("Name is required"),
      username: Yup.string().required("Username is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("/api/register", {
          email: values.email,
          password: values.password,
          username: values.username,
          name: values.name,
        });

        toast.success("Account created.");

        // Sign in with the provided credentials
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        registerModal.onClose();
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Something went wrong");
      }
    },
  });
  const onToggle = useCallback(() => {
    if (formik.isSubmitting) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, formik.isSubmitting]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        name="email"
        placeholder="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        disabled={formik.isSubmitting}
        isError={!!(formik.touched.email && formik.errors.email)}
      />
      <Input
        name="name"
        placeholder="Name"
        onChange={formik.handleChange}
        value={formik.values.name}
        disabled={formik.isSubmitting}
        isError={!!(formik.touched.name && formik.errors.name)}
      />
      <Input
        name="username"
        placeholder="Username"
        onChange={formik.handleChange}
        value={formik.values.username}
        disabled={formik.isSubmitting}
        isError={!!(formik.touched.username && formik.errors.username)}
      />
      <Input
        name="password"
        placeholder="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        disabled={formik.isSubmitting}
        isError={!!(formik.touched.password && formik.errors.password)}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={formik.isSubmitting}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
